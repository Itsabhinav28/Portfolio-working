# Vercel serverless entrypoint for the Flask backend
# Exposes the Flask app instance so Vercel can serve it under /api

from pathlib import Path
import sys

# Ensure parent directory (backend/) is on the import path so we can import gemini_career_agent
sys.path.append(str(Path(__file__).resolve().parent.parent))

from gemini_career_agent import app  # Flask app instance
