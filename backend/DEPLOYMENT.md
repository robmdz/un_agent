# Guía de Despliegue

Este proyecto requiere **DOS despliegues separados**:

## 1. API FastAPI (Railway/Render/Cloud Run)

### Propósito
Genera tokens JWT para que los usuarios se conecten a LiveKit.

### Archivos necesarios
- `main.py`
- `requirements.txt`
- `Dockerfile.api`

### Despliegue en Railway

1. Crea un nuevo proyecto en [Railway](https://railway.app)
2. Conecta tu repositorio de GitHub
3. En la configuración del servicio:
   - **Root Directory**: `backend`
   - **Dockerfile Path**: `Dockerfile.api`
4. Configura las variables de entorno:
   ```env
   LIVEKIT_API_KEY=tu_api_key
   LIVEKIT_API_SECRET=tu_api_secret
   LIVEKIT_URL=wss://voiceagentexample-qpxyybgw.livekit.cloud
   ```
5. Despliega

### URL resultante
La URL pública de Railway (ej: `https://tu-app.up.railway.app`) debe configurarse en el frontend como `VITE_API_URL`.

---

## 2. Worker del Agente (LiveKit Cloud)

### Propósito
Maneja la interacción de voz con los usuarios usando IA.

### Archivos necesarios
- `agent.py`
- `prompts.py`
- `tools/`
- `requirements.txt`
- `Dockerfile` (el normal)
- `start.sh`

### Despliegue en LiveKit Cloud

1. Asegúrate de tener el CLI de LiveKit instalado
2. Autentícate: `lk cloud auth`
3. Navega al directorio backend:
   ```bash
   cd backend
   source .venv/bin/activate
   ```
4. Despliega el agente:
   ```bash
   lk agent deploy
   ```
5. Actualiza los secretos (variables de entorno):
   ```bash
   lk agent update-secrets CA_gckeKmnFHHao
   ```
   Esto cargará las variables del archivo `.env`

### Variables de entorno requeridas
```env
LIVEKIT_API_KEY=tu_api_key
LIVEKIT_API_SECRET=tu_api_secret
LIVEKIT_URL=wss://voiceagentexample-qpxyybgw.livekit.cloud
OPENAI_API_KEY=tu_openai_key
GOOGLE_MAPS_API_KEY=tu_google_maps_key
SERPAPI_API_KEY=tu_serpapi_key
```

### Verificar logs
```bash
lk agent logs CA_gckeKmnFHHao
```

---

## 3. Frontend (Vercel)

### Variables de entorno
```env
VITE_API_URL=https://tu-app.up.railway.app
```

Configura esto en la configuración de variables de entorno de Vercel.

---

## Flujo completo

```
Usuario (navegador)
    ↓
Frontend (Vercel)
    ↓ GET /getToken
API FastAPI (Railway) → genera token JWT
    ↓
LiveKit Cloud (sala de reunión)
    ↑
Worker del Agente (LiveKit Cloud) → escucha y responde
```

---

## Troubleshooting

### Error: "model_q8.onnx not found"
- **Solución**: El Dockerfile debe ejecutar `python agent.py download-files` durante el build
- Ya está incluido en el `Dockerfile` actual

### Error: "Agente no se conecta a la sala"
- Verifica que `start.sh` ejecute `python agent.py start`
- Revisa los logs: `lk agent logs CA_gckeKmnFHHao`

### Error: "Cannot fetch token"
- Verifica que la API FastAPI esté desplegada en Railway
- Verifica que `VITE_API_URL` en Vercel apunte a la URL correcta de Railway

