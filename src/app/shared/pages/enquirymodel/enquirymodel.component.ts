import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { EmailService } from '../../../services/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enquirymodel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enquirymodel.component.html',
  styleUrls: ['./enquirymodel.component.scss'],
})
export class EnquirymodelComponent {
  @Input() showModal = false;
  @Input() title: string = '';
  @Input() subject: string = '';
  @Input() serviceName: string = '';
  @Output() modalClosed = new EventEmitter<void>();

  enquiryForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalClosed.emit();
    this.enquiryForm.reset();
  }

  submitEnquiry() {
    if (this.enquiryForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Form Incomplete',
        text: '⚠️ Please fill in all required fields.',
      });
      return;
    }

    this.loading = true;
    const { name, email, description } = this.enquiryForm.value;

    this.emailService
      .sendMail('service', name, email, 'Enquiry Request', description, {
        serviceName: this.serviceName,
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Enquiry Sent!',
          text: '✅ Your enquiry has been sent successfully.',
        });
        this.closeModal();
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: '❌ Failed to send enquiry. Please try again later.',
        });
        console.error(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
