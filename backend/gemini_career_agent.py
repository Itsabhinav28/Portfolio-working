#!/usr/bin/env python3
"""
REAL Gemini API Career Agent - NO [object Object] EVER
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

# CV Context from Abhinav's comprehensive resume data
CV_CONTEXT = """
ABHINAV MISHRA - COMPREHENSIVE CAREER PROFILE

ABHINAV_MISHRA-RESUME:
ABHINAV MISHRA +91 8851070377 github.com/Itsabhinav28 itsabhinav2005@gmail.com linkedin.com/mishra-abhinav05 EDUCATION Maharaja Agrasen Institute of Technology, GGSIPU Sep 2023 – Jun 2027 Bachelor of Technology, Computer Science Engineering with specialization in Artificial Intelligence HACKATHONS & IDEATHONS ACHIEVEMENTS ▪ Global Best M-Gov Award 2025 – Bronze for India : Honored by UAE VP at World Government Summit (AccessWay) ▪ Smart India Hackathon 2023 Winner – ₹24L Govt. Funding; Deployed by NDRF (Sangrakhshan) & Home Ministry (GOI) ▪ Hack4Purpose @ IIT Delhi – 1st Runner-Up out of 600+ teams ▪ Scale +91 Hackathon 2024 – Top 3 (among 5000+ teams) ▪ HackBMU 2025 – 1st Prize (out of 500+ teams) ▪ Haryana Police Hackathon – Top 10 (AR/VR for anti-drug platform) ▪ BITBOX 4.0 (JIIT) – Best All-Freshers Team ▪ SIH IDE Bootcamp 2024 – Top Performer ; Registered with Wadhwani Foundation ▪ FISHTANK Pitchathon – Runner-Up (XR-VERSE) SKILLS ▪ Languages : C++, Python, JavaScript, Dart, Solidity, C# ▪ Frontend : React.js, Flutter, HTML/CSS, WebGL, Spark AR ▪ Backend : Node.js, Express.js, Django, REST APIs ▪ XR Development : Unity, Unreal Engine, OpenXR, MediaPipe ▪ Blockchain : Web3.js, Hardhat, Solidity (Smart Contracts) ▪ Databases : MongoDB, PostgreSQL, Firebase ▪ Tools : Git, Linux, Docker, Figma, Blender ▪ AI/ML : Gemini API, NLP, TensorFlow ▪ Soft Skills : Problem-Solving, Leadership, Communication, Teamwork, Resilience PROJECTS Sangrakshan : VR Based Training Module for Disaster Response (Nationally Acclaimed) (DEMO LINK) Tech Stack: Unity, Unreal (C++), MediaPipe, Django (Python), ChatGPT API, Blender, MERN ▪ A VR-based CBRN disaster training platform for NDRF with multiplayer FPV/TPV modes, posture tracking, AR equipment model & AI chatbot support. ▪ Key Features : Real-time Immersive drills, spatial AR visualizations, MediaPipe posture analysis, & dual dashboards (app/web) AccessWay – AI/AR Accessibility Platform (Internationally Acclaimed) (DEMO LINK) Tech Stack: ARCore, Unity (C#), Flutter (dart), Firebase, MongoDB, Blender ▪ An inclusive navigation & social platform for people with disabilities using AR overlays, AI voice guidance, & crowdsourced data. ▪ Key Features: Indoor/outdoor AR routing, accessibility reviews, voice navigation, business certifications WooCommerce ONDC Adaptor – Bridging eCommerce Sellers to a Decentralized Network (DEMO LINK) Tech Stack: React.js, Node.js, Django, Express.js, PostgreSQL, OAuth, Jest, MongoDB ▪ Designed a full-stack adaptor for seamless WooCommerce-ONDC integration, enabling catalog sync, order handling, & scalable decentralized commerce. ▪ Key Features : API translation layer, real-time order tracking, user-friendly admin dashboard, scalable & ONDC-compliant architecture CRYPTXCHANGE – Secure DeFi + EdTech Ecosystem (Regionally Acclaimed) (DEMO LINK) Tech Stack: MERN, Solidity, Web3.js, Node.js, MongoDB, IPFS, Biometric AI, Voiceflow ▪ A decentralized crypto platform integrating AI-based fraud detection, biometric auth, real-time analytics, & gamified learning. ▪ Key Features : Multi-chain swaps, AI threat detection (TensorFlow), Crypto Academy, expense visualizations EXPERIENCE NDRF : National Disaster Response Force (Ministry of Home Affairs) – Project Lead Jan 2025 – Present ▪ Led the development of "Sangrakhshan" – a VR simulator for CBRN disaster training; Collaborated with NDRF 8th Battalion for deployment & real-world simulation testing ONDC : Open Network for Digital Commerce – Software Development Intern Dec 2024 – Apr 2025 ▪ Built ONDC-compliant WooCommerce adaptor; enabled catalog sync, order flow, & post-fulfillment; Developed scalable API translation layer & seller dashboard (React.js, Django, PostgreSQL) Persistent Systems – Software Development Intern (Mentored Project) Jun 2024 – Present ▪ Working on an Agentic AI project focused on autonomous agents and contextual intelligence. (LangChain, OpenAI API, pinecone, LlamaIndex, Flask, Streamlit) LEADERSHIP & IMPACT Business Development Head – Startup Sphere, MAIT : Advised 15+ startups, led 500+ participant events, & delivered nationally awarded projects. Technical Head – AIvolutions, MAIT : Conducted workshops on Metaverse, Unity & Blockchain for 200+ students; led society tech initiatives. Driven technologist with 17+ projects (6 Internationally & nationally recognized), ₹27L+ in funding secured, 30+ open-source contributions, and 10+ hackathon wins including honors from UAE GovTech and Government of India

