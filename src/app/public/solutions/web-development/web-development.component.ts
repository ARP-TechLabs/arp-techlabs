import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-web-development',
  standalone: true,
  imports: [],
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.scss',
})
export class WebDevelopmentComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Web Solutions | ARP TechLabs',
      'High-performance, scalable web applications designed for modern businesses.',
      'https://arp-techlabs.vercel.app/web',
      'Web Development, Web Solutions, ARP TechLabs'
    );
  }
}
