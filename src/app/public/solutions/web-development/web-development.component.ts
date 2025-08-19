import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SeoService } from '../../../services/SeoService.service';
import { EnquirymodelComponent } from '../../../shared/pages/enquirymodel/enquirymodel.component';

@Component({
  selector: 'app-web-development',
  standalone: true,
  imports: [ReactiveFormsModule, EnquirymodelComponent],
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.scss',
})
export class WebDevelopmentComponent implements OnInit {
  enquiryForm!: FormGroup;
  selectedPlan = '';
  @ViewChild('enquiryModal') enquiryModal!: EnquirymodelComponent;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Web Solutions | ARP TechLabs',
      'High-performance, scalable web applications designed for modern businesses.',
      'https://arp-techlabs.vercel.app/web',
      'Web Development, Web Solutions, ARP TechLabs'
    );
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.enquiryModal.openModal();
  }
}
