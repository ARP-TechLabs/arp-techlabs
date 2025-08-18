import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-web-development',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.scss',
})
export class WebDevelopmentComponent implements OnInit {
  enquiryForm!: FormGroup;
  selectedPlan: string = '';

  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // ✅ SEO Setup
    this.seo.updateSeo(
      'Web Solutions | ARP TechLabs',
      'High-performance, scalable web applications designed for modern businesses.',
      'https://arp-techlabs.vercel.app/web',
      'Web Development, Web Solutions, ARP TechLabs'
    );

    // ✅ Angular reactive form (optional, for validation reuse)
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  // ✅ Open modal with SweetAlert form
  openModal(plan: string) {
    this.selectedPlan = plan;

    Swal.fire({
      title: `Enquire for ${plan}`,
      html: `
        <form id="enquiryForm" class="text-start">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input id="swal-name" type="text" class="form-control" placeholder="Enter your name" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input id="swal-email" type="email" class="form-control" placeholder="Enter your email" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea id="swal-desc" class="form-control" placeholder="Tell us more..." required></textarea>
          </div>
        </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: '📩 Submit Enquiry',
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement)
          .value;
        const email = (
          document.getElementById('swal-email') as HTMLInputElement
        ).value;
        const description = (
          document.getElementById('swal-desc') as HTMLTextAreaElement
        ).value;

        if (!name || !email || !description) {
          Swal.showValidationMessage('⚠️ All fields are required');
          return false;
        }

        return { name, email, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitEnquiry(result.value);
      }
    });
  }

  // ✅ Send email via service
  submitEnquiry(formData: any) {
    const { name, email, description } = formData;

    Swal.fire({
      title: '⏳ Sending...',
      text: 'Please wait while we send your enquiry.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.emailService
      .sendMail('service', name, email, this.selectedPlan, description, {
        serviceName: 'Web Development Service',
      })
      .then(() => {
        Swal.fire(
          '✅ Success!',
          'Your enquiry has been sent successfully!',
          'success'
        );
      })
      .catch((err) => {
        console.error(err);
        Swal.fire(
          '❌ Error',
          'Failed to send enquiry. Please try again later.',
          'error'
        );
      });
  }
}
