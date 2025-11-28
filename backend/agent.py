from dotenv import load_dotenv
from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli
from livekit.plugins import noise_cancellation, silero, openai
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit.agents.voice import room_io
import prompts  

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
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))