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
      'Empowering learners with AI, software, and data science skills for the future.',
      'https://arp-techlabs.vercel.app/arp-learning',
      'ARP for Learning, AI Education, Data Science Courses'
    );
  }
}
