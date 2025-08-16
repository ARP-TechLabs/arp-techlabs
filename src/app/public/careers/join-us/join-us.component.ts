import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';
import Swal from 'sweetalert2'; // ✅ Import Swal

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss'],
})
export class JoinUsComponent implements OnInit {
  constructor(private seo: SeoService, private emailService: EmailService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Join Us | ARP TechLabs',
      'Be a part of ARP TechLabs – explore opportunities and careers with us.',
      'https://arp-techlabs.vercel.app/join-us',
      'Join ARP TechLabs, Careers, AI Jobs, Tech Jobs'
    );
  }

  searchText: string = '';

  roles = [
    {
      title: 'Frontend Developer',
      location: 'Remote',
      experience: '2+ years',
      descriptionPoints: [
        'Develop responsive UI using Angular',
        'Collaborate with backend developers and designers',
        'Write unit tests and perform debugging',
      ],
      techStack: ['Angular', 'RxJS', 'SCSS', 'REST API'],
    },
    {
      title: 'Backend Developer',
      location: 'On-site (Mumbai)',
      experience: '3+ years',
      descriptionPoints: [
        'Design scalable backend using Node.js',
        'Implement secure REST APIs',
        'Manage database interactions and data integrity',
      ],
      techStack: ['Node.js', 'Express', 'SQL Server', 'JWT'],
    },
  ];

  selectedRole: any = null;
  isModalOpen: boolean = false;
  isDarkMode: boolean = false;

  applicantName: string = '';
  applicantEmail: string = '';

  filteredRoles() {
    return this.roles.filter((role) =>
      role.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  openModal(role: any) {
    this.selectedRole = role;
    this.isModalOpen = true;
    this.applicantName = '';
    this.applicantEmail = '';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async applyForRole() {
    if (!this.applicantName || !this.applicantEmail) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Info',
        text: '⚠️ Please enter your name and email before applying.',
      });
      return;
    }

    try {
      await this.emailService.sendMail(
        'career',
        this.applicantName,
        this.applicantEmail,
        this.selectedRole?.title,
        `Application for ${this.selectedRole?.title}, Get ready with your resume - Our team will reach you shortly \n\nCandidate: ${this.applicantName}\nEmail: ${this.applicantEmail}\n\nRole Details:\n${this.selectedRole?.descriptionPoints.join(
          '\n- '
        )}`,
        { careerType: 'join-us' }
      );

      Swal.fire({
        icon: 'success',
        title: 'Application Sent!',
        html: `🎉 We’ll reach you at <b>${this.applicantEmail}</b>.<br>
        Get ready with your resume, <b>${this.applicantName}</b>!`,
        confirmButtonText: 'Okay',
      });
    } catch (error) {
      console.error('❌ Email send error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong while sending your application. Please try again later.',
      });
    }

    this.closeModal();
  }
}
