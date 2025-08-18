import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-software-development',
  templateUrl: './software-development.component.html',
  styleUrls: ['./software-development.component.scss'],
})
export class SoftwareDevelopmentComponent implements OnInit {
  selectedPlan: string = '';

  constructor(private seo: SeoService, private emailService: EmailService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Software Development | ARP TechLabs',
      'Enterprise-grade, scalable software solutions tailored for businesses.',
      'https://arp-techlabs.vercel.app/software',
      'Software Development, Custom Software, ARP TechLabs'
    );
  }

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
      showCancelButton: true,
      confirmButtonText: 'Submit Enquiry',
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

  submitEnquiry(formData: any) {
    const { name, email, description } = formData;

    this.emailService
      .sendMail('service', name, email, this.selectedPlan, description, {
        serviceName: 'Software Development Service',
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
