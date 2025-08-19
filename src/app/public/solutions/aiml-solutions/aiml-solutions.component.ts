import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/SeoService.service';
import { EnquirymodelComponent } from "../../../shared/pages/enquirymodel/enquirymodel.component";

@Component({
  selector: 'app-ai-solutions',
  standalone: true,
  imports: [CommonModule, EnquirymodelComponent],
  templateUrl: './aiml-solutions.component.html',
  styleUrl: './aiml-solutions.component.scss',
})
export class AiSolutionsComponent implements OnInit {
  selectedPlan = '';
  @ViewChild('enquiryModal') enquiryModal!: EnquirymodelComponent;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'AI/ML Solutions | ARP TechLabs',
      'Empowering businesses with cutting-edge AI and machine learning solutions.',
      'https://arp-techlabs.vercel.app/aiml',
      'AI Solutions, Machine Learning Services, ARP TechLabs'
    );
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.enquiryModal.openModal();
  }
}
