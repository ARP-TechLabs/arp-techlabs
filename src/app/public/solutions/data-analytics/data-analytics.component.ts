import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-data-analytics',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './data-analytics.component.html',
  styleUrl: './data-analytics.component.scss',
})
export class DataAnalyticsComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Data Analytics Services | ARP TechLabs',
      'Advanced analytics solutions to drive smarter decisions and growth.',
      'https://arp-techlabs.vercel.app/data-analytics',
      'Data Analytics, Business Intelligence, ARP TechLabs'
    );
  }
}
