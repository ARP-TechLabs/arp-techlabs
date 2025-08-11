import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-ai-solutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aiml-solutions.component.html',
  styleUrl: './aiml-solutions.component.scss',
})
export class AiSolutionsComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'AI/ML Solutions | ARP TechLabs',
      'Empowering businesses with cutting-edge AI and machine learning solutions.',
      'https://arp-techlabs.vercel.app/aiml',
      'AI Solutions, Machine Learning Services, ARP TechLabs'
    );
  }
}
