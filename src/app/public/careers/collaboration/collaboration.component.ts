import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- add this

@Component({
  selector: 'app-collaboration',
  standalone: true,
  imports: [CommonModule], // <-- add this
  templateUrl: './collaboration.component.html',
  styleUrl: './collaboration.component.scss'
})
export class CollaborationComponent {
  public featuredProjects = [
    {
      title: 'GenAI Doc Assistant',
      description: 'Smart document helper using the latest GenAI, built by our contributors.',
      link: 'https://github.com/arp-techlabs/genai-doc'
    },
    {
      title: 'Open-Source Case Law',
      description: 'Legal tech for global research. OSS, actionable in real-world settings.',
      link: 'https://github.com/arp-techlabs/caselaw'
    },
    {
      title: 'Easy Health Tracker',
      description: 'Open mobile toolkit for personal and professional health monitoring.',
      link: 'https://github.com/arp-techlabs/healthtracker'
    },
  ];
}
