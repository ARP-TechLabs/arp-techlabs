import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from "../../../shared/pages/contact-form/contact-form.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, ContactFormComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
 
}
