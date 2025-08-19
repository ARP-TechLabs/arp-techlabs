import { Component, OnInit, ViewChild } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';
import { EnquirymodelComponent } from '../../../shared/pages/enquirymodel/enquirymodel.component';

@Component({
  selector: 'app-software-development',
  templateUrl: './software-development.component.html',
  styleUrls: ['./software-development.component.scss'],
})
export class SoftwareDevelopmentComponent implements OnInit {
  selectedPlan = '';
  @ViewChild('enquiryModal') enquiryModal!: EnquirymodelComponent;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Software Development | ARP TechLabs',
      'Enterprise-grade, scalable software solutions tailored for businesses.',
      'https://arp-techlabs.vercel.app/software',
      'Software Development, Custom Software, ARP TechLabs'
    );
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.enquiryModal.openModal();
  }
}
