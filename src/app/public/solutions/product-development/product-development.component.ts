import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-product-development',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './product-development.component.html',
  styleUrl: './product-development.component.scss',
})
export class ProductDevelopmentComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'PaaS Solutions | ARP TechLabs',
      'Platform-as-a-Service solutions for faster, scalable, and cost-effective deployments.',
      'https://arp-techlabs.vercel.app/paas',
      'PaaS, Cloud Platform Solutions, ARP TechLabs'
    );
  }
}
