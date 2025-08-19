import { Component, OnInit, ViewChild } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { EmailService } from '../../../services/email.service';
import { EnquirymodelComponent } from '../../../shared/pages/enquirymodel/enquirymodel.component';

@Component({
  selector: 'app-gen-ai',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EnquirymodelComponent],
  templateUrl: './gen-ai.component.html',
  styleUrls: ['./gen-ai.component.scss'],
})
export class GenAiComponent implements OnInit {
  selectedPlan = '';
  @ViewChild('enquiryModal') enquiryModal!: EnquirymodelComponent;

  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Generative AI | ARP TechLabs',
      'Unlock creativity and innovation with Generative AI solutions from ARP TechLabs.',
      'https://arp-techlabs.vercel.app/gen-ai',
      'Generative AI, AI Innovation, Creative AI Solutions'
    );
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.enquiryModal.openModal();
  }
}