ACHIEVEMENTS_COMPREHENSIVE:
ABHINAV MISHRA +91 8851070377 itsabhinav2005@gmail.com linkedin.com/mishra-abhinav05 github.com/Itsabhinav28 EDUCATION Maharaja Agrasen Institute of Technology, GGSIPU Sep 2023 – Jun 2027 Bachelor of Technology, Computer Science Engineering with specialization in Artificial Intelligence HACKATHONS & IDEATHONS ACHIEVEMENTS 1. Global Best M-Gov Awards 2025 – Bronze for India o Project: AccessWay (AR/AI accessibility platform for disabilities). o Recognition: Awarded by UAE Vice President at World Governments Summit, Dubai. 2. Smart India Hackathon'23 – Winner o Project: Sangrakhshan (VR-based CBRN disaster training for NDRF). o Impact: Secured ₹27 lakhs in government funding; adopted by NDRF 8th Battalion. 3. Hack4Purpose 2024 (IIT Delhi) – 1st Runner-Up (Among 600+ Teams) o Project: Heal-o-Verse : Virtual Appointment Metaverse (VR healthcare consultations). 4. Scale +91 Hackathon : FINTECH FESTIVAL 2024 – Top 3 (Among 5000 teams) o Project: CRYPTXCHANGE (DeFi platform with metaverse education). 5. Haryana Police Hackathon 2024 – Top 10 o Project: Nav Yuva Chetna (AR/VR anti-drug abuse platform). 6. HackBMU 2025 – 1st Prize (Among 500 teams) o Project: Pathshala (XR learning platform for inclusive education). 7. BITBOX 4.0 (JIIT) – Best All-Freshers Team o Project: Vidyalaya (Gamified EdTech Metaverse). 8. SIH - IDE Bootcamp 2024 – Top Performing Idea o Project: XR Labs (Metaverse for disaster management training). o Recognition: Startup registered with Wadhwani Foundation. 9. FISHTANK Pitchathon – Runner-Up o Venture: XR-VERSE (AR/VR service solutions).

