import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { BackTopComponent } from "../../components/backTop/back-top/back-top.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.scss'
})
export class VisionComponent {

}
