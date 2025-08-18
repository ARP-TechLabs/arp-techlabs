import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ai-solutions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aiml-solutions.component.html',
  styleUrl: './aiml-solutions.component.scss',
})
export class AiSolutionsComponent implements OnInit {
  enquiryForm!: FormGroup;
  showModal = false;
  selectedPlan: string = '';

  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'AI/ML Solutions | ARP TechLabs',
      'Empowering businesses with cutting-edge AI and machine learning solutions.',
      'https://arp-techlabs.vercel.app/aiml',
      'AI Solutions, Machine Learning Services, ARP TechLabs'
    );

    // build form
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  // open modal with selected plan
  openModal(plan: string) {
    this.selectedPlan = plan;
    this.showModal = true;
  }

  // close modal
  closeModal() {
    this.showModal = false;
    this.enquiryForm.reset();
  }

  // submit enquiry
  submitEnquiry() {
    if (this.enquiryForm.valid) {
      const { name, email, description } = this.enquiryForm.value;

      this.emailService
        .sendMail('service', name, email, this.selectedPlan, description, {
          serviceName: 'AI/ML Package',
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Enquiry Sent!',
            text: 'Your enquiry has been sent successfully.',
            confirmButtonColor: '#667eea',
          });
          this.closeModal();
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send enquiry. Please try again later.',
            confirmButtonColor: '#e74c3c',
          });
          console.error(err);
        });
    }
  }
}
