import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../services/SeoService.service';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss'],
})
export class JoinUsComponent implements OnInit {
  constructor(private seo: SeoService) {}
  // Cookie Policy
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
  isDarkMode: boolean = false; // Toggle if you have dark mode switch logic

  filteredRoles() {
    return this.roles.filter((role) =>
      role.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  openModal(role: any) {
    this.selectedRole = role;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  applyForRole() {
    alert('Application submitted!');
    this.closeModal();
  }
}
