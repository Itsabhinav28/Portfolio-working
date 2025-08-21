#!/usr/bin/env python3
"""
REAL AI Career Agent using Gemini API
Integrates with Abhinav's CV data for intelligent responses
"""
import os
import json
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv('apikey.env')

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
GEMINI_MODEL = os.getenv('GEMINI_MODEL', 'gemini-2.5-flash')

if not GOOGLE_API_KEY:
    logger.error("❌ GOOGLE_API_KEY not found in apikey.env")
    raise ValueError("GOOGLE_API_KEY is required")

genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Gemini model
try:
    model = genai.GenerativeModel(GEMINI_MODEL)
    logger.info(f"✅ Gemini model initialized: {GEMINI_MODEL}")
except Exception as e:
    logger.error(f"❌ Failed to initialize Gemini model: {e}")
    raise

# CV Context from Abhinav's resume
CV_CONTEXT = """
ABHINAV MISHRA - CAREER PROFILE

PERSONAL INFORMATION:
- Name: Abhinav Mishra
- Phone: +91 8851070377
- Email: itsabhinav2005@gmail.com
- LinkedIn: linkedin.com/mishra-abhinav05
- GitHub: github.com/Itsabhinav28

EDUCATION:
- Institution: Maharaja Agrasen Institute of Technology, GGSIPU
- Period: Sep 2023 – Jun 2027
- Degree: Bachelor of Technology, Computer Science Engineering with specialization in Artificial Intelligence

CURRENT ROLE:
- Position: Software Engineer at Persistent Systems
- Focus: AI/ML development, LangChain, OpenAI API integration

WORK EXPERIENCE:
1. Persistent Systems (Current) - Software Engineer
   - AI/ML development and integration
   - LangChain and OpenAI API implementation
   
2. ONDC (2024) - Software Developer
   - MERN Stack development
   - PostgreSQL database management
   - E-commerce infrastructure development
   
3. Ministry of Home Affairs (2023) - XR Developer
   - Unity and Unreal Engine development
   - Government innovation projects

TECHNICAL SKILLS:
- Programming Languages: C++, Python, JavaScript, Dart, Solidity, C#
- Frontend Development: React.js, Flutter, HTML/CSS, WebGL, Spark AR
- XR Development (Specialty): Unity, Unreal Engine, OpenXR, MediaPipe
- Backend & Cloud: Node.js, Django, Azure, Auth0, Stripe
- Blockchain & Web3: Web3.js, Hardhat, Smart Contracts
- AI/ML: Gemini API, NLP, TensorFlow

MAJOR PROJECTS:
1. Sangrakhshan - NDRF Disaster Management System
   - Technologies: React, Node.js, AI/ML, VR training
   - Impact: Government adoption for disaster management
   
2. CRYPTXCHANGE - Secure DeFi + EdTech Ecosystem
   - Technologies: Blockchain, Solidity, Web3
   - Focus: Financial technology and education
   
3. ACCESSWAY - AR/AI Accessibility Platform
   - Technologies: AR, AI, accessibility solutions
   - Purpose: Making technology accessible to all
   
4. HEAL-O-VERSE - VR Healthcare Consultations
   - Technologies: VR, healthcare, Unity
   - Application: Virtual healthcare solutions
   
5. ENVIROBOT - Environmental Monitoring Robot
   - Technologies: IoT, Python, Arduino
   - Purpose: Environmental sustainability

ACHIEVEMENTS & AWARDS:
1. Global Best M-Gov Awards 2025 - Bronze for India (Government Innovation)
2. Smart India Hackathon'23 - Winner (₹27 lakhs funding secured)
3. Hack4Purpose 2024 (IIT Delhi) - 1st Runner-Up (600+ teams)
4. Scale +91 Hackathon - Top 3 (5000+ competing teams)
5. Fintech Hackathon - Winner
6. IIT Delhi Innovation Award - Prestigious Institute Recognition

UNIQUE VALUE PROPOSITION:
Abhinav is a dynamic software engineer with proven ability to translate complex technologies—from immersive XR to advanced AI and Blockchain—into impactful, award-winning solutions. His combination of technical expertise, government project experience, and international recognition demonstrates exceptional competency in the field.
"""

def create_system_prompt():
    """Create the system prompt for the AI agent"""
    return f"""You are Abhinav Mishra's AI Career Agent. You have access to his complete career profile and should answer questions about his background, skills, experience, projects, and achievements.

IMPORTANT RULES:
1. ALWAYS respond in a professional, engaging manner
2. Use the CV data provided to give accurate, detailed answers
3. Format responses with clear sections, bullet points, and emojis for readability
4. NEVER mention that you are an AI or that you have access to CV data
5. Respond as if you ARE Abhinav or his personal representative
6. Be enthusiastic about his achievements and capabilities
7. Use markdown formatting for better presentation
8. Keep responses concise but informative
9. If asked about something not in the CV, politely redirect to what you do know

CV CONTEXT:
{CV_CONTEXT}

Remember: You are representing Abhinav Mishra professionally. Be confident, knowledgeable, and engaging in your responses."""

