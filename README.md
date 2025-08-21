# Abhinav Mishra – Portfolio + Agentic Career Bot

This repository contains a Vite + React frontend and a Python/Flask backend that powers an Agentic Career AI using Google Gemini. It includes rich UI (Tailwind + Framer Motion) and a chat agent that answers about Abhinav's skills, experience and achievements from an expanded CV context.

## Tech Stack
- Frontend: Vite, React, Tailwind CSS, Framer Motion, react-markdown
- Backend: Python, Flask, Flask-CORS, google-generativeai
- Deployment: Vercel (frontend and backend as separate projects)

---

## 1) Local Development

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- A Google Gemini API key

### Clone
```bash
git clone <your-repo-url>
cd Portfolio-working
```

### Frontend setup
```bash
# from repo root
npm install

# environment (frontend)
# create .env.local at the repo root
# IMPORTANT: never commit real keys
cat > .env.local << 'EOF'
VITE_GEMINI_API_KEY=your_google_api_key
VITE_GEMINI_MODEL_ID=gemini-2.5-flash
# Backend base URL for local dev
VITE_CAREER_API_BASE=http://localhost:5000/api
EOF

# start dev server
npm run dev
# Vite will print a URL like http://localhost:5173 or 5174
```

### Backend setup
```bash
# in a second terminal
cd backend
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell
# or source .venv/bin/activate for macOS/Linux
pip install -r requirements.txt

# environment (backend)
# create apikey.env (kept out of VCS)
cat > apikey.env << 'EOF'
GOOGLE_API_KEY=your_google_api_key
GEMINI_MODEL=gemini-2.5-flash
# Optional: PORT=5000
EOF

# run
python gemini_career_agent.py
# Flask will listen on http://localhost:5000 by default
```

### Frontend service endpoints
The frontend calls the Python API via `src/services/geminiService.js`:
- GET `/api/health`
- POST `/api/chat`  { message }
- GET `/api/summary`

Ensure `VITE_CAREER_API_BASE` in `.env.local` points to the backend base URL.

---

## 2) Production Deployment on Vercel
Deploy the frontend and backend as two Vercel projects (same repo; set each project Root Directory accordingly).

### A) Backend (Flask) on Vercel – Serverless Function
Vercel’s Python runtime serves files in an `api/` directory as functions. We’ll keep all code inside `backend/` and add a tiny wrapper.

1. Root Directory: `backend`
2. Create a file `backend/api/index.py` with the following content:
```python
# backend/api/index.py
# Expose the Flask app from gemini_career_agent.py to Vercel's Python runtime
from gemini_career_agent import app  # do not rename: Vercel looks for variable named "app"
```
3. (Optional but recommended) Add `backend/vercel.json` to pin runtime/resources:
```json
{
  "functions": {
    "api/index.py": {
      "runtime": "python3.11",
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```
4. In Vercel → New Project → Import the repo → Set Root Directory to `backend` → Continue.
5. Install Command: `pip install -r requirements.txt`
6. Build Command: leave empty (not needed for Python functions)
7. Output Directory: leave empty
8. Environment Variables (in Vercel Project Settings):
   - `GOOGLE_API_KEY` = your key
   - `GEMINI_MODEL` = `gemini-2.5-flash`
9. Deploy. After deploy, your API URL will look like:
   - `https://<your-backend-project>.vercel.app/api`

You can verify with:
```bash
curl https://<your-backend-project>.vercel.app/api/health
```

### B) Frontend (Vite) on Vercel – Static Build
1. Root Directory: project root (where `index.html` and `package.json` live)
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Environment Variables (in Vercel Project Settings → Frontend):
   - `VITE_GEMINI_API_KEY` = your key (optional if backend handles all Gemini calls)
   - `VITE_GEMINI_MODEL_ID` = `gemini-2.5-flash`
   - `VITE_CAREER_API_BASE` = `https://<your-backend-project>.vercel.app/api`
5. Deploy.

Vercel will auto-detect Vite. If you want an explicit `vercel.json` at the root, you may use:
```json
{
  "version": 2,
  "builds": [{ "src": "index.html", "use": "@vercel/static-build" }],
  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
}
```

> Note: Do not mix backend and frontend into a single Vercel project unless you re-structure the backend as `/api/*` at the root. Using two projects keeps concerns clean and avoids routing conflicts.

---

## 3) Environment Reference

Frontend (`.env.local`):
```
VITE_GEMINI_API_KEY=...
VITE_GEMINI_MODEL_ID=gemini-2.5-flash
VITE_CAREER_API_BASE=https://<your-backend-project>.vercel.app/api
```

Backend (`backend/apikey.env` in dev; Vercel Project Env in prod):
```
GOOGLE_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
```

---

## 4) Common Tasks

### Run lint/build locally
```bash
npm run build    # frontend build
```

### Test backend locally
```bash
cd backend
python gemini_career_agent.py
curl http://localhost:5000/api/health
```

---

## 5) Troubleshooting
- 404 on API in production: check the backend project domain and that the `api/index.py` file exists and exports `app`.
- CORS errors locally: `Flask-CORS` is installed and enabled in the backend; ensure frontend points to the correct backend URL.
- Vercel build failures (backend): verify Python version in `vercel.json` and that `requirements.txt` installs successfully.

---

## 6) License
Personal use by Abhinav Mishra. Do not redistribute keys or private CV data.
