import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinUsComponent } from './join-us/join-us.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { BookSeminarComponent } from './book-seminar/book-seminar.component';
import { ArpLearningComponent } from './arp-learning/arp-learning.component';


const routes: Routes = [
  { path: 'join-us', component: JoinUsComponent, data: { title: 'Join Us | ARP TechLabs' }},
  { path: 'collaboration', component: CollaborationComponent, data: { title: 'Collaboration | ARP TechLabs' }},
  { path: 'book-seminar', component: BookSeminarComponent, data: { title: 'Book Seminar | ARP TechLabs' }},
  { path: 'arp-learning', component: ArpLearningComponent, data: { title: 'ARP for Learning | ARP TechLabs' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareersRoutingModule { }
