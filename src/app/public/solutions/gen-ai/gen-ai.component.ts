import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { BackTopComponent } from "../../components/backTop/back-top/back-top.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-gen-ai',
  standalone: true,
  imports: [HeaderComponent, BackTopComponent, FooterComponent],
  templateUrl: './gen-ai.component.html',
  styleUrl: './gen-ai.component.scss'
})
export class GenAiComponent {

}
