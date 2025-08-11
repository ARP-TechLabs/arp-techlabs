import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-database-services',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './database-services.component.html',
  styleUrl: './database-services.component.scss',
})
export class DatabaseServicesComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Database Services | ARP TechLabs',
      'Reliable and scalable database solutions for enterprises.',
      'https://arp-techlabs.vercel.app/db-services',
      'Database Services, DB Management, ARP TechLabs'
    );
  }
}