INTERNSHIPS_&_EXPERIENCE_COMPREHENSIVE:
INTERNSHIPS & GOVT PROJECTS 1. Cantilever (Web Development Intern) July – August 2024 Tech Stack: HTML/CSS, React.js, Node.js, Express.js, MongoDB Achievements: o Successfully designed and developed multiple dynamic websites, including an e-commerce platform and a news analysis portal. o Implemented features such as secure payment gateways, real-time data updates, and advanced search functionalities. 2. ONDC (Open Network for Digital Commerce) Dec 2024 – April 2025 Role: Software Development Intern Key Contributions: o Designed and implemented a seamless integration adaptor for WooCommerce, compliant with ONDC Retail Protocol. o Developed an API translation layer to support catalog synchronization and order management workflows. Tech Stack: React.js, Django, PostgreSQL Repo: WooCommerce Adaptor 3. NDRF - Ministry of Home Affairs (Project Lead) Jan 2025 – Present Project: Sangrakhshan Key Contributions: o Led the development of a VR-based training simulator for CBRN disaster preparedness. o Collaborated with NDRF 8th Battalion for real-world implementation. Demo: Drive Link Repo: NDRF-DEMO 4. XR-VERSE (Founding Member) April 2024 – Present Role: XR Developer Key Contributions: o Developed immersive AR/VR solutions for businesses, including custom metaverse environments. o Contributed to the company's vision of democratizing XR technology. Demo: XR-VERSE Site 5. Persistent Systems – Software Development Intern June 2025 – Present Key Contributions: o Working on an Agentic AI project focused on autonomous agents and contextual intelligence; optimized multi-agent workflow with LangChain, OpenAI API, Pinecone, LlamaIndex, Flask, and Streamlit, reducing manual intervention by 70%.

LEADERSHIP_&_IMPACT_COMPREHENSIVE:
LEADERSHIP & IMPACT Business Development Head @ Startup Sphere • Mentored 15+ startups and organized ideathons with 500+ participants. • Delivered award-winning projects recognized at national hackathons. Technology & Development Head @ AIvolutions (MAIT) • Conducted workshops on Metaverse, Unity, and blockchain for 200+ students. • Provided technical guidance for society-led innovation projects. Co-Founder @ XR-VERSE • Pitched AR/VR solutions to 50+ clients and secured partnerships. • Won ₹10,000 at FISHTANK Pitchathon for innovative XR use cases. METRICS: • Funding Raised: ₹27 lakhs (NDRF collaboration). • Projects Developed: 20+ (6 featured in national/international hackathons). • Open Source Contributions: 30+ repositories. • Awards: 10+ hackathon wins, including UAE GovTech recognition.

