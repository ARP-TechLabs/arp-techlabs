import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [],
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.scss',
})
export class CookiePolicyComponent implements OnInit {
  constructor(private seo: SeoService) {}
  // Cookie Policy
  ngOnInit(): void {
    this.seo.updateSeo(
      'Cookie Policy | ARP TechLabs',
      'Learn how ARP TechLabs uses cookies to enhance your browsing experience.',
      'https://arp-techlabs.vercel.app/cookie-policy',
      'ARP TechLabs Cookie Policy, Cookies Usage'
    );
  }
}
