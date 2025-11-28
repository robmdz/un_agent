#!/bin/bash

# El agente de LiveKit está desplegado en LiveKit Cloud
# Este script solo inicia la API FastAPI para generar tokens

echo "Iniciando API FastAPI..."
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}

