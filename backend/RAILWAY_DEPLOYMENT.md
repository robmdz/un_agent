# Railway Deployment Guide

This guide explains how to deploy the LiveKit agent to Railway and troubleshoot common issues.

## Prerequisites

- Railway account ([railway.app](https://railway.app))
- All required API keys:
  - LiveKit credentials (URL, API Key, API Secret)
  - OpenAI API key
  - Google Maps API key
  - SerpAPI key

## Deployment Steps

### 1. Create Railway Project

```bash
# Install Railway CLI (optional)
npm i -g @railway/cli

# Login to Railway
railway login
```

### 2. Configure Environment Variables

In your Railway project dashboard, add these environment variables (see `.env.railway` for the complete list):

**Required:**
- `LIVEKIT_URL` - Your LiveKit server URL
- `LIVEKIT_API_KEY` - LiveKit API key
- `LIVEKIT_API_SECRET` - LiveKit API secret
- `OPENAI_API_KEY` - OpenAI API key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key
- `SERPAPI_API_KEY` - SerpAPI key for Google Search

### 3. Deploy from GitHub

1. Connect your GitHub repository to Railway
2. Select the `backend` directory as the root path
3. Railway will automatically detect the `Dockerfile` and `railway.toml`
4. Click "Deploy"

### 4. Monitor Deployment

Watch the deployment logs for:
- ✅ "Iniciando LiveKit Agent..."
- ✅ "Starting agent entrypoint"
- ✅ "Connected to LiveKit room"
- ✅ "Agent session started successfully"

## Memory Optimization

The deployment has been optimized to prevent OOM (Out-of-Memory) kills:

### What We Fixed

1. **Removed Model Pre-download**: Models now lazy-load at runtime instead of being downloaded during Docker build
2. **Memory Limits**: Set to 1GB in `railway.toml`
3. **Python Optimization Flags**:
   - `PYTHONUNBUFFERED=1` - Unbuffered output
   - `PYTHONDONTWRITEBYTECODE=1` - No .pyc files
   - `MALLOC_TRIM_THRESHOLD_=100000` - Aggressive memory trimming
4. **Graceful Shutdown**: Proper cleanup to prevent crashes during worker termination

### Expected Memory Usage

- **Startup**: ~200-400MB
- **With Models Loaded**: ~600-800MB
- **Peak Usage**: Should stay under 1GB

## Troubleshooting

### Issue: Exit Code -9 (OOM Kill)

**Symptoms:**
- "process exited with non-zero exit code -9"
- "Failed to get memory info for process"

**Solutions:**
1. Upgrade Railway plan for more memory (Hobby plan: 8GB)
2. Reduce concurrent sessions (if handling multiple rooms)
3. Check logs for memory leaks

### Issue: Worker Fails to Start

**Symptoms:**
- "RuntimeError: cannot simulate job, the worker is closed"
- Worker crashes during startup

**Solutions:**
1. Verify all environment variables are set correctly
2. Check LiveKit credentials are valid
3. Review logs for missing dependencies

### Issue: Models Not Loading

**Symptoms:**
- "Failed to load model"
- Timeout during startup

**Solutions:**
1. Increase `healthcheckTimeout` in `railway.toml`
2. Check network connectivity
3. Verify OpenAI API key is valid

## Monitoring

### View Logs

```bash
# Using Railway CLI
railway logs

# Or view in Railway dashboard
```

### Check Memory Usage

Railway dashboard shows real-time memory usage. Watch for:
- Gradual memory increase (possible leak)
- Sudden spikes (model loading)
- Hitting the 1GB limit

## Scaling Considerations

For production use:

1. **Upgrade Plan**: Use Railway Hobby plan ($5/month) for 8GB RAM
2. **Multiple Workers**: Deploy multiple instances for load balancing
3. **Health Checks**: Monitor worker health via Railway metrics
4. **Auto-restart**: Configured in `railway.toml` with max 3 retries

## Files Reference

- `railway.toml` - Railway configuration (memory limits, health checks)
- `Dockerfile` - Optimized container build
- `start.sh` - Startup script with memory monitoring
- `.env.railway` - Environment variables template
- `agent.py` - Agent code with graceful shutdown handling
