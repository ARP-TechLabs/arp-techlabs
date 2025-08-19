import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SeoService } from '../../../services/SeoService.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EnquirymodelComponent } from '../../../shared/pages/enquirymodel/enquirymodel.component';

@Component({
  selector: 'app-data-science',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EnquirymodelComponent],
  templateUrl: './data-science.component.html',
  styleUrl: './data-science.component.scss',
})
export class DataScienceComponent implements OnInit {
  enquiryForm!: FormGroup;
  selectedPlan = '';
  @ViewChild('enquiryModal') enquiryModal!: EnquirymodelComponent;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Data Science Services | ARP TechLabs',
      'Transform data into actionable insights with ARP TechLabs’ data science expertise.',
      'https://arp-techlabs.vercel.app/data-science',
      'Data Science, AI Analytics, ARP TechLabs'
    );
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.enquiryModal.openModal();
  }
}
