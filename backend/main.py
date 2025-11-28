from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from livekit import api
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")
LIVEKIT_URL = os.getenv("LIVEKIT_URL")

app = FastAPI()

# Configuración de CORS para permitir peticiones desde cualquier origen
# Esto es necesario para que el frontend pueda comunicarse con el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """
    Endpoint raíz para verificar que la API está funcionando.
    """
    return {"message": "UN Parcero API is running", "status": "ok"}

@app.get("/getToken")
async def get_token():
    """
    Endpoint para generar un token de acceso a LiveKit.
    Este token es necesario para que el frontend pueda conectarse a la sala de video/audio.
    
    Returns:
        dict: Un diccionario con el token JWT y la URL de LiveKit.
              Retorna un error si las credenciales no están configuradas.
    """
    if not LIVEKIT_API_KEY or not LIVEKIT_API_SECRET:
        return {"error": "LiveKit credentials not set"}
    
    # Generar identificadores únicos para la sesión
    session_id = str(uuid.uuid4())
    room_name = f"un-parcero-{session_id}"
    participant_identity = f"user_{session_id}"

    # Crear token de acceso con permisos para unirse a la sala
    token = api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET) \
        .with_identity(participant_identity) \
        .with_name("User") \
        .with_grants(api.VideoGrants(
            room_join=True,
            room=room_name,
        ))
    
    return {"token": token.to_jwt(), "url": LIVEKIT_URL}



