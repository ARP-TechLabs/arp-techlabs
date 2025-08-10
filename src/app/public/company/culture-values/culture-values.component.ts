import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { BackTopComponent } from "../../components/backTop/back-top/back-top.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-culture-values',
  standalone: true,
  imports: [BackTopComponent],
  templateUrl: './culture-values.component.html',
  styleUrl: './culture-values.component.scss'
})
export class CultureValuesComponent {

}
