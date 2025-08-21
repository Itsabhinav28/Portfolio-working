// REAL Gemini API Career Agent Service
export class GeminiService {
  constructor() {
    // Use the deployed Render backend URL
    this.apiUrl = 'https://portfolio-bir3.onrender.com/api';
    this.chat = null;
  }

  async initializeChat() {
    try {
      // Test the backend connection
      const response = await fetch(`${this.apiUrl}/health`);
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend connected:', data);
        this.chat = { initialized: true };
        return true;
      } else {
        throw new Error('Backend not responding');
      }
    } catch (error) {
      console.error('❌ Error initializing chat:', error);
      return false;
    }
  }

  async sendMessage(message) {
    try {
      const response = await fetch(`${this.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        text: data.response,
        timestamp: new Date().toLocaleTimeString()
      };

    } catch (error) {
      console.error('❌ Error sending message:', error);
      return {
        text: "I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString()
      };
    }
  }

  async getCareerSummary() {
    try {
      const response = await fetch(`${this.apiUrl}/summary`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        text: data.summary,
        timestamp: new Date().toLocaleTimeString()
      };

    } catch (error) {
      console.error('❌ Error getting career summary:', error);
      return {
        text: "👋 **Welcome! I'm Abhinav's Career Agent**\n\nI can tell you everything about Abhinav Mishra's impressive career:\n\n🎯 **Current**: Software Engineer at Persistent Systems\n🥽 **Specialty**: XR/VR Development & AI Integration\n🏆 **Recognition**: International awards and hackathon wins\n🌍 **Impact**: Government projects and real-world solutions\n\nAsk me anything about his skills, experience, projects, or achievements!",
        timestamp: new Date().toLocaleTimeString()
      };
    }
  }
}

export default GeminiService;
