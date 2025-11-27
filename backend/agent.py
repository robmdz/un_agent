from dotenv import load_dotenv
from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli
from livekit.plugins import noise_cancellation, silero, openai
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit.agents.voice import room_io
import prompts  

load_dotenv()

class UnParceroAgent(Agent):
    def __init__(self):
        # Usamos la variable importada
        super().__init__(instructions=prompts.AGENT_INSTRUCTIONS)

    async def on_enter(self):
        # Usamos la variable importada
        await self.session.generate_reply(instructions=prompts.GREETING_INSTRUCTIONS)

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