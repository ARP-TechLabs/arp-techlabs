import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SeoService } from '../../../services/SeoService.service';
import { EnquirymodelComponent } from '../../../shared/pages/enquirymodel/enquirymodel.component';

@Component({
  selector: 'app-data-analytics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EnquirymodelComponent],
  templateUrl: './data-analytics.component.html',
  styleUrl: './data-analytics.component.scss',
})
export class DataAnalyticsComponent implements OnInit {
  selectedPlan = '';
  @ViewChild('enquiryModal') enquiryModal!: EnquirymodelComponent;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Data Analytics Services | ARP TechLabs',
      'Advanced analytics solutions to drive smarter decisions and growth.',
      'https://arp-techlabs.vercel.app/data-analytics',
      'Data Analytics, Business Intelligence, ARP TechLabs'
    );
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.enquiryModal.openModal();
  }
}
