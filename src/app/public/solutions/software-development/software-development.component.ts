import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-software-development',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './software-development.component.html',
  styleUrl: './software-development.component.scss',
})
export class SoftwareDevelopmentComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Software Development | ARP TechLabs',
      'Custom software development services tailored to your business needs.',
      'https://arp-techlabs.vercel.app/software',
      'Software Development, Custom Software, ARP TechLabs'
    );
  }
}
