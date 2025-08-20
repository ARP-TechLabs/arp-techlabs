import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'], // ✅ fixed (plural)
})
export class SolutionsComponent implements OnInit {
  constructor(private seo: SeoService) {} // ✅ removed RouterModule injection

  ngOnInit(): void {
    this.seo.updateSeo(
      'Solutions | ARP TechLabs',
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
}
