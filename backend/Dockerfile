FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (minimal for audio processing)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies from backend directory
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code from backend directory
COPY backend/ .

# Make start script executable
RUN chmod +x start.sh

# Set Python to use less memory
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV MALLOC_TRIM_THRESHOLD_=100000

# Port configuration (Railway will override this)
ENV PORT=8080

# Run the start script
CMD ["./start.sh"]

