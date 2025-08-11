import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.scss',
})
export class VisionComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Mission & Vision | ARP TechLabs',
      'Discover ARP TechLabs’ mission and vision to drive innovation and shape the future with AI, software, and emerging technologies.',
      'https://arp-techlabs.vercel.app/mission-vision',
      'ARP TechLabs Mission, Company Vision, AI Goals, Technology Innovation'
    );
  }
}
