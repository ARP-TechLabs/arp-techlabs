import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
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

@Component({
  selector: 'app-gen-ai',
  standalone: true,
  imports: [
    HeaderComponent,
    BackTopComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './gen-ai.component.html',
  styleUrls: ['./gen-ai.component.scss'],
})
export class GenAiComponent implements OnInit {
  enquiryForm!: FormGroup;
  selectedPlan: string = '';

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

    // Init Enquiry Form
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    (document.getElementById('enquiryModal') as HTMLElement).style.display =
      'block';
  }

  closeModal() {
    (document.getElementById('enquiryModal') as HTMLElement).style.display =
      'none';
  }

  submitEnquiry() {
    if (this.enquiryForm.valid) {
      const { name, email, description } = this.enquiryForm.value;

      this.emailService
        .sendMail(
          'service',
          name,
          email,
          this.selectedPlan, // Subject = plan name
          description,
          { serviceName: 'Generative AI Package' }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Enquiry Sent!',
            text: '✅ Your enquiry has been sent successfully!',
            confirmButtonColor: '#3085d6',
          });
          this.closeModal();
          this.enquiryForm.reset();
        })
        .catch((err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '❌ Failed to send enquiry. Please try again later.',
          });
          console.error(err);
        });
    }
  }
}
