import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-data-science',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './data-science.component.html',
  styleUrl: './data-science.component.scss',
})
export class DataScienceComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Data Science Services | ARP TechLabs',
      'Transform data into actionable insights with ARP TechLabs’ data science expertise.',
      'https://arp-techlabs.vercel.app/data-science',
      'Data Science, AI Analytics, ARP TechLabs'
    );
  }
}
