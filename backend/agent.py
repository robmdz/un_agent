from dotenv import load_dotenv
from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli, function_tool, RunContext
from livekit.plugins import noise_cancellation, silero, openai
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit.agents.voice import room_io
import prompts
from tools.maps import MapsService
from tools.search import SearchService
import sys
import subprocess

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
        """Busca un lugar en Google Maps.
        Args:
            query: El nombre del lugar o dirección a buscar.
        """
        return self.maps_service.find_place(query)

    @function_tool()
    async def get_directions(self, context: RunContext, origin: str, destination: str):
        """Obtiene indicaciones de ruta entre dos lugares.
        Args:
            origin: El punto de partida (dirección o nombre del lugar).
            destination: El destino (dirección o nombre del lugar).
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
    await ctx.connect()
    
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
    
if __name__ == "__main__":
    # Truco para Railway: Si el argumento es 'start', primero intentamos descargar
    if "start" in sys.argv:
        print("Verificando modelos necesarios...")
        try:
            # Ejecutamos el comando de descarga como subproceso
            subprocess.run(["python", "agent.py", "download-files"], check=True)
            print("Modelos verificados/descargados correctamente.")
        except subprocess.CalledProcessError as e:
            print(f"Advertencia: No se pudieron descargar los modelos automáticos: {e}")
            # Continuamos igual, esperando que ya estén ahí o falle con error claro
    
    # Iniciar la aplicación normalmente
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))