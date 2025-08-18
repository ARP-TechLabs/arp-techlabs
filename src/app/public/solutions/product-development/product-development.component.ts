import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../services/email.service'; 

@Component({
  selector: 'app-product-development',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './product-development.component.html',
  styleUrl: './product-development.component.scss',
})
export class ProductDevelopmentComponent implements OnInit {
  enquiryForm!: FormGroup;
  selectedPlan: string = '';

  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'PaaS Solutions | ARP TechLabs',
      'Platform-as-a-Service solutions for faster, scalable, and cost-effective deployments.',
      'https://arp-techlabs.vercel.app/paas',
      'PaaS, Cloud Platform Solutions, ARP TechLabs'
    );

    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  openEnquiry(plan: string) {
    this.selectedPlan = plan;
    (document.getElementById('enquiryModal') as any).style.display = 'block';
  }

  closeModal() {
    (document.getElementById('enquiryModal') as any).style.display = 'none';
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
          { serviceName: 'Product Development Package' }
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
