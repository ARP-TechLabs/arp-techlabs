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
  suggestions: string[] = [
    'What services does ARP offer?',
    'Tell me about ARP’s mission.',
    'What are your AI solutions?',
  ];

  isPaused = false;
  isTyping = false;
  private intervalRef: any = null;

  ngOnInit() {
    this.messages.push({
      text: 'Hello 👋 I’m your ARP AI Assistant. Ask me anything about ARP TechLabs, our services, or who we are!',
      sender: 'agent',
    });
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ text: this.userMessage, sender: 'user' });
    const userMsg = this.userMessage;
    this.userMessage = '';
    this.isTyping = true;

    // Typing animation simulation
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
      {
        keywords: ['about', 'company'],
        response: `ARP TechLabs is a tech-driven LLP, focused on innovation and real-world problem-solving through AI and software. <a href="/about-arp" target="_blank">Learn more about our company</a>.`,
      },
      {
        keywords: ['why', 'benefit', 'advantage'],
        response: `Choosing ARP TechLabs means access to AI-powered development, a collaborative culture, and scalable, future-ready tech solutions. <a href="/why-arp" target="_blank">See why clients choose us</a>.`,
      },
      {
        keywords: ['culture', 'value'],
        response: `Our work culture thrives on creativity, continuous learning, and shared values that align with client success. <a href="/culture-values" target="_blank">Explore our culture and values</a>.`,
      },
      {
        keywords: ['mission', 'vision'],
        response: `At ARP TechLabs, our mission is to create meaningful impact through technology. We envision a future where innovation is accessible to all. <a href="/mission-vision" target="_blank">Discover our mission and vision</a>.`,
      },
      {
        keywords: ['timeline', 'journey'],
        response: `From ideation to execution, our journey reflects the milestones and growth of ARP TechLabs. <a href="/timeline" target="_blank">Check out our timeline</a>.`,
      },
      {
        keywords: ['testimonial', 'review'],
        response: `Hear directly from our clients and partners about their experiences working with ARP TechLabs. <a href="/testimonial" target="_blank">Read testimonials</a>.`,
      },
      {
        keywords: ['ai agent', 'ai solution','aiml','ml','machine learning','artificial learning', 'chatbot'],
        response: `We design AI solutions including chatbots and generative models that align with business goals. <a href="/aiml" target="_blank">Explore our AI offerings</a>.`,
      },
      {
        keywords: ['genai', 'generative ai'],
        response: `Our Generative AI solutions help automate creativity—from content to code—tailored for enterprise needs. <a href="/gen-ai" target="_blank">Learn about our GenAI capabilities</a>.`,
      },
      {
        keywords: ['web'],
        response: `We build high-performance websites and web apps using the latest frameworks and scalable architecture. <a href="/web" target="_blank">View our web development services</a>.`,
      },
      {
        keywords: ['software'],
        response: `Our team builds software solutions that automate workflows and enhance efficiency. <a href="/software" target="_blank">Check our software development stack</a>.`,
      },
      {
        keywords: ['product'],
        response: `We offer product development as a service (PaaS), from MVPs to full-scale platforms. <a href="/paas" target="_blank">See how we develop digital products</a>.`,
      },
      {
        keywords: ['data science'],
        response: `Our data science services turn raw data into business intelligence using ML, predictive models, and analytics. <a href="/data-science" target="_blank">Explore our data science offerings</a>.`,
      },
      {
        keywords: ['data analytics'],
        response: `Unlock insights and make data-driven decisions with our advanced analytics tools. <a href="/data-analytics" target="_blank">Learn more about our analytics services</a>.`,
      },
      {
        keywords: ['database', 'db'],
        response: `We provide robust database solutions, including SQL and NoSQL support, optimization, and architecture. <a href="/db-services" target="_blank">Discover our DB services</a>.`,
      },
      {
        keywords: ['contact', 'human', 'support'],
        response: `We’re here to help. If you have queries beyond what the assistant can answer, feel free to <a href="/contact-us" target="_blank">connect with our team</a>.`,
      },
    ];

    for (const item of keywordRouteMap) {
      for (const keyword of item.keywords) {
        if (lower.includes(keyword)) return item.response;
      }
    }

    return `Thanks for your question. We provide real-time information about ARP TechLabs, our solutions, and corporate activities.<br><br>
    It seems your query is beyond our AI assistant’s domain.<br><br>
    For personalized assistance, please <a href="/contact-us" target="_blank">get in touch with our team</a>.`;
  }
}
