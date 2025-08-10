import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    BrowserAnimationsModule
  ]
})
export class CompanyModule { }
