import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { EmailService } from '../../../services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enquirymodel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enquirymodel.component.html',
  styleUrl: './enquirymodel.component.scss',
})
export class EnquirymodelComponent implements OnInit {
  // Dynamic values passed from parent
  @Input() title: string = 'Send Enquiry';
  @Input() subject: string = '';
  @Input() serviceName: string = '';

  enquiryForm!: FormGroup;
  isOpen = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) {}

  ngOnInit(): void {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  // Open modal
  openModal() {
    this.isOpen = true;
  }

  // Close modal
  closeModal() {
    this.isOpen = false;
    this.enquiryForm.reset();
  }

  // Submit enquiry
  submitEnquiry() {
    if (this.enquiryForm.valid) {
      const { name, email, description } = this.enquiryForm.value;

      this.emailService
        .sendMail('service', name!, email!, this.subject, description!, {
          serviceName: this.serviceName,
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
