import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/SeoService.service';
import { EnquirymodelComponent } from '../../../shared/pages/enquirymodel/enquirymodel.component';

@Component({
  selector: 'app-database-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EnquirymodelComponent],
  templateUrl: './database-services.component.html',
  styleUrl: './database-services.component.scss',
})
export class DatabaseServicesComponent implements OnInit {
  selectedPlan = '';
  @ViewChild('enquiryModal') enquiryModal!: EnquirymodelComponent;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'Database Services | ARP TechLabs',
      'Reliable and scalable database solutions for enterprises.',
      'https://arp-techlabs.vercel.app/db-services',
      'Database Services, DB Management, ARP TechLabs'
    );
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.enquiryModal.openModal();
  }
}