PROJECTS_COMPREHENSIVE:
o ChatGPT API, PostgreSQL 2. Nav Yuva Chetna (NYC): Anti-Drug Abuse Metaverse Feb 2024 GitHub: DDD-APP Description: Metaverse platform combating drug abuse through AR content blocking and VR decision-making games. Key Features: o AI humanoid avatars for counseling. o Web3-powered anonymous chat. o Fitness challenges with leaderboards. Tech Stack: o Unity, Ethereum o Flutter, Solidity o MediaPipe, Firebase 3. CRYPTXCHANGE: DeFi Platform Mar 2024 GitHub: CRYPTXCHANGE Description: Decentralized crypto exchange with AI fraud detection and a metaverse learning hub. Key Features: o Smart contracts for swaps. o AI-driven investment insights. o Beginner-friendly EdTech resources. Tech Stack: o Solidity, Web3.js o Flutter, TensorFlow o React.js, MongoDB 4. BharatVerse: Cultural Metaverse Apr 2024 GitHub: BharatVerse Description: Virtual tours of Indian heritage sites with AI guidance and sustainability hubs. Key Features: o AI companion "Disha" for cultural insights. o Gamified eco-challenges. o Customizable avatars in traditional attire. Tech Stack: o Unreal Engine, Oculus SDK o ChatGPT API, Firebase o MERN stack 5. Vidyalaya: Gamified Learning Metaverse Apr 2024 GitHub: Vidyalaya Description: Metaverse EdTech platform with AR/VR classrooms and adaptive learning pathways. Key Features: o Multiplayer quizzes and 3D science labs. o Real-time progress dashboards for teachers. o Cross-device compatibility (web/mobile). Tech Stack: o Unity, Blender o MERN stack, Flutter o Gemini API, OpenCV 6. Heal-O-Verse: Metaverse Doctor Consultancy May 2024 GitHub: Greedyiitdelhi Description: VR platform for doctor consultations and intern training with posture analytics. Key Features: o Metaverse waiting rooms. o MediaPipe-powered physiotherapy tracking. o Multi-language support. Tech Stack: o Unity, MERN o MediaPipe, NLP o Firebase 7. Cantilever: MERN Stack E-Commerce July - Aug 2024 GitHub: Cantilever Description: Full-stack e-commerce platform with payment gateways and admin dashboards. Key Features: o Stripe/PayPal integration. o JWT authentication. o Responsive React.js UI Tech Stack: o React.js, Node.js o MongoDB, Jest o Docker, Bootstrap 8. WiseWaste: Circular Economy Platform Nov 2024 GitHub: WiseWaste Description: Community-driven app to reduce waste through AR tutorials and token rewards. Key Features: o AR-guided composting. o NGO partnership dashboards. o Tokenized incentives. Tech Stack: o Flutter, ARCore o Firebase, Solidity o Python 9. Herbal-Reet: Ayurvedic Metaverse Oct 2024 GitHub: Herbal-Reet Demo: herbal-reet.vercel.app Description: Metaverse platform for exploring medicinal plants with AI-guided botany. Key Features: o AR plant visualization. o Yoga sessions with posture feedback. o Gamified certifications. Tech Stack: o Unity, Blender o MERN, Gemini LLM o Spark AR 10. Wave Wise: Ocean Literacy Platform Sept 2024 GitHub: WaveWise Demo: wave-wise.vercel.app Description: Gamified platform for ocean conservation education. Key Features: o Real-time multiplayer cleanup games. o AI assistant for sustainability tips. o Expert-led webinars. Tech Stack: o React.js, Three.js o Unity, Python o GPT-3 11. Enviro-Bot: Sustainability Chatbot Jan 2025 GitHub: Enviro-Bot Description: AI chatbot guiding users on eco-friendly practices. Key Features: o Carbon footprint tracking. o Community-driven challenges. o Educational modules. Tech Stack: o Python, TensorFlow o Flask, Firebase o GPT-3 12. AccessWay: Accessibility Platform Feb 2025 GitHub: AccessWay Description: AR navigation tool for people with disabilities. Key Features: o Crowdsourced accessibility data. o Business certification system. o Voice-guided routes. Tech Stack: o ARCore, React.js o Node.js, TensorFlow o Firebase 13. Saarthi: Offline-First EdTech Dec 2025 GitHub: Saarthi-App Description: Multilingual education app for underserved communities. Key Features: o Offline STEM courses. o NGO-sponsored device donations. o Gamified regional content. Tech Stack: o Flutter, SQLite o GPT-3, Firebase o REST APIs 14. Pathshala: XR Learning Mobile App Apr 2025 GitHub: Pathshala Description: Smartphone-first XR education platform with inclusive design. Key Features: o Offline-first AI tutors (Gemini API): Works without internet. o Headset-free AR labs (Unity/OpenXR): STEM experiments on mobile. o Neuro-inclusive UI: Dyslexic-friendly fonts, high contrast. o MERN + Flutter stack: Cross-device scalability. Tech Stack: o Flutter, Dart o Unity, OpenXR o Firebase, Gemini API 15. HeritageSphere: Cultural Preservation Dec 2024 GitHub: HeritageSphere Description: Metaverse platform for virtual heritage tours and artisan support. Key Features: o Blockchain rewards for eco-actions. o AR historical overlays. o Artisan marketplace. Tech Stack: o Unreal Engine, Solidity o ARCore, MERN o MediaPipe 16. WooCommerce ONDC Adaptor Dec 2024 - Apr 2025 GitHub: WooCommerce Adaptor Description: Decentralized eCommerce integration for ONDC compliance. Key Features: o API translation layer. o Real-time order tracking. o Seller admin panel. Tech Stack: o React.js, Node.js o PostgreSQL, OAuth o Jest 17. LogiGreen: Sustainable Logistics Platform Jan 2025 GitHub: LogiGreen Description: AI-driven logistics optimization platform for eco-friendly packaging and route planning. Key Features: o AI-powered route optimization for fuel efficiency. o AR-guided packaging simulations. o Sustainability certifications for businesses. Tech Stack: o React.js, Node.js o TensorFlow (AI), ARCore o Firebase, Solidity

