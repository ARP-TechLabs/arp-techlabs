import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { BackTopComponent } from "../../components/backTop/back-top/back-top.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-web-development',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.scss'
})
export class WebDevelopmentComponent {

}
