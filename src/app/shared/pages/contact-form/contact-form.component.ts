import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmailService } from '../../../services/email.service'; 

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  formData = {
    name: '',
    email: '',
    project: '',
    message: '',
  };

  constructor(private emailService: EmailService) {}

  async submitForm() {
    try {
      await this.emailService.sendMail(
        'common',
        this.formData.name,
        this.formData.email,
        this.formData.project,
        this.formData.message
      );

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your message has been sent!',
        showConfirmButton: false,
        timer: 1500,
      });

      this.formData = { name: '', email: '', project: '', message: '' };
    } catch (error: any) {
      console.error('Email sending failed:', error?.text || error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while sending your message. Please try again later.',
      });
    }
  }
}
