import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  formData = {
    name: '',
    email: '',
    project: '',
    message: ''
  };

   submitForm() {
    console.log('Form Submitted as Object:', { ...this.formData });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your message has been sent!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.formData = {
        name: '',
        email: '',
        project: '',
        message: ''
      };
    });
  }
}
