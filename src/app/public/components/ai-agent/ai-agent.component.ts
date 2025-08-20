import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../../services/email.service';

type Sender = 'user' | 'agent';

interface Message {
  text: string;
  sender: Sender;
  typing?: boolean;
  timestamp?: number;
}

interface ChatSession {
  sessionId: string;
  lastTopic: string | null;
  lastStep: string | null;
  selected?: string | null;
}

interface PageIntent {
  key: string;
  title: string;
  link: string;
  patterns: RegExp[];
  description: string;
  suggestions: string[];
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

  // in-memory state (persisted lightweight to sessionStorage)
  private session: ChatSession = {
    sessionId: '',
    lastTopic: null,
    lastStep: null,
    selected: null,
  };

  // email prompt state
  showEmailPrompt = false;
  emailName = '';
  emailAddress = '';
  emailSending = false;

  constructor(private emailService: EmailService) {}

  // central route map (mirrors your routing modules)
  private routes = {
    company: {
      about: '/about-arp',
      culture: '/culture-values',
      testimonials: '/testimonial',
      timeline: '/timeline',
      why: '/why-arp',
      mission: '/mission-vision',
    },
    solutions: {
      hub: '/solutions',
      aiml: '/aiml',
      genai: '/gen-ai',
      web: '/web',
      software: '/software',
      paas: '/paas',
      ds: '/data-science',
      da: '/data-analytics',
      db: '/db-services',
    },
    careers: {
      join: '/join-us',
      collab: '/collaboration',
      seminar: '/book-seminar',
      learning: '/arp-learning',
    },
    contact: {
      contact: '/contact',
      blog: '/blog',
      privacy: '/privacy-policy',
      terms: '/terms-conditions',
      cookies: '/cookie-policy',
      disclaimer: '/disclaimer',
    },
  };

  ngOnInit() {
    // clear chats on load/refresh (requirement)
    sessionStorage.removeItem('arp-ai-messages');

    // new session id every page load (tab-scoped)
    this.session = {
      sessionId: 'sess_' + Math.random().toString(36).slice(2, 10),
      lastTopic: null,
      lastStep: null,
      selected: null,
    };
    this.saveSession();

    this.resetToWelcome();
  }

  // ===== UI actions =====
  sendMessage() {
    const msg = (this.userMessage || '').trim();
    if (!msg || this.showEmailPrompt) return;

    this.addUserMessage(msg);
    const userMsg = msg;
    this.userMessage = '';
    this.isTyping = true;

    setTimeout(() => {
      const response = this.generateResponse(userMsg);

      let displayText = '';
      let i = 0;
      this.isPaused = false;

      this.messages.push({ text: '', sender: 'agent', timestamp: Date.now() });
      const msgIndex = this.messages.length - 1;
      this.persistMessages();

      this.intervalRef = setInterval(() => {
        if (this.isPaused) return;

        displayText += response.charAt(i++);
        this.messages[msgIndex].text = displayText;
        this.persistMessages();

        if (i === response.length) {
          clearInterval(this.intervalRef);
          this.isTyping = false;
          this.persistMessages();
        }
      }, 25);
    }, 600 + Math.random() * 400);
  }

  stopResponse() {
    this.isPaused = !this.isPaused;
  }

  useSuggestion(text: string) {
    if (text === '⬅️ Back to Menu') {
      this.resetToWelcome(); // don't wipe session id; only reset UX
      return;
    }
    if (text === '📧 Mail this Chat') {
      this.showEmailPrompt = true;
      return;
    }
    this.userMessage = text;
    this.sendMessage();
  }

