import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-science',
  standalone: true,
  imports: [
    HeaderComponent,
    BackTopComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './data-science.component.html',
  styleUrl: './data-science.component.scss',
})
export class DataScienceComponent implements OnInit {
  enquiryForm!: FormGroup;
  selectedPlan: string = '';
  showModal: boolean = false;

  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Data Science Services | ARP TechLabs',
      'Transform data into actionable insights with ARP TechLabs’ data science expertise.',
      'https://arp-techlabs.vercel.app/data-science',
      'Data Science, AI Analytics, ARP TechLabs'
    );

    // Form init
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  // Open modal
  openModal(plan: string) {
    this.selectedPlan = plan;
    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
    this.enquiryForm.reset();
  }

  // Submit enquiry
  submitEnquiry() {
    if (this.enquiryForm.valid) {
      const { name, email, description } = this.enquiryForm.value;

      this.emailService
        .sendMail('service', name, email, this.selectedPlan, description, {
          serviceName: 'Data Science Package',
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Enquiry Sent!',
            text: '✅ Your enquiry has been sent successfully.',
            confirmButtonColor: '#3085d6',
          });
          this.closeModal();
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: '❌ Failed to send enquiry. Please try again later.',
            confirmButtonColor: '#d33',
          });
          console.error(err);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Form Incomplete',
        text: '⚠️ Please fill in all required fields.',
      });
    }
  }
}
