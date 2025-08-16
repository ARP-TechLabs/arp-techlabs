import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-seminar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-seminar.component.html',
  styleUrls: ['./book-seminar.component.scss'],
})
export class BookSeminarComponent implements OnInit {
  constructor(private seo: SeoService, private emailService: EmailService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Book a Seminar | ARP TechLabs',
      'Schedule educational seminars with ARP TechLabs experts on AI and technology.',
      'https://arp-techlabs.vercel.app/book-seminar',
      'Book Seminar, AI Training, ARP TechLabs'
    );
  }

  formData = {
    name: '',
    email: '',
    organization: '',
    theme: '',
    date: '',
  };

  async submitSeminarRequest() {
    if (
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.theme ||
      !this.formData.date
    ) {
      Swal.fire(
        '⚠️ Missing Details',
        'Please fill all required fields.',
        'warning'
      );
      return;
    }

    const message = `
New Seminar Request 🎤

👤 Name: ${this.formData.name}
📧 Email: ${this.formData.email}
🏢 Organization: ${this.formData.organization || 'Not Provided'}
📌 Seminar Theme: ${this.formData.theme}
📅 Preferred Date: ${this.formData.date}
    `;

    try {
      await this.emailService.sendMail(
        'career',
        this.formData.name,
        this.formData.email,
        this.formData.theme,
        message,
        { careerType: 'seminar' }
      );

      Swal.fire({
        icon: 'success',
        title: '🎉 Request Sent!',
        text: `Thanks ${this.formData.name}, we’ll connect with you at ${this.formData.email}.`,
        confirmButtonColor: '#3085d6',
      });

      this.formData = {
        name: '',
        email: '',
        organization: '',
        theme: '',
        date: '',
      };
    } catch (error) {
      console.error('❌ Email send error:', error);
      Swal.fire(
        '❌ Error',
        'Something went wrong while sending your request. Please try again later.',
        'error'
      );
    }
  }
}
