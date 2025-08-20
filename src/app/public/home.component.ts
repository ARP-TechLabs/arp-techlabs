import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../shared/pages/contact-form/contact-form.component';
import { AiAgentComponent } from './components/ai-agent/ai-agent.component';
import { SeoService } from '../services/SeoService.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, AiAgentComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService, private router: RouterModule) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Home | ARP TechLabs',
      'ARP TechLabs delivers innovative AI, software, and data-driven solutions to empower businesses worldwide.',
      'https://arp-techlabs.vercel.app/',
      'ARP TechLabs, AI Solutions, Software Development, Data Science'
    );
  }
  services = [
    {
      icon: 'fas fa-robot',
      title: 'AI & Machine Learning',
      description:
        'Design, train, and deploy intelligent AI and machine learning models to automate processes and unlock data-driven insights.',
      delay: '.3s',
      route: '/aiml',
    },
    {
      icon: 'fas fa-brain',
      title: 'Generative AI Development',
      description:
        'Build custom generative AI solutions, from chatbots to content creation tools, leveraging advanced LLMs and multimodal AI models.',
      delay: '.3s',
      route: '/gen-ai',
    },
    {
      icon: 'fas fa-code',
      title: 'Web Development',
      description:
        'Create fast, responsive, and secure websites and web applications using modern frameworks and best practices.',
      delay: '.3s',
      route: '/web',
    },
    {
      icon: 'fas fa-laptop-code',
      title: 'Software Development',
      description:
        'Develop robust desktop, mobile, and cross-platform software tailored to your business needs.',
      delay: '.5s',
      route: '/software',
    },
    {
      icon: 'fas fa-cubes',
      title: 'Product Development',
      description:
        'Turn ideas into market-ready products with end-to-end design, prototyping, and development support.',
      delay: '.7s',
      route: '/paas',
    },
    {
      icon: 'fas fa-database',
      title: 'Data Science',
      description:
        'Analyze complex datasets, apply statistical models, and deliver predictive insights to drive smarter decisions.',
      delay: '.3s',
      route: '/data-science',
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Data Analytics',
      description:
        'Transform raw data into actionable dashboards and reports for improved business performance tracking.',
      delay: '.5s',
      route: '/data-analytics',
    },
    {
      icon: 'fas fa-server',
      title: 'Database Services',
      description:
        'Design, optimize, and manage high-performance databases with strong security and scalability.',
      delay: '.7s',
      route: '/db-services',
    },
  ];
  projects = [
    {
      img: 'assets/img/project-1.jpg',
      title: 'Web design',
      subtitle: 'Web Analysis',
      delay: '.3s',
    },
    {
      img: 'assets/img/project-2.jpg',
      title: 'Cyber Security',
      subtitle: 'Cyber Security Core',
      delay: '.5s',
    },
    {
      img: 'assets/img/project-3.jpg',
      title: 'Mobile Info',
      subtitle: 'Upcomming Phone',
      delay: '.7s',
    },
    {
      img: 'assets/img/project-4.jpg',
      title: 'Web Development',
      subtitle: 'Web Analysis',
      delay: '.3s',
    },
    {
      img: 'assets/img/project-5.jpg',
      title: 'Digital Marketing',
      subtitle: 'Marketing Analysis',
      delay: '.5s',
    },
    {
      img: 'assets/img/project-6.jpg',
      title: 'Keyword Research',
      subtitle: 'Keyword Analysis',
      delay: '.7s',
    },
  ];

  blogs = [
    {
      img: 'assets/blog/aiChatSupportBlog.jpg',
      category: 'AI Solutions',
      author: 'ARP TechLabs',
      date: '20 August 2025',
      description:
        'How AI Agents are Revolutionizing Customer Support — A deep dive into building intelligent, context-aware chat agents for businesses using modern GenAI frameworks.',
      link: 'https://medium.com/@arptechlabs/how-ai-agents-are-changing-the-game-in-customer-support-dfe69f52c7d4',
      delay: '.3s',
    }
  ];

  teamMembers = [
    {
      img: 'assets/img/team-1.jpg',
      name: 'Madina Shafiq Mangaonkar',
      designation: 'CEO & Founder',
      social: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
    },
    {
      img: 'assets/img/team-3.jpg',
      name: 'Renu Indrajit Sharma',
      designation: 'CTO & Founder',
      social: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
    },
    {
      img: 'assets/img/team-3.jpg',
      name: 'Suhagmati Bholashankar Vishwakarma',
      designation: 'COO & Founder',
      social: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
    },
  ];

  testimonials = [
    {
      img: 'assets/img/testimonial-1.jpg',
      name: 'Rahul Mehta',
      profession: 'Founder, TechSpark Solutions',
      review:
        'Working with ARP TechLabs was a game-changer for our product launch. Their AI-powered chatbot and intuitive web interface helped us cut support costs by 40% while improving customer engagement. The team’s attention to detail is unmatched.',
      stars: 5,
    },
    {
      img: 'assets/img/testimonial-2.jpg',
      name: 'Ananya Sharma',
      profession: 'Project Manager, FinCore Systems',
      review:
        'From concept to deployment, ARP TechLabs delivered our financial analytics dashboard ahead of schedule. The integration of real-time data and clean UI impressed both our clients and stakeholders.',
      stars: 5,
    },
    {
      img: 'assets/img/testimonial-3.jpg',
      name: 'David Fernandes',
      profession: 'CTO, EduSmart Learning',
      review:
        'ARP TechLabs transformed our e-learning platform with their AI-driven recommendation engine. The solution boosted user retention by 55% and created a more personalized learning journey for our students.',
      stars: 5,
    },
    {
      img: 'assets/img/testimonial-4.jpg',
      name: 'Neha Verma',
      profession: 'CEO, HealthEase Clinic',
      review:
        'The ARP TechLabs team developed a secure patient portal for our clinic, integrating AI chat assistance for appointment booking. It’s been a huge hit with our patients, and their professionalism made the whole process seamless.',
      stars: 5,
    },
  ];
}
