# Railway Configuration - IMPORTANT SETUP STEPS

## The Build Context Issue

Railway needs to use the `backend` directory as the root for building. Here's how to configure it:

## Option 1: Configure in Railway Dashboard (RECOMMENDED)

### Steps:

1. **Go to your Railway project** → Select your service
2. **Click on "Settings"** tab
3. **Scroll to "Service Settings"**
4. **Set "Root Directory"** to: `backend`
5. **Save changes**

Railway will now:
- Look for `railway.toml` in `backend/railway.toml` ✅
- Use `backend/` as the build context ✅
- Find `Dockerfile` at `backend/Dockerfile` ✅
- Copy files correctly with `COPY . .` ✅

## Option 2: Use Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Set root directory
railway service --root backend
```

## Option 3: Set via railway.json (Alternative)

If the above doesn't work, create this file at the repository root:

**File: `/home/robinson-working/un_agent/railway.json`**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "backend/Dockerfile"
  },
  "deploy": {
    "startCommand": "./start.sh",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

## Current File Structure

```
un_agent/
├── backend/
│   ├── Dockerfile          ← Docker build file
│   ├── railway.toml        ← Railway config
│   ├── start.sh            ← Startup script
│   ├── agent.py            ← Main agent code
│   ├── requirements.txt    ← Python dependencies
│   └── ...
├── frontend/
└── README.md
```

## Verification

After setting the root directory, Railway should show:
- ✅ Root Directory: `backend`
- ✅ Dockerfile Path: `Dockerfile` (relative to backend)
- ✅ Build succeeds without "backend/ not found" error

## What We Fixed

1. ✅ Moved `railway.toml` to `backend/` directory
2. ✅ Set `dockerfilePath = "Dockerfile"` (relative path)
3. ✅ Reverted Dockerfile to use `COPY . .` (not `COPY backend/ .`)

## Next Steps

1. **Set Root Directory in Railway Dashboard** to `backend`
2. **Push changes to GitHub**
3. **Redeploy** - Railway will now find all files correctly!

---

**Note**: The root directory setting is a Railway service configuration, not something we can set in code. You MUST configure it in the Railway dashboard or CLI.
