#!/bin/bash

# Descargar modelos necesarios para el agente
echo "Descargando modelos de LiveKit..."
python agent.py download-files

# Iniciar el agente de LiveKit en segundo plano
echo "Iniciando Agente LiveKit..."
python agent.py start &

# Iniciar FastAPI en primer plano
echo "Iniciando API FastAPI..."
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}

