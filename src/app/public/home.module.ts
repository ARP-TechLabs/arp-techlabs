import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { CompanyRoutingModule } from './company/company.routing';
import { ContactUsModule } from './contact-us/contact-us.module';
import { SolutionsModule } from './solutions/solutions.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CompanyRoutingModule,
    ContactUsModule,
    SolutionsModule
  ]
})
export class HomeModule { }
