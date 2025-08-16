import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaboration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.scss'],
})
export class CollaborationComponent implements OnInit {
  constructor(private seo: SeoService, private emailService: EmailService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Collaboration Opportunities | ARP TechLabs',
      'Partner with ARP TechLabs for innovative AI and technology projects.',
      'https://arp-techlabs.vercel.app/collaboration',
      'Collaboration, Partnership, ARP TechLabs'
    );
  }

  public featuredProjects = [
    {
      title: 'GenAI Doc Assistant',
      description: 'Smart document helper using the latest GenAI, built by our contributors.',
      link: 'https://github.com/arp-techlabs/genai-doc',
    },
    {
      title: 'Open-Source Case Law',
      description: 'Legal tech for global research. OSS, actionable in real-world settings.',
      link: 'https://github.com/arp-techlabs/caselaw',
    },
    {
      title: 'Easy Health Tracker',
      description: 'Open mobile toolkit for personal and professional health monitoring.',
      link: 'https://github.com/arp-techlabs/healthtracker',
    },
  ];

  // Modal State
  isModalOpen: boolean = false;
  collabName: string = '';
  collabEmail: string = '';
  collabMessage: string = '';

  openModal() {
    this.isModalOpen = true;
    this.collabName = '';
    this.collabEmail = '';
    this.collabMessage = '';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async submitCollaboration() {
    if (!this.collabName || !this.collabEmail || !this.collabMessage) {
      Swal.fire('⚠️ Missing Info', 'Please fill all fields before sending.', 'warning');
      return;
    }

    try {
      await this.emailService.sendMail(
        'career',
        this.collabName,
        this.collabEmail,
        'Collaboration Request',
        this.collabMessage,
        { careerType: 'colab' }
      );

      Swal.fire(
        '🎉 Request Sent!',
        `Thanks ${this.collabName}, we’ll reach you at ${this.collabEmail}.`,
        'success'
      );
      this.closeModal();
    } catch (error) {
      console.error('❌ Email send error:', error);
      Swal.fire('Error', 'Something went wrong while sending your request. Try again later.', 'error');
    }
  }
}
