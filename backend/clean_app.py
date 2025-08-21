#!/usr/bin/env python3
"""
CLEAN Career Agent Backend - GUARANTEED NO [object Object]
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

def get_clean_response(user_message):
    """Get clean response with NO [object Object] ever"""
    lower_message = user_message.lower().strip()
    
    # SKILLS QUESTION
    if any(word in lower_message for word in ["skill", "tech", "technology", "programming", "language", "can", "do", "expertise"]):
        return """💻 **Abhinav's Technical Skills:**

• **Programming Languages**: C++, Python, JavaScript, Dart, Solidity, C#
• **Frontend Development**: React.js, Flutter, HTML/CSS, WebGL, Spark AR
• **XR Development (Specialty)**: Unity, Unreal Engine, OpenXR, MediaPipe
• **Backend & Cloud**: Node.js, Django, Azure, Auth0, Stripe
• **Blockchain & Web3**: Web3.js, Hardhat, Smart Contracts
• **AI/ML**: Gemini API, NLP, TensorFlow

His XR development expertise combined with full-stack capabilities makes him uniquely positioned."""

    # HIRING QUESTION
    if any(word in lower_message for word in ["hire", "hiring", "worth", "good", "qualified", "capable", "competent"]):
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

**Innovation & Leadership**:
• Disaster management system for NDRF
• Healthcare accessibility solutions
• Environmental monitoring robotics

His combination of technical skills, real-world experience, and innovative project work clearly demonstrates he's not just competent, but **exceptional** in his field."""

    # NAME/ABOUT QUESTION
    if any(word in lower_message for word in ["name", "who", "about", "introduction", "candidate"]):
        return """👋 **Abhinav Mishra - Dynamic Software Engineer & Innovator**

**Current Role**: Software Engineer at Persistent Systems, driving AI/ML innovation
**Education**: Bachelor of Technology, Computer Science Engineering with AI specialization at MAIT, GGSIPU
**Contact**: itsabhinav2005@gmail.com | +91 8851070377
**LinkedIn**: linkedin.com/mishra-abhinav05 | **GitHub**: github.com/Itsabhinav28

**Unique Value**: Proven ability to translate complex technologies—from immersive XR to advanced AI and Blockchain—into impactful, award-winning solutions.

**Track Record**: Secured government funding for projects like the NDRF's adopted Sangrakshan system and earned international recognition.

What specific aspect would you like to explore further?"""

    # PROJECTS QUESTION
    if any(word in lower_message for word in ["project", "build", "create", "developed", "work", "solution"]):
        return """🚀 **Abhinav's Major Projects:**

1. **Sangrakhshan** - NDRF Disaster Management System (React, Node.js, AI/ML, VR training)
2. **CRYPTXCHANGE** - Secure DeFi + EdTech Ecosystem (Blockchain, Solidity, Web3)
3. **ACCESSWAY** - AR/AI Accessibility Platform (AR, AI, accessibility solutions)
4. **HEAL-O-VERSE** - VR Healthcare Consultations (VR, healthcare, Unity)
5. **ENVIROBOT** - Environmental Monitoring Robot (IoT, Python, Arduino)

All projects address real-world problems with innovative technology solutions."""

    # ACHIEVEMENTS QUESTION
    if any(word in lower_message for word in ["achievement", "award", "recognition", "won", "prize", "hackathon"]):
        return """🏆 **Abhinav's Key Achievements:**

1. **Global Best M-Gov Awards 2025** - Bronze for India (Government Innovation)
2. **Smart India Hackathon'23** - Winner (₹27 lakhs funding secured)
3. **Hack4Purpose 2024 (IIT Delhi)** - 1st Runner-Up (600+ teams)
4. **Scale +91 Hackathon** - Top 3 (5000+ competing teams)
5. **Fintech Hackathon** - Winner
6. **IIT Delhi Innovation Award** - Prestigious Institute Recognition

These achievements span government innovation, competitive programming, and international recognition."""

    # EXPERIENCE QUESTION
    if any(word in lower_message for word in ["experience", "work", "job", "company", "role", "internship"]):
        return """💼 **Abhinav's Work Experience:**

• **Persistent Systems (Current)** - Software Engineer: AI/ML development, LangChain, OpenAI API
• **ONDC (2024)** - Software Developer: MERN Stack, PostgreSQL, E-commerce infrastructure
• **Ministry of Home Affairs (2023)** - XR Developer: Unity, Unreal Engine, Government innovation

Progression shows versatility from government XR work to enterprise AI development."""

    # GREETING
    if any(word in lower_message for word in ["hi", "hello", "hey", "how are you", "greetings"]):
        return """👋 **Hello! I'm Abhinav's AI Career Agent**

I'm here to help you learn about Abhinav Mishra's impressive career and achievements!

What would you like to know about?
• His technical skills and expertise
• His work experience and projects  
• His achievements and awards
• His innovative solutions

Just ask me anything specific!"""

    # DEFAULT RESPONSE
    return """🤖 **I'm Abhinav's AI Career Agent!**

I can provide detailed information about his:

🎓 **Education & Background** - Computer Science with AI specialization
💼 **Work Experience** - From government XR to enterprise AI
🏆 **Achievements & Awards** - International recognition and hackathon wins
💻 **Technical Skills** - Full-stack, XR, Blockchain, AI/ML expertise
🚀 **Projects** - Real-world solutions for disaster management, healthcare, environment

Ask me anything specific about his skills, experience, projects, or achievements!"""

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy', 
        'service': 'Abhinav Career Agent Backend - CLEAN VERSION',
        'model': 'Clean Agentic Career Agent (NO [object Object])',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Get clean response
        ai_response = get_clean_response(user_message)
        
        return jsonify({
            'response': ai_response,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/summary', methods=['GET'])
def get_summary():
    summary = """👋 **Welcome! I'm Abhinav's Career Agent**

I can tell you everything about Abhinav Mishra's impressive career:

🎯 **Current**: Software Engineer at Persistent Systems
🥽 **Specialty**: XR/VR Development & AI Integration  
🏆 **Recognition**: International awards and hackathon wins
🌍 **Impact**: Government projects and real-world solutions

Ask me anything about his skills, experience, projects, or achievements!"""
    
    return jsonify({
        'summary': summary,
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Starting CLEAN Career Agent Backend...")
    print("📍 Port: 5000")
    print("👤 Agent for: Abhinav Mishra")
    print("✅ GUARANTEED: NO [object Object] will ever appear!")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
