import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-book-seminar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-seminar.component.html',
  styleUrl: './book-seminar.component.scss'
})
export class BookSeminarComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit(): void {
    this.seo.updateSeo(
      'Book a Seminar | ARP TechLabs',
      'Schedule educational seminars with ARP TechLabs experts on AI and technology.',
      'https://arp-techlabs.vercel.app/book-seminar',
      'Book Seminar, AI Training, ARP TechLabs'
    );
  }

}
