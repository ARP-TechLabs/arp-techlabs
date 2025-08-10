import {
  Component,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  isDarkMode = false;
  isSticky = false;
  contactEmail = 'connect@arptechlabs.com';

  isMobileMenuOpen: { [key: string]: boolean } = {};

  private scrollListener: any;
  private clickListener: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      this.isDarkMode = storedTheme === 'dark';
      document.documentElement.setAttribute(
        'data-theme',
        this.isDarkMode ? 'dark' : 'light'
      );

      // Sticky header
      this.scrollListener = () => {
        this.isSticky = window.scrollY > 50;
      };
      window.addEventListener('scroll', this.scrollListener);

      // Close menu on outside click
      this.clickListener = (event: MouseEvent) => {
        const navbarCollapse = document.getElementById('navbarCollapse');
        const toggler =
          this.elRef.nativeElement.querySelector('.navbar-toggler');

        if (
          navbarCollapse &&
          navbarCollapse.classList.contains('show') && // menu is open
          !navbarCollapse.contains(event.target as Node) && // click is outside menu
          !toggler.contains(event.target as Node) // click is not on toggle button
        ) {
          // Use Bootstrap collapse API to close
          (window as any).bootstrap.Collapse.getInstance(
            navbarCollapse
          )?.hide();
        }
      };

      document.addEventListener('click', this.clickListener);
    }
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      const theme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }

  toggleMobileMenu(menuKey: string): void {
    this.isMobileMenuOpen[menuKey] = !this.isMobileMenuOpen[menuKey];
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
      document.removeEventListener('click', this.clickListener);
    }
  }
}
