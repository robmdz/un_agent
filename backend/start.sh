#!/bin/bash

# Este script se ejecuta en Railway
# Inicia el agente de voz que maneja las interacciones con los usuarios

echo "Iniciando LiveKit Agent..."
echo "Python version: $(python --version)"
echo "Memory info:"
free -h || echo "Memory info not available"

# Run with memory optimization
exec python -u agent.py start

