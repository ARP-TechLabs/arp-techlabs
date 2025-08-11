import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent implements OnInit {
  constructor(private seo: SeoService) {}
  // Testimonial
ngOnInit(): void {
  this.seo.updateSeo(
    'Testimonials | ARP TechLabs',
    'See what clients say about working with ARP TechLabs and our commitment to delivering excellence.',
    'https://arp-techlabs.vercel.app/testimonial',
    'ARP TechLabs Testimonials, Client Reviews, Customer Feedback'
  );
}

}
