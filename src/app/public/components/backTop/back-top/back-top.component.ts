import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-top.component.html',
  styleUrl: './back-top.component.scss',
})
export class BackTopComponent {
  isBackToTopVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isBackToTopVisible = scrollPosition > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
