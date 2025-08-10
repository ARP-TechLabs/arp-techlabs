import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsRoutingModule } from './contact-us.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    FormsModule
  ]
})
export class ContactUsModule { }
