import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';
import { EnquirymodelComponent } from '../../../shared/pages/enquirymodel/enquirymodel.component';

@Component({
  selector: 'app-database-services',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EnquirymodelComponent,
    HeaderComponent,
    BackTopComponent,
    FooterComponent,
  ],
  templateUrl: './database-services.component.html',
  styleUrl: './database-services.component.scss',
})
export class DatabaseServicesComponent implements OnInit {
  @Input() showModal: boolean = false; // parent controls visibility
  @Input() selectedPlan: string = ''; // parent sets plan
  @Input() serviceName: string = ''; // parent can set "Database Service", "Product Development" etc.
  @Output() closed = new EventEmitter<void>();
  enquiryForm!: FormGroup;

  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Database Services | ARP TechLabs',
      'Reliable and scalable database solutions for enterprises.',
      'https://arp-techlabs.vercel.app/db-services',
      'Database Services, DB Management, ARP TechLabs'
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
          { serviceName: 'Database Service Package' }
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
