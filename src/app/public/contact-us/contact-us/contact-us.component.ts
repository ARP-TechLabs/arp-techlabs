import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from "../../../shared/pages/contact-form/contact-form.component";
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, ContactFormComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Contact Us | ARP TechLabs',
      'Get in touch with ARP TechLabs to discuss your technology needs.',
      'https://arp-techlabs.vercel.app/contact-us',
      'Contact ARP TechLabs, Tech Support, AI Company'
    );
  }
}
