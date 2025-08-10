import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { BackTopComponent } from "../../components/backTop/back-top/back-top.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-data-analytics',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './data-analytics.component.html',
  styleUrl: './data-analytics.component.scss'
})
export class DataAnalyticsComponent {

}
