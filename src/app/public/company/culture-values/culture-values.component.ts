import { Component, OnInit } from '@angular/core';
import { BackTopComponent } from "../../components/backTop/back-top/back-top.component";
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-culture-values',
  standalone: true,
  imports: [BackTopComponent],
  templateUrl: './culture-values.component.html',
  styleUrl: './culture-values.component.scss'
})
export class CultureValuesComponent implements OnInit {
  constructor(private seo: SeoService) {}
    ngOnInit(): void {
      this.seo.updateSeo(
        'Culture & Values | ARP TechLabs',
        'Discover the culture and core values that drive innovation and collaboration at ARP TechLabs.',
        'https://arp-techlabs.vercel.app/culture-values',
        'ARP TechLabs Culture, Company Values, Innovation, Collaboration'
      );
    }

}
