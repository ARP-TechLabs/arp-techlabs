import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-gen-ai',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './gen-ai.component.html',
  styleUrl: './gen-ai.component.scss',
})
export class GenAiComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Generative AI | ARP TechLabs',
      'Unlock creativity and innovation with Generative AI solutions from ARP TechLabs.',
      'https://arp-techlabs.vercel.app/gen-ai',
      'Generative AI, AI Innovation, Creative AI Solutions'
    );
  }
}
