# Vercel serverless entrypoint for the Flask backend
# Exposes the Flask app instance so Vercel can serve it under /api

from gemini_career_agent import app  # Flask app instance
