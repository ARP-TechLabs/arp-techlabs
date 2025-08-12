  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HeaderComponent } from '../../components/header/header.component';
  import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
  import { FooterComponent } from '../../components/footer/footer.component';
  import { SeoService } from '../../../services/SeoService.service';
  import { RouterModule } from '@angular/router';

  interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin: string;
  }

  @Component({
    selector: 'app-company-profile',
    standalone: true,
    imports: [CommonModule, BackTopComponent, RouterModule],
    templateUrl: './company-profile.component.html',
    styleUrl: './company-profile.component.scss',
  })
  export class CompanyProfileComponent implements OnInit {
    constructor(private seo: SeoService, private router: RouterModule) {}
    ngOnInit(): void {
      this.seo.updateSeo(
        'About ARP | ARP TechLabs',
        'Learn about ARP TechLabs – our mission, journey, and expertise in AI, software, and data solutions.',
        'https://arp-techlabs.vercel.app/about-arp',
        'About ARP TechLabs, AI Experts, Software Company, Data Science Firm'
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
    teamMembers: TeamMember[] = [
      {
        name: 'Adnan',
        role: 'Co-Founder & CEO',
        image:
          'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/56bd2d76-0155-4eb0-b350-6ea1b937b96a.png',
        linkedin: '#',
      },
      {
        name: 'Ritesh',
        role: 'Chief Technology Officer',
        image:
          'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/56bd2d76-0155-4eb0-b350-6ea1b937b96a.png',
        linkedin: '#',
      },
      {
        name: 'Pankaj',
        role: 'Head of AI Solutions',
        image:
          'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/56bd2d76-0155-4eb0-b350-6ea1b937b96a.png',
        linkedin: '#',
      },
    ];

    // Simple carousel options for basic implementation
    // Note: For full carousel functionality, you'd need to install and import ngx-owl-carousel-o
    currentSlide = 0;

    nextSlide(): void {
      this.currentSlide = (this.currentSlide + 1) % this.teamMembers.length;
    }

    prevSlide(): void {
      this.currentSlide =
        this.currentSlide === 0
          ? this.teamMembers.length - 1
          : this.currentSlide - 1;
    }

    goToSlide(index: number): void {
      this.currentSlide = index;
    }
  }
