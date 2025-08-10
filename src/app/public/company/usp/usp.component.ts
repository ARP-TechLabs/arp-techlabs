import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UspFeature {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface StatItem {
  icon: string;
  number: string;
  label: string;
}

interface SuccessStory {
  title: string;
  description: string;
  image: string;
  category: string;
  stats: {
    improvement: string;
    timeframe: string;
  };
  link: string;
}

interface Testimonial {
  text: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
}

interface TechStack {
  name: string;
  icon: string;
  expertise: number;
}

@Component({
  selector: 'app-usp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usp.component.html',
  styleUrl: './usp.component.scss'
})
export class UspComponent {
  uspFeatures: UspFeature[] = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation at Core',
      description: 'We don\'t just follow trends – we create them. Our innovative approach ensures your solutions stay ahead of the curve.',
      features: [
        'Cutting-edge AI integration',
        'Emerging technology adoption',
        'Creative problem-solving',
        'Future-proof architecture'
      ]
    },
    {
      icon: 'fas fa-users',
      title: 'Collaborative Culture',
      description: 'Work with a team that truly understands your business needs and collaborates closely to deliver exceptional results.',
      features: [
        'Dedicated project managers',
        'Regular progress updates',
        'Transparent communication',
        'Flexible engagement models'
      ]
    },
    {
      icon: 'fas fa-cogs',
      title: 'End-to-End Delivery',
      description: 'From concept to deployment and beyond, we handle every aspect of your project with meticulous attention to detail.',
      features: [
        'Complete project lifecycle',
        'Quality assurance testing',
        'Deployment and maintenance',
        'Ongoing support'
      ]
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Quality & Reliability',
      description: 'Our commitment to quality ensures reliable, scalable solutions that perform consistently under any conditions.',
      features: [
        'Rigorous testing protocols',
        'Performance optimization',
        'Security best practices',
        'Scalable architecture'
      ]
    }
  ];

  stats: StatItem[] = [
    {
      icon: 'fas fa-project-diagram',
      number: '500+',
      label: 'Projects Delivered'
    },
    {
      icon: 'fas fa-smile',
      number: '98%',
      label: 'Client Satisfaction'
    },
    {
      icon: 'fas fa-clock',
      number: '24/7',
      label: 'Support Available'
    },
    {
      icon: 'fas fa-award',
      number: '15+',
      label: 'Years Experience'
    }
  ];

  successStories: SuccessStory[] = [
    {
      title: 'Healthcare Revolution',
      description: 'Transformed patient care delivery with AI-powered management system',
      image: 'assets/img/project-1.jpg',
      category: 'Healthcare',
      stats: {
        improvement: '300%',
        timeframe: '6 months'
      },
      link: '#'
    },
    {
      title: 'E-commerce Transformation',
      description: 'Scaled online platform to handle 10x traffic increase',
      image: 'assets/img/project-2.jpg',
      category: 'E-commerce',
      stats: {
        improvement: '500%',
        timeframe: '8 months'
      },
      link: '#'
    },
    {
      title: 'Financial Innovation',
      description: 'Built secure fintech platform processing $1B+ transactions',
      image: 'assets/img/project-3.jpg',
      category: 'Fintech',
      stats: {
        improvement: '200%',
        timeframe: '12 months'
      },
      link: '#'
    }
  ];

  testimonials: Testimonial[] = [
    {
      text: 'ARP TechLabs transformed our business with their innovative AI solutions. The results exceeded our expectations.',
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'TechCorp',
      avatar: 'assets/img/team-1.jpg'
    },
    {
      text: 'Working with ARP was a game-changer. Their expertise and dedication to quality are unmatched.',
      name: 'Michael Chen',
      position: 'CTO',
      company: 'InnovateLab',
      avatar: 'assets/img/team-2.jpg'
    },
    {
      text: 'The team at ARP TechLabs delivered beyond our wildest dreams. Highly recommended!',
      name: 'Emily Rodriguez',
      position: 'Director',
      company: 'FutureTech',
      avatar: 'assets/img/team-3.jpg'
    }
  ];

  techStack: TechStack[] = [
    {
      name: 'Artificial Intelligence',
      icon: 'fas fa-brain',
      expertise: 95
    },
    {
      name: 'Cloud Computing',
      icon: 'fas fa-cloud',
      expertise: 90
    },
    {
      name: 'Machine Learning',
      icon: 'fas fa-robot',
      expertise: 92
    },
    {
      name: 'Data Analytics',
      icon: 'fas fa-chart-bar',
      expertise: 88
    },
    {
      name: 'Web Development',
      icon: 'fas fa-code',
      expertise: 95
    },
    {
      name: 'Mobile Development',
      icon: 'fas fa-mobile-alt',
      expertise: 85
    },
    {
      name: 'DevOps',
      icon: 'fas fa-server',
      expertise: 87
    },
    {
      name: 'Cybersecurity',
      icon: 'fas fa-shield-alt',
      expertise: 93
    }
  ];
}