  // ===== Brain / NLU-lite =====
  generateResponse(message: string): string {
    const lower = message.toLowerCase();

    // --- Global quick intents
    if (
      this.matches(lower, [
        'back to main',
        'back to menu',
        'main chat',
        'home menu',
      ])
    ) {
      this.resetToWelcome();
      return '👍 Back to the main chat. What would you like to explore?';
    }
    if (this.matches(lower, ['mail this chat', 'email chat', 'send chat'])) {
      this.showEmailPrompt = true;
      return `Great — I’ll prep the email. Please enter your name and email below.`;
    }

    // --- Direct Page Intents (new) ---
    const direct = this.handleDirectPageQuery(lower);
    if (direct) return direct;

    // --- Level-2 Flows (state machine) ---
    // CASE STUDIES FLOW
    if (this.session.lastTopic === 'case-studies') {
      // Step 1: Ask to confirm showing case studies
      if (this.session.lastStep === 'init' || this.session.lastStep === null) {
        this.session.lastStep = 'waiting-confirm';
        this.saveSession();
        this.suggestions = this.withGlobal([
          '✅ Yes, show me',
          '❌ No, back to menu',
        ]);
        return `I’ve got a few relevant case studies. Want me to walk you through them?`;
      }

      // Step 2: Confirmation handling
      if (this.session.lastStep === 'waiting-confirm') {
        if (this.includesYes(lower)) {
          this.session.lastStep = 'listed';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '🛒 E-commerce + Stock',
            '📄 Legal Docs (OCR+AI)',
            '🏭 ERP for SMEs',
          ]);
          return (
            `Here are a few:<br/>` +
            `✅ <b>E-commerce + Stock Management</b> (Angular + Node.js + SQL Server)<br/>` +
            `✅ <b>AI-powered Legal Documents</b> (OCR + summarization + explainable AI)<br/>` +
            `✅ <b>ERP SaaS</b> for SMEs<br/><br/>` +
            `Which one should I deep dive into?`
          );
        }
        if (this.includesNo(lower)) {
          this.resetContext();
          this.suggestions = this.withGlobal([
            '🌐 ARP Solutions',
            '🚀 Mission & Vision',
            '👥 Culture & Values',
          ]);
          return `No problem 👍. What would you like to explore instead?`;
        }
      }

