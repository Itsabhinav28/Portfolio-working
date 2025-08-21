// CLEAN Career Service - NO BACKEND, NO [object Object] EVER
export class CleanCareerService {
  constructor() {
    this.chat = null;
  }

  async initializeChat() {
    // Simulate async but return immediately
    this.chat = { initialized: true };
    return true;
  }

  async sendMessage(message) {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const lowerMessage = message.toLowerCase().trim();
    
    // SKILLS QUESTION
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('technology') || lowerMessage.includes('programming') || lowerMessage.includes('language') || lowerMessage.includes('can') || lowerMessage.includes('do') || lowerMessage.includes('expertise')) {
      return {
        text: `💻 **Abhinav's Technical Skills:**

• **Programming Languages**: C++, Python, JavaScript, Dart, Solidity, C#
• **Frontend Development**: React.js, Flutter, HTML/CSS, WebGL, Spark AR
• **XR Development (Specialty)**: Unity, Unreal Engine, OpenXR, MediaPipe
• **Backend & Cloud**: Node.js, Django, Azure, Auth0, Stripe
• **Blockchain & Web3**: Web3.js, Hardhat, Smart Contracts
• **AI/ML**: Gemini API, NLP, TensorFlow

His XR development expertise combined with full-stack capabilities makes him uniquely positioned.`,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    // HIRING QUESTION
    if (lowerMessage.includes('hire') || lowerMessage.includes('hiring') || lowerMessage.includes('worth') || lowerMessage.includes('good') || lowerMessage.includes('qualified') || lowerMessage.includes('capable') || lowerMessage.includes('competent')) {
      return {
        text: `✅ **Abhinav is Highly Competent & Exceptionally Qualified**

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

His combination of technical skills, real-world experience, and innovative project work clearly demonstrates he's not just competent, but **exceptional** in his field.`,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    // NAME/ABOUT QUESTION
    if (lowerMessage.includes('name') || lowerMessage.includes('who') || lowerMessage.includes('about') || lowerMessage.includes('introduction') || lowerMessage.includes('candidate')) {
      return {
        text: `👋 **Abhinav Mishra - Dynamic Software Engineer & Innovator**

**Current Role**: Software Engineer at Persistent Systems, driving AI/ML innovation
**Education**: Bachelor of Technology, Computer Science Engineering with AI specialization at MAIT, GGSIPU
**Contact**: itsabhinav2005@gmail.com | +91 8851070377
**LinkedIn**: linkedin.com/mishra-abhinav05 | **GitHub**: github.com/Itsabhinav28

**Unique Value**: Proven ability to translate complex technologies—from immersive XR to advanced AI and Blockchain—into impactful, award-winning solutions.

**Track Record**: Secured government funding for projects like the NDRF's adopted Sangrakshan system and earned international recognition.

What specific aspect would you like to explore further?`,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    // PROJECTS QUESTION
    if (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('create') || lowerMessage.includes('developed') || lowerMessage.includes('work') || lowerMessage.includes('solution')) {
      return {
        text: `🚀 **Abhinav's Major Projects:**

1. **Sangrakhshan** - NDRF Disaster Management System (React, Node.js, AI/ML, VR training)
2. **CRYPTXCHANGE** - Secure DeFi + EdTech Ecosystem (Blockchain, Solidity, Web3)
3. **ACCESSWAY** - AR/AI Accessibility Platform (AR, AI, accessibility solutions)
4. **HEAL-O-VERSE** - VR Healthcare Consultations (VR, healthcare, Unity)
5. **ENVIROBOT** - Environmental Monitoring Robot (IoT, Python, Arduino)

All projects address real-world problems with innovative technology solutions.`,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    // ACHIEVEMENTS QUESTION
    if (lowerMessage.includes('achievement') || lowerMessage.includes('award') || lowerMessage.includes('recognition') || lowerMessage.includes('won') || lowerMessage.includes('prize') || lowerMessage.includes('hackathon')) {
      return {
        text: `🏆 **Abhinav's Key Achievements:**

1. **Global Best M-Gov Awards 2025** - Bronze for India (Government Innovation)
2. **Smart India Hackathon'23** - Winner (₹27 lakhs funding secured)
3. **Hack4Purpose 2024 (IIT Delhi)** - 1st Runner-Up (600+ teams)
4. **Scale +91 Hackathon** - Top 3 (5000+ competing teams)
5. **Fintech Hackathon** - Winner
6. **IIT Delhi Innovation Award** - Prestigious Institute Recognition

These achievements span government innovation, competitive programming, and international recognition.`,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    // EXPERIENCE QUESTION
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('company') || lowerMessage.includes('role') || lowerMessage.includes('internship')) {
      return {
        text: `💼 **Abhinav's Work Experience:**

• **Persistent Systems (Current)** - Software Engineer: AI/ML development, LangChain, OpenAI API
• **ONDC (2024)** - Software Developer: MERN Stack, PostgreSQL, E-commerce infrastructure
• **Ministry of Home Affairs (2023)** - XR Developer: Unity, Unreal Engine, Government innovation

Progression shows versatility from government XR work to enterprise AI development.`,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    // GREETING
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey') || lowerMessage.includes('how are you') || lowerMessage.includes('greetings')) {
      return {
        text: `👋 **Hello! I'm Abhinav's AI Career Agent**

I'm here to help you learn about Abhinav Mishra's impressive career and achievements!

What would you like to know about?
• His technical skills and expertise
• His work experience and projects  
• His achievements and awards
• His innovative solutions

Just ask me anything specific!`,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    // DEFAULT RESPONSE
    return {
      text: `🤖 **I'm Abhinav's AI Career Agent!**

I can provide detailed information about his:

🎓 **Education & Background** - Computer Science with AI specialization
💼 **Work Experience** - From government XR to enterprise AI
🏆 **Achievements & Awards** - International recognition and hackathon wins
💻 **Technical Skills** - Full-stack, XR, Blockchain, AI/ML expertise
🚀 **Projects** - Real-world solutions for disaster management, healthcare, environment

Ask me anything specific about his skills, experience, projects, or achievements!`,
      timestamp: new Date().toLocaleTimeString()
    };
  }

  async getCareerSummary() {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      text: `👋 **Welcome! I'm Abhinav's Career Agent**

I can tell you everything about Abhinav Mishra's impressive career:

🎯 **Current**: Software Engineer at Persistent Systems
🥽 **Specialty**: XR/VR Development & AI Integration  
🏆 **Recognition**: International awards and hackathon wins
🌍 **Impact**: Government projects and real-world solutions

Ask me anything about his skills, experience, projects, or achievements!`,
      timestamp: new Date().toLocaleTimeString()
    };
  }
}

export default CleanCareerService;