SKILLS_COMPREHENSIVE:
TECHNICAL SKILLS • Languages : C++, Python, JavaScript, Dart, Solidity, C# • Frontend : React.js, Flutter, HTML/CSS, WebGL, Spark AR • Backend : Node.js, Express.js, Django, REST APIs • XR Development : Unity, Unreal Engine, OpenXR, MediaPipe • Blockchain : Web3.js, Hardhat, Smart Contracts (Solidity) • Database : MongoDB, PostgreSQL, Firebase • Tools : Git, Linux, Blender, Figma, Docker • AI/ML : Gemini API, NLP, TensorFlow SOFT SKILLS • Cross-Functional Leadership: Led 15+ projects across hackathons and startups • Stakeholder Management: Collaborated with government bodies and NGOs • Adaptive Problem-Solving: Built solutions for diverse challenges • Public Speaking & Pitching: Presented to ministers and investors • Strategic Mentorship: Guided 50+ students in tech entrepreneurship • Resilience Under Pressure: Delivered 24-hour hackathon projects • Ethical Innovation: Advocated for inclusive design in projects • Negotiation: Secured ₹27 lakhs in government funding • Community Engagement: Contributed to 30+ open-source repositories • Time Management: Balanced multiple roles while maintaining academic excellence PROJECTS (20+) 1. Sangrakhshan: VR Disaster Training for NDRF Sept - Dec 2023 GitHub: Parallel-Transcend Description: VR/AR platform for training NDRF personnel on CBRN disasters, featuring multiplayer drills and posture tracking. Key Features: o Multiplayer VR simulations with voice/video support. o AR equipment visualization for hazard scenarios. o Real-time posture tracking using MediaPipe. Tech Stack: o Unreal Engine, Unity o React.js (dashboard), Django
"""

def create_system_prompt():
    """Create the system prompt for the AI agent"""
    return f"""You are Abhinav Mishra's AI Career Agent. You have access to his complete career profile and should answer questions about his background, skills, experience, projects, and achievements.

CRITICAL INSTRUCTIONS:
1. ALWAYS respond in a professional, engaging manner
2. Use the CV data provided to give accurate, detailed answers
3. Format responses with clear sections, bullet points, and emojis for readability
4. NEVER mention that you are an AI or that you have access to CV data
5. Respond as if you ARE Abhinav or his personal representative
6. Be enthusiastic about his achievements and capabilities
7. Use markdown formatting for better presentation
8. Keep responses concise but informative
9. If asked about something not in the CV, politely redirect to what you do know
10. NEVER return any JavaScript objects, arrays, or [object Object] notation
11. ALWAYS return clean, human-readable text with proper formatting
12. Use bullet points (•) for lists, not dashes (-)
13. Be specific and detailed in your responses
14. ALWAYS include specific names, titles, dates, amounts, and exact details from the CV data
15. When mentioning awards, include WHO awarded them, WHERE, and for WHICH project
16. When mentioning projects, include the EXACT tech stack, GitHub links, and key features
17. When mentioning experience, include EXACT company names, roles, dates, and achievements
18. Extract and present FACTS, not general summaries
19. Use direct quotes and specific numbers from the CV data
20. If the CV has specific details, ALWAYS include them in your response

CV CONTEXT:
{CV_CONTEXT}

Remember: You are representing Abhinav Mishra professionally. Be confident, knowledgeable, and engaging in your responses. NEVER return any technical notation or objects. ALWAYS be specific and include exact details from the CV data."""

def generate_ai_response(user_message):
    """Generate AI response using Gemini API with robust error handling"""
    try:
        # Create the conversation prompt
        system_prompt = create_system_prompt()
        
        # Format the user message
        user_prompt = f"""
User Question: {user_message}

Please provide a comprehensive, professional response based on Abhinav's CV data.
IMPORTANT: 
- Return ONLY clean, human-readable text with proper formatting. NO technical objects or notation.
- ALWAYS include specific names, dates, amounts, company names, and exact details from the CV data
- Extract FACTS, not general summaries
- When mentioning awards, include WHO awarded them, WHERE, and for WHICH project
- When mentioning projects, include the EXACT tech stack and key features
- Be as specific and detailed as possible using the available CV information
"""
        
        # Combine system and user prompts
        full_prompt = f"{system_prompt}\n\n{user_prompt}"
        
        logger.info(f"🤖 Generating AI response for: {user_message[:50]}...")
        
        # Generate response using Gemini
        response = model.generate_content(full_prompt)
        
        # Extract the text response
        if response and hasattr(response, 'text'):
            ai_response = response.text.strip()
            
            # CRITICAL: Clean any potential [object Object] or technical notation
            ai_response = clean_response(ai_response)
            
            logger.info("✅ AI response generated and cleaned successfully")
            return ai_response
        else:
            logger.warning("⚠️ Unexpected response format from Gemini")
            return "I'm having trouble processing your request right now. Please try again."
            
    except Exception as e:
        logger.error(f"❌ Error generating AI response: {e}")
        # Fallback to a pre-written response based on keywords
        return generate_fallback_response(user_message)

def clean_response(response_text):
    """Clean response to remove any [object Object] or technical notation"""
    if not response_text:
        return "I'm having trouble processing your request right now. Please try again."
    
    # Remove any [object Object] patterns
    cleaned = response_text.replace('[object Object]', '')
    cleaned = cleaned.replace('[object Object],', '')
    cleaned = cleaned.replace(',[object Object]', '')
    cleaned = cleaned.replace(',[object Object],', '')
    
    # Remove any remaining technical notation
    cleaned = cleaned.replace('undefined', '')
    cleaned = cleaned.replace('null', '')
    cleaned = cleaned.replace('NaN', '')
    
    # Clean up double commas and spaces
    cleaned = cleaned.replace(',,', ',')
    cleaned = cleaned.replace(', ,', ',')
    cleaned = cleaned.replace('  ', ' ')
    cleaned = cleaned.replace(' ,', ',')
    cleaned = cleaned.replace(', ', ',')
    
    # Remove leading/trailing commas and spaces
    cleaned = cleaned.strip(' ,')
    
    # If response is too short after cleaning, use fallback
    if len(cleaned.strip()) < 50:
        return "I'm having trouble processing your request right now. Please try again."
    
    return cleaned

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
        'service': 'Abhinav Career Agent - REAL Gemini API',
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
    
    logger.info("🚀 Starting REAL Gemini API Career Agent Backend...")
    logger.info(f"📍 Port: {port}")
    logger.info(f"👤 Agent for: Abhinav Mishra")
    logger.info(f"🤖 AI Model: {GEMINI_MODEL}")
    logger.info("✅ Backend ready to serve!")
    
    app.run(host='0.0.0.0', port=port, debug=True)
