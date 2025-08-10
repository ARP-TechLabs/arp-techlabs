import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home | ARP TechLabs' },
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'solutions',
    loadChildren: () =>
      import('./solutions/solutions.module').then((m) => m.SolutionsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),
  },{
    path: '',
    loadChildren: () =>
      import('./careers/careers.module').then((m) => m.CareersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
