import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackTopComponent } from '../../components/backTop/back-top/back-top.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../../services/SeoService.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../services/email.service';
import { EnquirymodelComponent } from '../../../shared/pages/enquirymodel/enquirymodel.component';

@Component({
  selector: 'app-product-development',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EnquirymodelComponent],
  templateUrl: './product-development.component.html',
  styleUrl: './product-development.component.scss',
})
export class ProductDevelopmentComponent implements OnInit {
  enquiryForm!: FormGroup;
  selectedPlan = '';
  @ViewChild('enquiryModal') enquiryModal!: EnquirymodelComponent;

  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.seo.updateSeo(
      'PaaS Solutions | ARP TechLabs',
      'Platform-as-a-Service solutions for faster, scalable, and cost-effective deployments.',
      'https://arp-techlabs.vercel.app/paas',
      'PaaS, Cloud Platform Solutions, ARP TechLabs'
    );
  }

  openModal(plan: string) {
    this.selectedPlan = plan;
    this.enquiryModal.openModal();
  }
}