      // Step 3: Deep dive selectors
      if (this.session.lastStep === 'listed') {
        if (this.matches(lower, ['e-commerce', 'ecommerce', 'stock'])) {
          this.session.selected = 'ecommerce';
          this.session.lastStep = 'detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '📨 Contact sales',
            '🔙 Back to list',
            '🏁 More solutions',
          ]);
          return (
            `<b>E-commerce + Stock Management</b><br/>` +
            `• Tech: Angular, Node.js, SQL Server<br/>` +
            `• Wins: 30% faster order processing, real-time inventory accuracy<br/>` +
            `• Next: <a href="${this.routes.solutions.web}" target="_blank">Web Dev</a> & ` +
            `<a href="${this.routes.solutions.software}" target="_blank">Software Engineering</a><br/><br/>` +
            `Want me to connect you with our team?`
          );
        }
        if (this.matches(lower, ['legal', 'ocr', 'documents'])) {
          this.session.selected = 'legal';
          this.session.lastStep = 'detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '📨 Contact sales',
            '🔙 Back to list',
            '🏁 More solutions',
          ]);
          return (
            `<b>AI-powered Legal Docs</b><br/>` +
            `• Capabilities: OCR → Summarization → Explainability<br/>` +
            `• Impact: 60% review time reduction, higher consistency<br/>` +
            `• Related: <a href="${this.routes.solutions.aiml}" target="_blank">AI/ML</a>, ` +
            `<a href="${this.routes.solutions.genai}" target="_blank">GenAI</a><br/><br/>` +
            `Should I arrange a quick intro call?`
          );
        }
        if (this.matches(lower, ['erp'])) {
          this.session.selected = 'erp';
          this.session.lastStep = 'detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '📨 Contact sales',
            '🔙 Back to list',
            '🏁 More solutions',
          ]);
          return (
            `<b>ERP SaaS for SMEs</b><br/>` +
            `• Modules: Inventory, Billing, CRM, Analytics<br/>` +
            `• Outcomes: 25% ops efficiency uptick, fewer manual errors<br/>` +
            `• See also: <a href="${this.routes.solutions.paas}" target="_blank">Product Dev (PaaS)</a>, ` +
            `<a href="${this.routes.solutions.ds}" target="_blank">Data Science</a><br/><br/>` +
            `Want help choosing a deployment model?`
          );
        }

        // user typed generic "yes" or something else after list
        if (this.includesYes(lower)) {
          return `Pick one I should unpack: <b>E-commerce</b>, <b>Legal Docs</b>, or <b>ERP</b>.`;
        }
      }

      // Step 4: Post-detail actions
      if (this.session.lastStep === 'detail') {
        if (this.matches(lower, ['contact', 'connect', 'sales'])) {
          this.resetContext();
          this.suggestions = this.withGlobal([
            '✉️ Email us',
            '📞 Contact form',
            '🌐 Solutions Hub',
          ]);
          return (
            `Awesome — reach us at <a href="mailto:connect@arptechlabs.com">connect@arptechlabs.com</a> ` +
            `or use the <a href="${this.routes.contact.contact}" target="_blank">Contact page</a>. ` +
            `I can also guide you to related solutions if you want.`
          );
        }
        if (this.matches(lower, ['back', 'list'])) {
          this.session.lastStep = 'listed';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '🛒 E-commerce + Stock',
            '📄 Legal Docs (OCR+AI)',
            '🏭 ERP for SMEs',
          ]);
          return `Back to the list — which one should I open?`;
        }
      }
    }

    // SERVICES FLOW (top-level prompt with submenu)
    if (this.session.lastTopic === 'services') {
      if (this.session.lastStep === 'init' || this.session.lastStep === null) {
        this.session.lastStep = 'select-domain';
        this.saveSession();
        this.suggestions = this.withGlobal([
          '🤖 AI/ML',
          '🧠 GenAI',
          '🌐 Web',
          '💻 Software',
          '📊 Data',
          '🗄️ Database',
        ]);
        return `We cover multiple stacks. What do you want to explore — <b>AI/ML</b>, <b>GenAI</b>, <b>Web</b>, <b>Software</b>, <b>Data</b>, or <b>Database</b>?`;
      }

      if (this.session.lastStep === 'select-domain') {
        if (this.matches(lower, [' ai', 'ai ', 'ml', ' ai/', 'ai/'])) {
          this.session.lastStep = 'ai-detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '🤝 Talk to human',
            '🧩 See GenAI',
            '🔙 Back',
          ]);
          return (
            `🔥 <b>AI/ML</b> it is.<br/>` +
            `• Chatbots, predictive models, OCR, XAI<br/>` +
            `• See details: <a href="${this.routes.solutions.aiml}" target="_blank">AI/ML Services</a><br/><br/>` +
            `Want a quick consult or check <b>GenAI</b> next?`
          );
        }
        if (this.matches(lower, ['genai', 'gen ai', 'gen-ai'])) {
          this.session.lastStep = 'genai-detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '🤝 Talk to human',
            '🤖 See AI/ML',
            '🔙 Back',
          ]);
          return (
            `🧠 <b>GenAI</b> — enterprise assistants & content automation.<br/>` +
            `• See details: <a href="${this.routes.solutions.genai}" target="_blank">GenAI</a><br/><br/>` +
            `Want to connect with our team or explore <b>AI/ML</b>?`
          );
        }
        if (this.matches(lower, ['web'])) {
          this.session.lastStep = 'web-detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '🤝 Talk to human',
            '💻 Software Dev',
            '🔙 Back',
          ]);
          return (
            `🌐 <b>Web Development</b> — MEAN/MERN, .NET, secure & scalable.<br/>` +
            `• Details: <a href="${this.routes.solutions.web}" target="_blank">Web</a><br/><br/>` +
            `Want to see <b>Software Engineering</b> too?`
          );
        }
        if (this.matches(lower, ['software', 'saas', 'erp'])) {
          this.session.lastStep = 'software-detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '🤝 Talk to human',
            '🌐 Web',
            '🔙 Back',
          ]);
          return (
            `💻 <b>Software Engineering</b> — SaaS, ERP, APIs, integrations.<br/>` +
            `• Details: <a href="${this.routes.solutions.software}" target="_blank">Software</a>`
          );
        }
        if (this.matches(lower, ['data science', 'data-science', ' science'])) {
          this.session.lastStep = 'ds-detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '📊 Data Analytics',
            '🤝 Talk to human',
            '🔙 Back',
          ]);
          return (
            `📈 <b>Data Science</b> — ML pipelines, forecasting, optimization.<br/>` +
            `• Details: <a href="${this.routes.solutions.ds}" target="_blank">Data Science</a>`
          );
        }
        if (this.matches(lower, ['analytics', 'bi', 'dashboard'])) {
          this.session.lastStep = 'da-detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '📈 Data Science',
            '🤝 Talk to human',
            '🔙 Back',
          ]);
          return (
            `📊 <b>Data Analytics</b> — dashboards, KPIs, self-serve BI.<br/>` +
            `• Details: <a href="${this.routes.solutions.da}" target="_blank">Data Analytics</a>`
          );
        }
        if (this.matches(lower, ['db', 'database'])) {
          this.session.lastStep = 'db-detail';
          this.saveSession();
          this.suggestions = this.withGlobal([
            '🤝 Talk to human',
            '📈 Data Analytics',
            '🔙 Back',
          ]);
          return (
            `🗄️ <b>Database Services</b> — design, optimization, security, scale.<br/>` +
            `• Details: <a href="${this.routes.solutions.db}" target="_blank">DB Services</a>`
          );
        }

        // If user says "back" or "menu"
        if (this.matches(lower, ['back', 'menu'])) {
          this.resetContext();
          this.suggestions = this.withGlobal([
            '🌐 ARP Solutions',
            '🚀 Mission & Vision',
            '📈 Case Studies',
          ]);
          return `Back to the main menu. What do you want to explore?`;
        }
      }

      // Quick connect hook
      if (this.matches(lower, ['human', 'connect', 'contact', 'talk'])) {
        this.resetContext();
        this.suggestions = this.withGlobal([
          '✉️ Email us',
          '📞 Contact form',
          '🌐 Solutions Hub',
        ]);
        return `Great — reach us at <a href="mailto:connect@arptechlabs.com">connect@arptechlabs.com</a> or via the <a href="${this.routes.contact.contact}" target="_blank">Contact page</a>.`;
      }
    }

    // CAREERS quick hook
    if (this.matches(lower, ['career', 'job', 'internship', 'hiring'])) {
      this.resetContext();
      this.suggestions = this.withGlobal([
        '🙌 Join Us',
        '🤝 Collaboration',
        '🎓 ARP Learning',
      ]);
      return (
        `We’re scaling and hiring 🚀<br/>` +
        `• <a href="${this.routes.careers.join}" target="_blank">Join Us</a><br/>` +
        `• <a href="${this.routes.careers.collab}" target="_blank">Collaboration</a><br/>` +
        `• <a href="${this.routes.careers.learning}" target="_blank">ARP for Learning</a>`
      );
    }

    // CONTACT quick hook
    if (this.matches(lower, ['contact', 'support', 'help'])) {
      this.resetContext();
      this.suggestions = this.withGlobal([
        '📨 Email',
        '📝 Contact form',
        '📚 Blog',
      ]);
      return (
        `Need a human? 💬 <a href="${this.routes.contact.contact}" target="_blank">Contact us</a> ` +
        `or email <a href="mailto:connect@arptechlabs.com">connect@arptechlabs.com</a>.`
      );
    }

    // --- Level-1 Intents (entry points) ---
    const keywordRouteMap = [
      {
        keywords: ['about', 'company', 'who are you'],
        response:
          `We are <b>ARP TechLabs</b>, an <b>AI + Software startup</b> 🚀.<br/>` +
          `• Company: <a href="${this.routes.company.about}" target="_blank">About ARP</a><br/>` +
          `• Culture: <a href="${this.routes.company.culture}" target="_blank">Culture & Values</a><br/>` +
          `• Why us: <a href="${this.routes.company.why}" target="_blank">Why ARP</a>`,
        suggestions: [
          '💡 Mission & Vision',
          '📊 Show me services',
          '📈 Case studies',
        ],
        topic: 'about',
      },
      {
        keywords: ['mission', 'vision'],
        response:
          `<b>Mission:</b> Empower businesses with <b>AI + software intelligence</b>.<br/>` +
          `<b>Vision:</b> Build impact through applied digital innovation.<br/>` +
          `• Read more: <a href="${this.routes.company.mission}" target="_blank">Mission & Vision</a>`,
        suggestions: [
          '👥 Culture & Values',
          '🌐 Industries',
          '⚡ AI solutions',
        ],
        topic: 'mission',
      },
      {
        keywords: ['service', 'offer', 'solutions', 'product'],
        response:
          `Here’s our spectrum:<br/>` +
          `• <a href="${this.routes.solutions.aiml}" target="_blank"><b>AI/ML</b></a> — chatbots, predictive, OCR, XAI<br/>` +
          `• <a href="${this.routes.solutions.genai}" target="_blank"><b>GenAI</b></a> — enterprise assistants, content automation<br/>` +
          `• <a href="${this.routes.solutions.web}" target="_blank"><b>Web</b></a> — MEAN/MERN, .NET<br/>` +
          `• <a href="${this.routes.solutions.software}" target="_blank"><b>Software</b></a> — SaaS, ERP<br/>` +
          `• <a href="${this.routes.solutions.ds}" target="_blank"><b>Data Science</b></a> & <a href="${this.routes.solutions.da}" target="_blank"><b>Analytics</b></a><br/>` +
          `• <a href="${this.routes.solutions.db}" target="_blank"><b>Database Services</b></a><br/><br/>` +
          `👉 Explore all: <a href="${this.routes.solutions.hub}" target="_blank">Solutions Hub</a>`,
        suggestions: ['🤖 AI/ML', '🧠 GenAI', '🌐 Web'],
        topic: 'services',
      },
      {
        keywords: ['ai', 'ml', 'agent', 'chatbot', 'genai'],
        response:
          `We deliver <b>AI-first solutions</b> 🤖<br/>` +
          `• Smart chatbots & assistants<br/>` +
          `• Predictive ML<br/>` +
          `• Legal doc OCR + summarization<br/>` +
          `• GenAI automation<br/>` +
          `Deep dive: <a href="${this.routes.solutions.aiml}" target="_blank">AI/ML</a> / ` +
          `<a href="${this.routes.solutions.genai}" target="_blank">GenAI</a>`,
        suggestions: ['🧠 GenAI', '📊 Data Science', '🌐 Web'],
        topic: 'services',
      },
      {
        keywords: ['case study', 'case studies', 'success', 'project', 'work'],
        response: `Great — let’s talk results.`,
        suggestions: ['✅ Yes, show me', '❌ No, back'],
        topic: 'case-studies',
        kickoffStep: 'init',
      },
      {
        keywords: ['career', 'job', 'internship', 'hiring'],
        response:
          `We’re scaling 🚀<br/>• <a href="${this.routes.careers.join}" target="_blank">Join Us</a><br/>` +
          `• <a href="${this.routes.careers.collab}" target="_blank">Collaboration</a><br/>` +
          `• <a href="${this.routes.careers.learning}" target="_blank">ARP for Learning</a>`,
        suggestions: ['🛠 Services', '👥 Culture', '🌐 Contact'],
        topic: 'careers',
      },
      {
        keywords: ['contact', 'talk', 'human', 'support'],
        response:
          `Need a human? 💬<br/>` +
          `• <a href="${this.routes.contact.contact}" target="_blank">Contact page</a><br/>` +
          `• Email: <a href="mailto:connect@arptechlabs.com">connect@arptechlabs.com</a>`,
        suggestions: ['📊 Services', '👥 Culture', '🚀 Mission'],
        topic: 'contact',
      },
    ];

    for (const item of keywordRouteMap) {
      for (const k of item.keywords) {
        if (lower.includes(k)) {
          this.session.lastTopic = item.topic;
          // kick off subflow when available
          this.session.lastStep = (item as any).kickoffStep ?? 'init';
          this.session.selected = null;
          this.saveSession();
          this.suggestions = this.withGlobal(this.shuffle(item.suggestions));
          return item.response;
        }
      }
    }

    // Contextual nudge if we’re already in Services
    if (this.session.lastTopic === 'services') {
      this.suggestions = this.withGlobal([
        '🤖 AI/ML',
        '🧠 GenAI',
        '🌐 Web',
        '💻 Software',
        '📊 Data',
        '🗄️ Database',
      ]);
      return `Not sure I got that 🤔 — since we’re on services, pick: <b>AI/ML</b>, <b>GenAI</b>, <b>Web</b>, <b>Software</b>, <b>Data</b>, or <b>Database</b>.`;
    }

    // Global fallback + set a “menu” state
    this.session.lastTopic = null;
    this.session.lastStep = 'menu';
    this.saveSession();
    this.suggestions = this.withGlobal([
      '🌐 ARP Solutions',
      '🚀 Mission & Vision',
      '📈 Case Studies',
    ]);
    return `Hmm, I didn’t catch that. I can guide you through <b>ARP’s solutions</b>, <b>mission</b>, or <b>case studies</b>. Where shall we go?`;
  }

  // ----- NEW: Direct Page Intents -----
  private handleDirectPageQuery(lower: string): string | null {
    const intents = this.getPageIntents();

    for (const p of intents) {
      if (p.patterns.some((r) => r.test(lower))) {
        // set a neutral context so user can branch anywhere next
        this.resetContext();
        this.suggestions = this.withGlobal(p.suggestions);
        return (
          `<b>${p.title}</b><br/>` +
          `${p.description}<br/><br/>` +
          `👉 <a href="${p.link}" target="_blank">Open ${p.title}</a>`
        );
      }
    }
    return null;
  }

  private getPageIntents(): PageIntent[] {
    const R = this.routes;
    return [
      // --- Company ---
      {
        key: 'timeline',
        title: 'Company Timeline',
        link: R.company.timeline,
        patterns: [/timeline/, /milestones?/, /history/, /journey/],
        description: `Explore our milestone-by-milestone journey — from inception to enterprise deployments, major releases, and partnerships.`,
        suggestions: [
          '📜 View Timeline',
          '🏢 Company Profile',
          '📈 Case Studies',
        ],
      },
      {
        key: 'testimonials',
        title: 'Testimonials',
        link: R.company.testimonials,
        patterns: [
          /testimonial(s)?/,
          /reviews?/,
          /client feedback/,
          /customer (stories|feedback)/,
        ],
        description: `Hear from clients across industries about outcomes we’ve delivered — speed, reliability, ROI, and support.`,
        suggestions: [
          '🗣️ Read Testimonials',
          '🏢 Company Profile',
          '🌐 Contact',
        ],
      },
      {
        key: 'about',
        title: 'Company Profile',
        link: R.company.about,
        patterns: [
          /about( us)?/,
          /company profile/,
          /\babout arp\b/,
          /\bwho are you\b/,
        ],
        description: `We are a global-first AI + Software studio building from MVP to enterprise systems with a quality-first culture.`,
        suggestions: [
          '🚀 Mission & Vision',
          '👥 Culture & Values',
          '📈 Case Studies',
        ],
      },
      {
        key: 'why-arp',
        title: 'Why ARP',
        link: R.company.why,
        patterns: [/why (arp|choose you)/, /\busp\b/, /unique value/],
        description: `Our edge: senior-led builds, lean delivery, transparent comms, and measurable outcomes aligned to your KPIs.`,
        suggestions: [
          '📈 Case Studies',
          '🌐 Solutions Hub',
          '👥 Culture & Values',
        ],
      },
      {
        key: 'mission',
        title: 'Mission & Vision',
        link: R.company.mission,
        patterns: [/mission/, /vision/, /purpose/, /north star/],
        description: `Mission: empower businesses with intelligent software and AI. Vision: compounding impact via pragmatic innovation.`,
        suggestions: [
          '👥 Culture & Values',
          '🌐 Solutions Hub',
          '🏢 Company Profile',
        ],
      },
      {
        key: 'culture',
        title: 'Culture & Values',
        link: R.company.culture,
        patterns: [/culture/, /values/, /principles/, /ethos/],
        description: `We value ownership, craftsmanship, clarity, learning, and kindness — building products we’re proud to sign.`,
        suggestions: [
          '🚀 Mission & Vision',
          '🏢 Company Profile',
          '📈 Case Studies',
        ],
      },

      // --- Solutions ---
      {
        key: 'aiml',
        title: 'AI/ML Solutions',
        link: R.solutions.aiml,
        patterns: [
          /\bai\b/,
          /\bml\b/,
          /machine learning/,
          /ai\/ml/,
          /computer vision/,
          /ocr/,
        ],
        description: `Chatbots, predictive models, OCR, explainable AI, and bespoke ML pipelines tailored to your data and goals.`,
        suggestions: ['🧠 GenAI', '📊 Data Science', '🌐 Web Development'],
      },
      {
        key: 'genai',
        title: 'Generative AI',
        link: R.solutions.genai,
        patterns: [/gen ?ai/, /gen-ai/, /generative ai/, /rag/, /assistant/],
        description: `Enterprise assistants, RAG pipelines, content automation, and guardrailed generation for safe, useful outputs.`,
        suggestions: [
          '🤖 AI/ML',
          '📊 Data Analytics',
          '💻 Software Engineering',
        ],
      },
      {
        key: 'web',
        title: 'Web Development',
        link: R.solutions.web,
        patterns: [
          /web( dev(elopment)?)?/,
          /frontend|backend/,
          /mern|mean/,
          /\.net/,
        ],
        description: `Full-stack web — MEAN/MERN/.NET — secure, scalable, observable, and production-ready from day one.`,
        suggestions: [
          '💻 Software Engineering',
          '🗄️ DB Services',
          '📈 Case Studies',
        ],
      },
      {
        key: 'software',
        title: 'Software Engineering',
        link: R.solutions.software,
        patterns: [
          /software( dev(elopment)?)?/,
          /saas/,
          /microservices/,
          /api(s)?/,
        ],
        description: `SaaS platforms, APIs, ERP modules, integrations, CI/CD, and SRE-driven reliability for critical workloads.`,
        suggestions: [
          '🌐 Web Development',
          '🗄️ DB Services',
          '📊 Data Science',
        ],
      },
      {
        key: 'paas',
        title: 'PaaS / Product Development',
        link: R.solutions.paas,
        patterns: [
          /paas/,
          /p\.a\.a\.s/,
          /product (dev|development)/,
          /platform as a service/,
        ],
        description: `From discovery → prototypes → MVPs → launch. Hosting, CI/CD, telemetry, and growth-grade architecture included.`,
        suggestions: ['💻 Software Engineering', '📊 Data Science', '🧠 GenAI'],
      },
      {
        key: 'ds',
        title: 'Data Science',
        link: R.solutions.ds,
        patterns: [
          /data science/,
          /forecast(ing)?/,
          /optimization/,
          /feature (store|engineering)/,
        ],
        description: `Forecasting, optimization, experimentation, and MLOps — turn data into decisions and measurable lift.`,
        suggestions: ['📊 Data Analytics', '🤖 AI/ML', '🗄️ DB Services'],
      },
      {
        key: 'da',
        title: 'Data Analytics',
        link: R.solutions.da,
        patterns: [/analytics/, /bi/, /dashboard(s)?/, /kpis?/, /self-serve/],
        description: `Dashboards, KPIs, ELT, and semantic layers for clear, trustworthy decision-making across teams.`,
        suggestions: [
          '📈 Data Science',
          '🗄️ DB Services',
          '🌐 Web Development',
        ],
      },
      {
        key: 'db',
        title: 'Database Services',
        link: R.solutions.db,
        patterns: [
          /db/,
          /database(s)?/,
          /sql|postgres|mysql|mssql/,
          /performance|index|query plan/,
        ],
        description: `Schema design, performance tuning, HA/DR, security, and growth planning across SQL flavors and clouds.`,
        suggestions: [
          '📊 Data Analytics',
          '💻 Software Engineering',
          '🌐 Web Development',
        ],
      },

      // --- Careers ---
      {
        key: 'join',
        title: 'Join Us',
        link: R.careers.join,
        patterns: [/join us/, /apply/, /open(ings)?/, /hiring/],
        description: `We’re hiring AI/ML engineers, full-stack devs, and data folks. Growth, mentorship, and real product impact.`,
        suggestions: [
          '🤝 Collaboration',
          '🎓 ARP Learning',
          '🌐 Solutions Hub',
        ],
      },
      {
        key: 'collab',
        title: 'Collaboration',
        link: R.careers.collab,
        patterns: [/collab(oration)?/, /partner(ship)?/, /co-?build/],
        description: `Co-build products or deliver enterprise programs together. We’re partnership-first and outcome-driven.`,
        suggestions: ['🙌 Join Us', '🌐 Solutions Hub', '📈 Case Studies'],
      },
      {
        key: 'seminar',
        title: 'Book Seminar',
        link: R.careers.seminar,
        patterns: [/seminar/, /book (a )?seminar/, /workshop/, /training/],
        description: `Book expert-led workshops on AI, GenAI, data engineering, or product delivery for your team.`,
        suggestions: ['🌐 Solutions Hub', '🤖 AI/ML', '🧠 GenAI'],
      },
      {
        key: 'learning',
        title: 'ARP for Learning',
        link: R.careers.learning,
        patterns: [/learning/, /course(s)?/, /bootcamp/, /academy/],
        description: `Hands-on learning paths in AI, web, and data. Build real projects, ship demos`,
        suggestions: ['courses', 'bootcamps', 'academy'],
      },
      {
        key: 'learning',
        title: 'ARP for Learning',
        link: R.careers.learning,
        patterns: [/learning/, /course(s)?/, /bootcamp/, /academy/],
        description: `Hands-on learning paths in AI, web, and data. Build real projects, ship demos, and get mentored by senior engineers.`,
        suggestions: ['🙌 Join Us', '🤝 Collaboration', '🌐 Solutions Hub'],
      },

      // --- Contact / Legal ---
      {
        key: 'blog',
        title: 'Blog',
        link: R.contact.blog,
        patterns: [/blog/, /articles?/, /insights?/, /knowledge base/],
        description: `Insights, case write-ups, and thought leadership across AI, engineering, and product delivery.`,
        suggestions: [
          '🚀 Mission & Vision',
          '📈 Case Studies',
          '🌐 Solutions Hub',
        ],
      },
      {
        key: 'privacy',
        title: 'Privacy Policy',
        link: R.contact.privacy,
        patterns: [/privacy/, /gdpr/, /data policy/],
        description: `Our commitment to safeguarding data and respecting user privacy — GDPR-compliant practices.`,
        suggestions: [
          '📜 Terms & Conditions',
          '🍪 Cookie Policy',
          '⚖️ Disclaimer',
        ],
      },
      {
        key: 'terms',
        title: 'Terms & Conditions',
        link: R.contact.terms,
        patterns: [/terms/, /conditions/, /tos/, /agreement/],
        description: `The rules and commitments that define our working relationship and services.`,
        suggestions: ['📜 Privacy Policy', '🍪 Cookie Policy', '⚖️ Disclaimer'],
      },
      {
        key: 'cookies',
        title: 'Cookie Policy',
        link: R.contact.cookies,
        patterns: [/cookie/, /cookies/],
        description: `How we use cookies for analytics, personalization, and seamless experience.`,
        suggestions: [
          '📜 Privacy Policy',
          '📜 Terms & Conditions',
          '⚖️ Disclaimer',
        ],
      },
      {
        key: 'disclaimer',
        title: 'Disclaimer',
        link: R.contact.disclaimer,
        patterns: [/disclaimer/, /limitation/, /liability/],
        description: `Important legal disclaimers regarding information accuracy, liability, and use of this site.`,
        suggestions: [
          '📜 Privacy Policy',
          '📜 Terms & Conditions',
          '🍪 Cookie Policy',
        ],
      },
    ];
  }

  // ===== Utilities =====
  private resetToWelcome() {
    this.resetContext();
    this.suggestions = this.withGlobal([
      '🌐 ARP Solutions',
      '🚀 Mission & Vision',
      '📈 Case Studies',
    ]);
    this.messages = [
      {
        text: 'Hello 👋 I’m your ARP AI Assistant. Ask me anything about ARP TechLabs, our mission, services, or how we can collaborate!',
        sender: 'agent',
        timestamp: Date.now(),
      },
    ];
    this.persistMessages();
  }

  private resetContext() {
    this.session.lastTopic = null;
    this.session.lastStep = null;
    this.session.selected = null;
    this.saveSession();
  }

  private saveSession() {
    sessionStorage.setItem('arp-ai-session', JSON.stringify(this.session));
  }

  private persistMessages() {
    sessionStorage.setItem('arp-ai-messages', JSON.stringify(this.messages));
  }

  private addUserMessage(text: string) {
    this.messages.push({ text, sender: 'user', timestamp: Date.now() });
    this.persistMessages();
  }

  // ===== Suggestion Logic =====
  private withGlobal(base: string[]): string[] {
    // ✅ If fresh reset or only 1 message (welcome), no "Back" or "Mail"
    if (this.messages.length <= 1) {
      return base;
    }

    // Otherwise → append global controls
    return [...base, '⬅️ Back to Menu', '📧 Mail this Chat'];
  }

  private matches(input: string, patterns: string[]): boolean {
    return patterns.some((p) => input.includes(p));
  }

  private includesYes(input: string): boolean {
    return /(yes|sure|ok|yep|ya|yeah)/.test(input);
  }

  private includesNo(input: string): boolean {
    return /(no|nah|nope|not really)/.test(input);
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
  
}
