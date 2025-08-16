import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'agent';
  typing?: boolean;
}

@Component({
  selector: 'app-ai-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-agent.component.html',
  styleUrls: ['./ai-agent.component.scss'],
})
export class AiAgentComponent implements OnInit {
  userMessage = '';
  messages: Message[] = [];
  suggestions: string[] = [];

  isPaused = false;
  isTyping = false;
  private intervalRef: any = null;

  ngOnInit() {
    this.messages.push({
      text: 'Hello 👋 I’m your ARP AI Assistant. Ask me anything about ARP TechLabs, our services, or who we are!',
      sender: 'agent',
    });

    // Default top 3 suggestions
    this.suggestions = [
      'What services does ARP offer?',
      'Tell me about ARP’s mission.',
      'What are your AI solutions?',
    ];
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ text: this.userMessage, sender: 'user' });
    const userMsg = this.userMessage;
    this.userMessage = '';
    this.isTyping = true;

    setTimeout(() => {
      const response = this.generateResponse(userMsg);

      let displayText = '';
      let i = 0;
      this.isPaused = false;

      this.messages.push({ text: '', sender: 'agent' });
      const msgIndex = this.messages.length - 1;

      this.intervalRef = setInterval(() => {
        if (this.isPaused) return;

        displayText += response.charAt(i++);
        this.messages[msgIndex].text = displayText;

        if (i === response.length) {
          clearInterval(this.intervalRef);
          this.isTyping = false;
        }
      }, 25);
    }, 600);
  }

  stopResponse() {
    this.isPaused = !this.isPaused;
  }

  useSuggestion(text: string) {
    this.userMessage = text;
    this.sendMessage();
  }

  generateResponse(message: string): string {
    const lower = message.toLowerCase();
    const keywordRouteMap = [
      // === Company Info ===
      {
        keywords: ['about', 'company'],
        response: `ARP TechLabs is a software-driven startup LLP, focused on AI, web, and data solutions. We innovate to solve real-world challenges. <a href="/about-arp" target="_blank">Learn more</a>.`,
        suggestions: ['What is ARP’s mission?', 'Show me ARP’s journey.', 'What services does ARP offer?']
      },
      {
        keywords: ['mission', 'vision'],
        response: `Our mission is to create meaningful impact through intelligent technology. Vision: to shape tomorrow through innovation. <a href="/mission-vision" target="_blank">Read our mission</a>.`,
        suggestions: ['Tell me about ARP values.', 'What services do you provide?', 'What is your culture?']
      },
      {
        keywords: ['culture', 'value'],
        response: `Our culture thrives on innovation, collaboration, and continuous learning. Values: client success, curiosity, and global impact. <a href="/culture-values" target="_blank">Explore culture</a>.`,
        suggestions: ['What is ARP’s mission?', 'What services do you offer?', 'Show testimonials']
      },
      {
        keywords: ['timeline', 'journey'],
        response: `From ideation to AI-driven solutions, our journey reflects growth and innovation milestones. <a href="/timeline" target="_blank">See timeline</a>.`,
        suggestions: ['Tell me about ARP’s mission.', 'What AI solutions do you have?', 'Show me testimonials.']
      },
      {
        keywords: ['testimonial', 'review'],
        response: `Hear what clients and partners say about ARP TechLabs. <a href="/testimonial" target="_blank">Read testimonials</a>.`,
        suggestions: ['What services do you offer?', 'Show company mission.', 'Tell me about your culture.']
      },
      {
        keywords: ['why', 'benefit', 'advantage'],
        response: `Why ARP? Because we provide AI-powered, scalable, and globally competitive solutions. <a href="/why-arp" target="_blank">See why us</a>.`,
        suggestions: ['Tell me about ARP mission.', 'What AI services do you have?', 'Show culture values.']
      },

      // === Services ===
      {
        keywords: ['ai agent', 'ai solution', 'aiml', 'ml', 'machine learning', 'chatbot'],
        response: `We design AI/ML solutions including chatbots, OCR, explainable AI, and business-driven models. <a href="/aiml" target="_blank">Explore AI</a>.`,
        suggestions: ['Do you offer Generative AI?', 'Tell me about Web Development.', 'What is your mission?']
      },
      {
        keywords: ['genai', 'generative ai'],
        response: `Generative AI solutions: content automation, AI assistants, code generation, enterprise creativity. <a href="/gen-ai" target="_blank">Explore GenAI</a>.`,
        suggestions: ['What AI/ML services do you offer?', 'Tell me about Data Science.', 'What’s your vision?']
      },
      {
        keywords: ['web'],
        response: `We build websites & web apps using MEAN, MERN, .NET, Laravel, WordPress. <a href="/web" target="_blank">View web services</a>.`,
        suggestions: ['Tell me about Software Development.', 'Show Data Analytics services.', 'What is ARP culture?']
      },
      {
        keywords: ['software'],
        response: `Custom software & automation solutions: ERP, stock management, APIs, scalable platforms. <a href="/software" target="_blank">Explore software</a>.`,
        suggestions: ['Tell me about Product Development.', 'What database services do you offer?', 'Show ARP values.']
      },
      {
        keywords: ['product'],
        response: `We provide Product-as-a-Service (PaaS), MVPs, SaaS platforms, and enterprise-grade software. <a href="/paas" target="_blank">Explore PaaS</a>.`,
        suggestions: ['Show me Software Development.', 'What are your Web solutions?', 'Show Data Science services.']
      },
      {
        keywords: ['data science'],
        response: `Data Science: predictive analytics, machine learning pipelines, business intelligence. <a href="/data-science" target="_blank">View Data Science</a>.`,
        suggestions: ['What about Data Analytics?', 'Show me AI solutions.', 'Tell me about your mission.']
      },
      {
        keywords: ['data analytics'],
        response: `Advanced analytics & dashboards to drive decisions and insights. <a href="/data-analytics" target="_blank">View Analytics</a>.`,
        suggestions: ['Show Data Science services.', 'Tell me about Web Development.', 'What’s your culture?']
      },
      {
        keywords: ['database', 'db'],
        response: `Database solutions: SQL & NoSQL, optimization, architecture, automation with stored procedures. <a href="/db-services" target="_blank">View DB services</a>.`,
        suggestions: ['Show me Software Development.', 'What is your mission?', 'Tell me about AI/ML.']
      },

      // === Careers & Collab ===
      {
        keywords: ['career', 'job', 'internship'],
        response: `We offer roles & internships in AI, Web, Data, and Software. <a href="/careers" target="_blank">Explore careers</a>.`,
        suggestions: ['What services do you provide?', 'Tell me about ARP values.', 'Show me Data Science.']
      },
      {
        keywords: ['collab', 'partner', 'partnership'],
        response: `We collaborate with global businesses for projects & innovation. <a href="/collaboration" target="_blank">Learn more</a>.`,
        suggestions: ['Show me your services.', 'What is ARP’s mission?', 'Tell me about your culture.']
      },

      // === Contact ===
      {
        keywords: ['contact', 'human', 'support'],
        response: `Need personalized help? <a href="/contact-us" target="_blank">Contact ARP TechLabs</a>.`,
        suggestions: ['What services do you provide?', 'Show me ARP values.', 'What’s your vision?']
      },
    ];

    for (const item of keywordRouteMap) {
      for (const keyword of item.keywords) {
        if (lower.includes(keyword)) {
          this.suggestions = item.suggestions; // update top 3
          return item.response;
        }
      }
    }

    this.suggestions = ['What services does ARP offer?', 'Tell me about ARP’s mission.', 'What are your AI solutions?'];
    return `Thanks for your query. I provide insights into ARP TechLabs, our services, and values.<br><br>
    For more details, please <a href="/contact-us" target="_blank">contact our team</a>.`;
  }
}
