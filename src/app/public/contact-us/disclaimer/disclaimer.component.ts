import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss'
})
export class DisclaimerComponent implements OnInit {
  today: Date = new Date();

  constructor(
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seo.updateSeo(
        'Disclaimer | ARP TechLabs',
        'Read ARP TechLabs’ disclaimer regarding website information and content usage.',
        'https://arp-techlabs.vercel.app/disclaimer',
        'ARP TechLabs Disclaimer, Legal Notice'
      );
    }
  }
}
