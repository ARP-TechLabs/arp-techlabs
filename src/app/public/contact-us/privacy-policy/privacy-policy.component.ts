import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Privacy Policy | ARP TechLabs',
      'Understand how ARP TechLabs collects, uses, and protects your personal information.',
      'https://arp-techlabs.vercel.app/privacy-policy',
      'ARP TechLabs Privacy Policy, Data Protection'
    );
  }
}
