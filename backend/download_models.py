from livekit.plugins import silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel
import os

print("Iniciando descarga de modelos para LiveKit Agent...")

# 1. Descargar VAD (Silero)
try:
    print("Descargando modelo VAD (Silero)...")
    silero.VAD.load()
    print("✅ Modelo VAD listo.")
except Exception as e:
    print(f"❌ Error descargando VAD: {e}")

# 2. Descargar Turn Detector (Multilingual)
try:
    print("Descargando modelo Turn Detector (Multilingual)...")
    # Al instanciarlo, intenta descargar los archivos necesarios (model_q8.onnx, languages.json)
    MultilingualModel()
    print("✅ Modelo Turn Detector listo.")
except Exception as e:
    print(f"❌ Error descargando Turn Detector: {e}")

print("Proceso de descarga finalizado.")

