from dotenv import load_dotenv
from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli, function_tool, RunContext
from livekit.plugins import noise_cancellation, silero, openai
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit.agents.voice import room_io
import prompts
from tools.maps import MapsService
from tools.search import SearchService

load_dotenv()

class UnParceroAgent(Agent):
    """
    Agente de voz personalizado para la Universidad Nacional de Colombia, sede Medellín.
    Hereda de la clase base Agent de LiveKit para manejar la interacción de voz.
    """
    def __init__(self):
        """
        Inicializa el agente con las instrucciones predefinidas.
        Carga las instrucciones desde el módulo prompts.
        """
        # Usamos la variable importada
        super().__init__(instructions=prompts.AGENT_INSTRUCTIONS)
        self.maps_service = MapsService()
        self.search_service = SearchService()

    @function_tool()
    async def find_place(self, context: RunContext, query: str):
        """Busca la ubicación exacta de un lugar, edificio o bloque en Google Maps.
        Usa esto cuando el usuario pregunte '¿Dónde queda...?' o '¿Ubicación de...?'.
        Args:
            query: El nombre del lugar, edificio o bloque a buscar (ej: "Bloque 41", "Biblioteca").
        """
        # Añadimos contexto para mejorar la búsqueda si es muy corta
        if "medellín" not in query.lower() and "unal" not in query.lower():
            query = f"{query} Universidad Nacional Colombia Medellín"
        return self.maps_service.find_place(query)

    @function_tool()
    async def get_directions(self, context: RunContext, origin: str, destination: str):
        """Obtiene indicaciones paso a paso y tiempo de ruta entre dos puntos.
        Args:
            origin: Punto de partida.
            destination: Punto de llegada.
        """
        return self.maps_service.get_directions(origin, destination)

    @function_tool()
    async def google_search(self, context: RunContext, query: str):
        """Realiza una búsqueda en Google para encontrar información.
        Args:
            query: La consulta de búsqueda.
        """
        return self.search_service.search(query)

    async def on_enter(self):
        """
        Método asíncrono que se ejecuta cuando el agente entra en la sala.
        Genera un saludo inicial utilizando las instrucciones de saludo.
        """
        # Usamos la variable importada
        await self.session.generate_reply(instructions=prompts.GREETING_INSTRUCTIONS)

async def entrypoint(ctx: JobContext):
    """
    Punto de entrada para el trabajador del agente.
    Configura y conecta el agente a la sala de LiveKit.
    
    Args:
        ctx (JobContext): Contexto del trabajo que contiene información sobre la sala y el proceso.
    """
    import logging
    import asyncio
    
    logger = logging.getLogger("agent")
    logger.info("Starting agent entrypoint")
    
    try:
        await ctx.connect()
        logger.info("Connected to LiveKit room")
        
        # Configuración de la sesión del agente con los modelos de IA necesarios
        session = AgentSession(
            vad=silero.VAD.load(), # Detección de actividad de voz
            turn_detection=MultilingualModel(), # Modelo para detectar turnos de habla
            stt=openai.STT(model="whisper-1"), # Speech-to-Text usando Whisper
            llm=openai.LLM(model="gpt-4o-mini"), # Large Language Model para generar respuestas
            tts=openai.TTS(
                model="tts-1",
                voice="ash",
            ), # Text-to-Speech para sintetizar la voz
        )
        logger.info("Agent session configured successfully")

        # Track if we're shutting down
        shutdown_event = asyncio.Event()

        @ctx.room.on("participant_disconnected")
        def on_participant_disconnected(participant):
            if len(ctx.room.remote_participants) == 0:
                logger.info("Last participant left, scheduling disconnect")
                if not shutdown_event.is_set():
                    shutdown_event.set()
                    asyncio.create_task(_graceful_disconnect(ctx, logger))
        
        # Inicia la sesión del agente en la sala
        await session.start(
            agent=UnParceroAgent(),
            room=ctx.room,
            room_options=room_io.RoomOptions(
                audio_input=room_io.AudioInputOptions(
                    noise_cancellation=noise_cancellation.BVC(), # Cancelación de ruido
                ),
            ),
        )
        logger.info("Agent session started successfully")
        
    except Exception as e:
        logger.error(f"Error in agent entrypoint: {e}", exc_info=True)
        raise

async def _graceful_disconnect(ctx: JobContext, logger):
    """Helper function to gracefully disconnect from the room"""
    try:
        await asyncio.sleep(1)  # Give a moment for cleanup
        if ctx.room.isconnected():
            logger.info("Disconnecting from room")
            await ctx.disconnect()
    except Exception as e:
        logger.warning(f"Error during graceful disconnect: {e}")
    
if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))