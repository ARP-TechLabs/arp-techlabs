import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-arp-learning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arp-learning.component.html',
  styleUrls: ['./arp-learning.component.scss'],
})
export class ArpLearningComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'ARP for Learning | ARP TechLabs',
      'Explore ARP for Learning – innovative programs and resources to empower learners with AI, software development, and data science skills for the future.',
      'https://arp-techlabs.vercel.app/careers/arp-learning',
      'ARP TechLabs, ARP for Learning, AI Education, Software Development Training, Data Science Courses'
    );
  }
}
