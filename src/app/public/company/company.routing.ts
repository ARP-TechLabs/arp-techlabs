import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CultureValuesComponent } from './culture-values/culture-values.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UspComponent } from './usp/usp.component';
import { VisionComponent } from './vision/vision.component';


const routes: Routes = [
  { path: 'about-arp', component: CompanyProfileComponent, data: { title: 'Company Profile | ARP TechLabs' }},
  { path: 'culture-values', component: CultureValuesComponent, data: { title: 'Cultural Values | ARP TechLabs' }},
  { path: 'testimonial', component: TestimonialComponent, data: { title: 'Testimonials | ARP TechLabs' }},
  { path: 'timeline', component: TimelineComponent, data: { title: 'Timeline | ARP TechLabs' }},
  { path: 'why-arp', component: UspComponent ,data: { title: 'Why Select Us | ARP TechLabs' }},
  { path: 'mission-vision', component: VisionComponent, data: { title: 'Mission & Vision | ARP TechLabs' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
