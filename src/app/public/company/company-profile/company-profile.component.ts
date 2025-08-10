import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { BackTopComponent } from "../../components/backTop/back-top/back-top.component";
import { FooterComponent } from "../../components/footer/footer.component";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule, BackTopComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss'
})
export class CompanyProfileComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Adnan',
      role: 'Co-Founder & CEO',
      image: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/56bd2d76-0155-4eb0-b350-6ea1b937b96a.png',
      linkedin: '#'
    },
    {
      name: 'Ritesh',
      role: 'Chief Technology Officer',
      image: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/56bd2d76-0155-4eb0-b350-6ea1b937b96a.png',
      linkedin: '#'
    },
    {
      name: 'Pankaj',
      role: 'Head of AI Solutions',
      image: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/56bd2d76-0155-4eb0-b350-6ea1b937b96a.png',
      linkedin: '#'
    }
  ];

  // Simple carousel options for basic implementation
  // Note: For full carousel functionality, you'd need to install and import ngx-owl-carousel-o
  currentSlide = 0;

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.teamMembers.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.teamMembers.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
