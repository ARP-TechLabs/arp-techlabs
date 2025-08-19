import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionsRoutingModule } from './solutions.routing';
import { EnquirymodelComponent } from '../../shared/pages/enquirymodel/enquirymodel.component';
import { SoftwareDevelopmentComponent } from './software-development/software-development.component';

@NgModule({
  declarations: [SoftwareDevelopmentComponent],
  imports: [CommonModule, SolutionsRoutingModule, EnquirymodelComponent],
})
export class SolutionsModule {}
