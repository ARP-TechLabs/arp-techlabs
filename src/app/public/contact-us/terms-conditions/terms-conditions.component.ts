import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Terms & Conditions | ARP TechLabs',
      'Review the terms and conditions for using ARP TechLabs’ website and services.',
      'https://arp-techlabs.vercel.app/terms-conditions',
      'ARP TechLabs Terms, Service Agreement'
    );
  }
}
