import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';


const routes: Routes = [
  { path: 'contact', component: ContactUsComponent, data: { title: 'Contact Us | ARP TechLabs' } },
  { path: 'disclaimer', component: DisclaimerComponent, data: { title: 'Disclaimer | ARP TechLabs' } },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, data: { title: 'Privacy Policy | ARP TechLabs' } },
  { path: 'terms-conditions', component: TermsConditionsComponent, data: { title: 'Terms & Conditions | ARP TechLabs' } },
  { path: 'cookie-policy', component: CookiePolicyComponent, data: { title: 'Cookie Policy | ARP TechLabs' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
