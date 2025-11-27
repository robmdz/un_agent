from dotenv import load_dotenv
from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli
from livekit.plugins import noise_cancellation, silero, openai
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit.agents.voice import room_io

load_dotenv()

class UnParceroAgent(Agent):
    def __init__(self):
        super().__init__(instructions="Eres un asistente virtual de la universidad nacional de Colombia sede Medellín, ayudas a los usuarios a encontrar información sobre la universidad nacional de Colombia en especial de la sede Medellín y a resolver sus dudas académicas y de admisión.")

    async def on_enter(self):
        await self.session.generate_reply(instructions="saluda y preguntale en que lo puedes ayudar con un estilo colombiano en especifico paisa")

async def entrypoint(ctx: JobContext):
    await ctx.connect()
    
    session = AgentSession(
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
        stt=openai.STT(model="whisper-1"),
        llm=openai.LLM(model="gpt-4o-mini"),
        tts=openai.TTS(
            model="tts-1",
            voice="alloy",
            instructions="actua de una forma amable y educada, pero con acento colombiano en especifico paisa"
        ),
    )
    
    await session.start(
        agent=UnParceroAgent(),
        room=ctx.room,
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=noise_cancellation.BVC(),
            ),
        ),
    )
    
if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))