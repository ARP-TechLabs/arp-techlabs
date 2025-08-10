import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';

interface Milestone {
  year: number;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  achievements: string[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, BackTopComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  currentSlide = 0;
  milestones: Milestone[] = [
    {
      year: 2009,
      title: 'Company Founded',
      description: 'ARP TechLabs was born from a vision to revolutionize how businesses approach technology. Founded by passionate innovators, we started with a simple mission: to make cutting-edge technology accessible to businesses of all sizes.',
      icon: 'fas fa-rocket',
      highlights: ['3 Founding Members', 'First AI Project', '5 Initial Clients'],
      achievements: [
        'Established core development team',
        'Launched first AI-powered solution',
        'Secured initial funding round',
        'Built foundation for scalable growth'
      ]
    },
    {
      year: 2012,
      title: 'First Major Success',
      description: 'Our breakthrough came with the development of an AI-powered healthcare management system that transformed patient care delivery. This project established our reputation for innovative solutions and reliable delivery.',
      icon: 'fas fa-trophy',
      highlights: ['Healthcare Innovation', 'Industry Recognition', '300% Growth'],
      achievements: [
        'Delivered 50+ successful projects',
        'Expanded team to 25 professionals',
        'Won first industry award',
        'Established offshore development center'
      ]
    },
    {
      year: 2015,
      title: 'Global Expansion',
      description: 'With proven success in multiple industries, we expanded our operations globally. Opening offices in key markets allowed us to serve clients worldwide while maintaining our commitment to quality and innovation.',
      icon: 'fas fa-globe',
      highlights: ['10 Countries', '100+ Team Members', '200+ Projects'],
      achievements: [
        'Opened offices in 5 new countries',
        'Launched enterprise AI platform',
        'Achieved ISO 27001 certification',
        'Partnership with Fortune 500 companies'
      ]
    },
    {
      year: 2018,
      title: 'AI Innovation Hub',
      description: 'We established our AI Innovation Hub, bringing together the brightest minds in artificial intelligence, machine learning, and data science. This marked our commitment to being at the forefront of technological advancement.',
      icon: 'fas fa-brain',
      highlights: ['AI Research Center', 'University Partnerships', '50+ AI Solutions'],
      achievements: [
        'Launched proprietary AI framework',
        'Published 20+ research papers',
        'Secured 15 AI patents',
        'Established R&D partnerships'
      ]
    },
    {
      year: 2021,
      title: 'Digital Transformation Leader',
      description: 'Recognized as a global leader in digital transformation, we helped thousands of businesses navigate the challenges of the digital age. Our comprehensive solutions and proven methodologies set new industry standards.',
      icon: 'fas fa-crown',
      highlights: ['Industry Leader', '1000+ Clients', '15 Awards'],
      achievements: [
        'Named Top Digital Transformation Company',
        'Reached 1000+ client milestone',
        'Launched cloud-native platform',
        'Expanded to 25+ countries'
      ]
    },
    {
      year: 2024,
      title: 'Future Vision',
      description: 'Today, we stand at the forefront of technological innovation, ready to shape the future of business technology. Our vision extends beyond current capabilities, focusing on next-generation solutions that will define tomorrow\'s digital landscape.',
      icon: 'fas fa-eye',
      highlights: ['Next-Gen AI', 'Quantum Computing', 'Unlimited Potential'],
      achievements: [
        'Pioneer quantum computing solutions',
        'Expand to 50+ countries globally',
        'Launch sustainable tech initiatives',
        'Create 10,000+ job opportunities'
      ]
    }
  ];

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.milestones.length;
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.milestones.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}