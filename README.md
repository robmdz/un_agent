# Un Parcero - AI Voice Agent

Bienvenido a **Un Parcero**, un agente de voz interactivo impulsado por Inteligencia Artificial. Este proyecto combina un frontend moderno en React con un backend potente en Python utilizando LiveKit para la comunicación en tiempo real y OpenAI para el procesamiento de lenguaje natural.

## 📋 Tabla de Contenidos
- [Sobre el Proyecto](#sobre-el-proyecto)
- [Arquitectura](#arquitectura)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Uso](#uso)
- [Documentación Oficial](#documentación-oficial)

## 🚀 Sobre el Proyecto

**Un Parcero** es una aplicación diseñada para demostrar el poder de los agentes conversacionales multimodales. Permite a los usuarios interactuar con un asistente virtual a través de voz en tiempo real, con capacidades de:
- **Detección de voz (VAD)**: Identifica cuándo el usuario está hablando.
- **Transcripción (STT)**: Convierte voz a texto usando OpenAI Whisper.
- **Inteligencia (LLM)**: Genera respuestas inteligentes usando GPT-4o.
- **Síntesis de voz (TTS)**: Convierte las respuestas de texto a audio natural.

## 🏗 Arquitectura

El sistema sigue una arquitectura cliente-servidor desacoplada, mediada por LiveKit para la transmisión de audio/video de baja latencia.

```mermaid
graph TD
    User[Usuario] <-->|Audio/Video RTP| LiveKit[LiveKit Cloud]
    
    subgraph Frontend [Frontend (React + Vite)]
        UI[Interfaz de Usuario] -->|Solicita Token| API[Backend API /getToken]
        UI <-->|Señalización| LiveKit
    end
    
    subgraph Backend [Backend (Python Agent)]
        Agent[LiveKit Worker] <-->|Señalización & Media| LiveKit
        Agent -->|STT/LLM/TTS| OpenAI[OpenAI API]
    end

    User <--> UI
```

1.  **Frontend**: Solicita un token de acceso al Backend y se conecta a una sala de LiveKit.
2.  **LiveKit Cloud**: Actúa como el servidor SFU (Selective Forwarding Unit) para enrutar el audio entre el usuario y el agente.
3.  **Backend (Agent)**: Se conecta a la misma sala, escucha el audio del usuario, lo procesa y responde.

## 🛠 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Python 3.9** o superior.
- **Node.js 18** o superior.
- Una cuenta en [LiveKit Cloud](https://livekit.io/) (para obtener `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL`).
- Una clave de API de [OpenAI](https://openai.com/) (para `OPENAI_API_KEY`).

## ⚙️ Instalación y Configuración

Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd un_agent
```

### Backend

El backend maneja la lógica del agente y la autenticación.

1.  Navega al directorio `backend`:
    ```bash
    cd backend
    ```

2.  Crea un entorno virtual:
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # En Windows: .venv\Scripts\activate
    ```

3.  Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```

4.  Configura las variables de entorno. Crea un archivo `.env` en `backend/` y agrega:
    ```env
    LIVEKIT_API_KEY=tu_api_key
    LIVEKIT_API_SECRET=tu_api_secret
    LIVEKIT_URL=tu_livekit_url
    OPENAI_API_KEY=tu_openai_key
    ```

5.  Ejecuta el agente (modo desarrollo):
    ```bash
    python agent.py dev
    ```

### Frontend

El frontend es la interfaz visual para interactuar con el agente.

1.  Navega al directorio `frontend`:
    ```bash
    cd ../frontend
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  (Opcional) Si el frontend necesita credenciales directas (aunque usualmente las obtiene del backend), crea un archivo `.env` en `frontend/`.

4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## 🎮 Uso

1.  Asegúrate de que tanto el **Backend** (agente) como el **Frontend** (servidor Vite) estén ejecutándose.
2.  Abre tu navegador en la URL que muestra Vite (usualmente `http://localhost:5173`).
3.  Navega a la página del agente de voz (ej. `/voice-agent`).
4.  Haz clic en "Conectar" o el botón de inicio.
5.  ¡Empieza a hablar! El agente te escuchará y responderá.

## 📚 Documentación Oficial

Para profundizar en las tecnologías utilizadas:

- **LiveKit**: [Documentación Oficial](https://docs.livekit.io/)
- **LiveKit Agents Framework**: [Guía de Agentes en Python](https://docs.livekit.io/agents/python/)
- **OpenAI API**: [Referencia de API](https://platform.openai.com/docs/api-reference)
- **FastAPI**: [Documentación](https://fastapi.tiangolo.com/)
- **React**: [Documentación](https://react.dev/)
- **Vite**: [Guía](https://vitejs.dev/guide/)

---
Hecho con ❤️ por el equipo de Un Parcero.