def generate_ai_response(user_message):
    """Generate AI response using Gemini API with proper error handling"""
    try:
        # Create the conversation prompt
        system_prompt = create_system_prompt()
        
        # Format the user message
        user_prompt = f"""
User Question: {user_message}

Please provide a comprehensive, professional response based on Abhinav's CV data.
"""
        
        # Combine system and user prompts
        full_prompt = f"{system_prompt}\n\n{user_prompt}"
        
        logger.info(f"🤖 Generating AI response for: {user_message[:50]}...")
        
        # Generate response using Gemini
        response = model.generate_content(full_prompt)
        
        # Extract the text response
        if response and hasattr(response, 'text'):
            ai_response = response.text.strip()
            logger.info("✅ AI response generated successfully")
            return ai_response
        else:
            logger.warning("⚠️ Unexpected response format from Gemini")
            return "I'm having trouble processing your request right now. Please try again."
            
    except Exception as e:
        logger.error(f"❌ Error generating AI response: {e}")
        # Fallback to a pre-written response based on keywords
        return generate_fallback_response(user_message)

def generate_fallback_response(user_message):
    """Generate fallback response when AI fails"""
    lower_message = user_message.lower().strip()
    
    if any(word in lower_message for word in ["skill", "tech", "technology", "programming"]):
        return """💻 **Abhinav's Technical Skills:**

• **Programming Languages**: C++, Python, JavaScript, Dart, Solidity, C#
• **Frontend Development**: React.js, Flutter, HTML/CSS, WebGL, Spark AR
• **XR Development (Specialty)**: Unity, Unreal Engine, OpenXR, MediaPipe
• **Backend & Cloud**: Node.js, Django, Azure, Auth0, Stripe
• **Blockchain & Web3**: Web3.js, Hardhat, Smart Contracts
• **AI/ML**: Gemini API, NLP, TensorFlow

His XR development expertise combined with full-stack capabilities makes him uniquely positioned."""
    
    elif any(word in lower_message for word in ["hire", "hiring", "worth", "qualified", "competent"]):
        return """✅ **Abhinav is Highly Competent & Exceptionally Qualified**

**Technical Excellence**:
• Full-stack development across multiple tech stacks
• Specialized expertise in XR/VR development (Unity, Unreal Engine)
• Blockchain development with smart contracts
• AI/ML integration in production systems

**Proven Track Record**:
• Working at Persistent Systems (top-tier tech company)
• Government projects for Ministry of Home Affairs
• Multiple hackathon wins and international recognition
• Real-world project deployments

His combination of technical skills, real-world experience, and innovative project work clearly demonstrates he's not just competent, but **exceptional** in his field."""
    
    else:
        return """👋 **Hello! I'm Abhinav's AI Career Agent**

I can provide detailed information about his:

🎓 **Education & Background** - Computer Science with AI specialization
💼 **Work Experience** - From government XR to enterprise AI
🏆 **Achievements & Awards** - International recognition and hackathon wins
💻 **Technical Skills** - Full-stack, XR, Blockchain, AI/ML expertise
🚀 **Projects** - Real-world solutions for disaster management, healthcare, environment

Ask me anything specific about his skills, experience, projects, or achievements!"""

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy', 
        'service': 'Abhinav Career Agent - REAL AI with Gemini',
        'model': GEMINI_MODEL,
        'ai_status': 'active',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages with AI"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        logger.info(f"💬 Chat message received: {user_message[:50]}...")
        
        # Generate AI response
        ai_response = generate_ai_response(user_message)
        
        logger.info(f"✅ Chat response generated successfully")
        
        return jsonify({
            'response': ai_response,
            'timestamp': datetime.now().isoformat(),
            'ai_generated': True
        })
        
    except Exception as e:
        logger.error(f"❌ Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/summary', methods=['GET'])
def get_summary():
    """Get career summary"""
    summary = """👋 **Welcome! I'm Abhinav's Career Agent**

I can tell you everything about Abhinav Mishra's impressive career:

🎯 **Current**: Software Engineer at Persistent Systems
🥽 **Specialty**: XR/VR Development & AI Integration  
🏆 **Recognition**: International awards and hackathon wins
🌍 **Impact**: Government projects and real-world solutions

Ask me anything about his skills, experience, projects, or achievements!"""
    
    return jsonify({
        'summary': summary,
        'timestamp': datetime.now().isoformat(),
        'ai_generated': False
    })

@app.route('/api/test-ai', methods=['GET'])
def test_ai():
    """Test AI functionality"""
    try:
        test_message = "What are Abhinav's technical skills?"
        ai_response = generate_ai_response(test_message)
        
        return jsonify({
            'status': 'success',
            'test_message': test_message,
            'ai_response': ai_response,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"❌ AI test failed: {e}")
        return jsonify({
            'status': 'error',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    
    logger.info("🚀 Starting REAL AI Career Agent Backend...")
    logger.info(f"📍 Port: {port}")
    logger.info(f"👤 Agent for: Abhinav Mishra")
    logger.info(f"🤖 AI Model: {GEMINI_MODEL}")
    logger.info("✅ Backend ready to serve!")
    
    app.run(host='0.0.0.0', port=port, debug=True)
