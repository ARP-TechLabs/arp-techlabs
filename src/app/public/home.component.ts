import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from "../shared/pages/contact-form/contact-form.component";
import { AiAgentComponent } from "./components/ai-agent/ai-agent.component";
import { SeoService } from '../services/SeoService.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ContactFormComponent,
    AiAgentComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Home | ARP TechLabs',
      'ARP TechLabs delivers innovative AI, software, and data-driven solutions to empower businesses worldwide.',
      'https://arp-techlabs.vercel.app/',
      'ARP TechLabs, AI Solutions, Software Development, Data Science'
    );
  }
  services = [
    {
      icon: 'fa fa-code',
      title: 'Web Design',
      description: 'Lorem ipsum dolor sit amet elit...',
      delay: '.3s',
    },
    {
      icon: 'fa fa-file-code',
      title: 'Web Development',
      description: 'Lorem ipsum dolor sit amet elit...',
      delay: '.5s',
    },
    {
      icon: 'fa fa-external-link-alt',
      title: 'UI/UX Design',
      description: 'Lorem ipsum dolor sit amet elit...',
      delay: '.7s',
    },
    {
      icon: 'fas fa-user-secret',
      title: 'Web Security',
      description: 'Lorem ipsum dolor sit amet elit...',
      delay: '.3s',
    },
    {
      icon: 'fa fa-envelope-open',
      title: 'Digital Marketing',
      description: 'Lorem ipsum dolor sit amet elit...',
      delay: '.5s',
    },
    {
      icon: 'fas fa-laptop',
      title: 'Programming',
      description: 'Lorem ipsum dolor sit amet elit...',
      delay: '.7s',
    },
  ];

  projects = [
    {
      img: 'assets/img/project-1.jpg',
      title: 'Web design',
      subtitle: 'Web Analysis',
      delay: '.3s',
    },
    {
      img: 'assets/img/project-2.jpg',
      title: 'Cyber Security',
      subtitle: 'Cyber Security Core',
      delay: '.5s',
    },
    {
      img: 'assets/img/project-3.jpg',
      title: 'Mobile Info',
      subtitle: 'Upcomming Phone',
      delay: '.7s',
    },
    {
      img: 'assets/img/project-4.jpg',
      title: 'Web Development',
      subtitle: 'Web Analysis',
      delay: '.3s',
    },
    {
      img: 'assets/img/project-5.jpg',
      title: 'Digital Marketing',
      subtitle: 'Marketing Analysis',
      delay: '.5s',
    },
    {
      img: 'assets/img/project-6.jpg',
      title: 'Keyword Research',
      subtitle: 'Keyword Analysis',
      delay: '.7s',
    },
  ];

  blogs = [
    {
      img: 'assets/img/blog-1.jpg',
      category: 'Web Design',
      author: 'Daniel Martin',
      date: '24 March 2023',
      description: 'Lorem ipsum dolor sit amet elit...',
      shares: 5324,
      comments: 5,
      delay: '.3s',
    },
    {
      img: 'assets/img/blog-2.jpg',
      category: 'Development',
      author: 'Daniel Martin',
      date: '23 April 2023',
      description: 'Lorem ipsum dolor sit amet elit...',
      shares: 5324,
      comments: 5,
      delay: '.5s',
    },
    {
      img: 'assets/img/blog-3.jpg',
      category: 'Mobile App',
      author: 'Daniel Martin',
      date: '30 Jan 2023',
      description: 'Lorem ipsum dolor sit amet elit...',
      shares: 5324,
      comments: 5,
      delay: '.7s',
    },
  ];

  teamMembers = [
    {
      img: 'assets/img/team-1.jpg',
      name: 'Madina Shafiq Mangaonkar',
      designation: 'CEO & Founder',
      social: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
    },
    {
      img: 'assets/img/team-3.jpg',
      name: 'Renu Indrajit Sharma',
      designation: 'CTO & Founder',
      social: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
    },
    {
      img: 'assets/img/team-3.jpg',
      name: 'Suhagmati Bholashankar Vishwakarma',
      designation: 'COO & Founder',
      social: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
    },
  ];

  testimonials = [
    {
      img: 'assets/img/testimonial-1.jpg',
      name: 'Client Name',
      profession: 'Profession',
      review:
        'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.',
      stars: 5,
    },
    {
      img: 'assets/img/testimonial-2.jpg',
      name: 'Client Name',
      profession: 'Profession',
      review:
        'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.',
      stars: 5,
    },
    {
      img: 'assets/img/testimonial-3.jpg',
      name: 'Client Name',
      profession: 'Profession',
      review:
        'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.',
      stars: 5,
    },
    {
      img: 'assets/img/testimonial-4.jpg',
      name: 'Client Name',
      profession: 'Profession',
      review:
        'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.',
      stars: 5,
    },
  ];
}
