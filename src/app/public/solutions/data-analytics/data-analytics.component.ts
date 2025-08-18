import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-analytics',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    BackTopComponent,
    FooterComponent,
  ],
  templateUrl: './data-analytics.component.html',
  styleUrl: './data-analytics.component.scss',
})
export class DataAnalyticsComponent implements OnInit {
  enquiryForm!: FormGroup;
  showModal: boolean = false;
  selectedPlan: string = '';

  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Data Analytics Services | ARP TechLabs',
      'Advanced analytics solutions to drive smarter decisions and growth.',
      'https://arp-techlabs.vercel.app/data-analytics',
      'Data Analytics, Business Intelligence, ARP TechLabs'
    );

    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.enquiryForm.reset();
  }

  submitEnquiry() {
    if (this.enquiryForm.valid) {
      const { name, email, description } = this.enquiryForm.value;

      this.emailService
        .sendMail(
          'service',
          name,
          email,
          this.selectedPlan, // subject
          description,
          { serviceName: 'Data Analytics Service' }
        )
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
