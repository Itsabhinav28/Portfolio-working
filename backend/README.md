# Abhinav Career Agent Backend

This is the Python backend for Abhinav's AI Career Agent, powered by Google's Gemini API.

## Features

- **Gemini AI Integration**: Uses Google's Gemini 2.0 Flash model for intelligent responses
- **CV Analysis**: Provides detailed, contextual answers based on Abhinav's actual resume
- **RESTful API**: Clean endpoints for chat and career summary
- **CORS Enabled**: Works seamlessly with the React frontend

## Setup

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
Create a `.env` file with:
```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash-exp
```

### 3. Start the Backend
```bash
python app.py
```

Or on Windows, double-click `start_backend.bat`

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns backend status

### Career Summary
- **GET** `/api/summary`
- Returns AI-generated career introduction

### Chat
- **POST** `/api/chat`
- Body: `{"message": "user question"}`
- Returns: `{"response": "ai response", "timestamp": "..."}`

## How It Works

1. **CV Context**: The backend contains Abhinav's complete CV data
2. **Gemini Integration**: Uses Google's Gemini API for intelligent analysis
3. **Dynamic Responses**: Every question gets a unique, contextual answer
4. **Frontend Integration**: React frontend communicates via REST API

## Troubleshooting

- **Port 5000**: Ensure port 5000 is available
- **Gemini API Key**: Verify your API key is valid
- **Dependencies**: Make sure all Python packages are installed

## Security

- API key is stored in environment variables
- CORS is configured for local development
- Input validation and error handling included
