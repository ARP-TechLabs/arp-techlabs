import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiSolutionsComponent } from './ai-solutions/ai-solutions.component';
import { GenAiComponent } from './gen-ai/gen-ai.component';
import { WebDevelopmentComponent } from './web-development/web-development.component';
import { SoftwareDevelopmentComponent } from './software-development/software-development.component';
import { ProductDevelopmentComponent } from './product-development/product-development.component';
import { DataScienceComponent } from './data-science/data-science.component';
import { DataAnalyticsComponent } from './data-analytics/data-analytics.component';
import { DatabaseServicesComponent } from './database/database-services.component';


const routes: Routes = [
  { path: 'ai', component: AiSolutionsComponent ,data: { title: 'AI Solutions | Solutions' }},
  { path: 'gen-ai', component: GenAiComponent ,data: { title: 'GenAI | Solutions' }},
  { path: 'web', component: WebDevelopmentComponent ,data: { title: 'Web | Solutions' }},
  { path: 'software', component: SoftwareDevelopmentComponent ,data: { title: 'Software | Solutions' }},
  { path: 'paas', component: ProductDevelopmentComponent ,data: { title: 'PAAS | Solutions' }},
  { path: 'data-science', component: DataScienceComponent ,data: { title: 'Data Science | Solutions' }},
  { path: 'data-analytics', component: DataAnalyticsComponent ,data: { title: 'Data Analytics | Solutions' }},
  { path: 'db-services', component: DatabaseServicesComponent ,data: { title: 'DB Services | Solutions' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolutionsRoutingModule { }
