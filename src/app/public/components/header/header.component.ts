import {
  Component,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  HostListener,
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
  contactEmail = 'arptechlabs@gmail.com';
  isMobile = false;

  isMobileMenuOpen: { [key: string]: boolean } = {
    company: false,
    solutions: false,
    careers: false,
    contact: false,
  };

  private scrollListener: any;
  private clickListener: any;
  private resizeListener: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elRef: ElementRef
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
      this.setupEventListeners();
      this.checkScreenSize();
      this.initializeBootstrapDropdowns();
    }
  }

  private initializeTheme(): void {
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme === 'dark';
    document.documentElement.setAttribute(
      'data-theme',
      this.isDarkMode ? 'dark' : 'light'
    );
    document.body.setAttribute(
      'data-theme',
      this.isDarkMode ? 'dark' : 'light'
    );
  }

  private setupEventListeners(): void {
    // Sticky header on scroll
    this.scrollListener = () => {
      this.isSticky = window.scrollY > 50;
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });

    // Close mobile menu on outside click
    this.clickListener = (event: MouseEvent) => {
      this.handleOutsideClick(event);
    };
    document.addEventListener('click', this.clickListener);

    // Handle window resize
    this.resizeListener = () => {
      this.checkScreenSize();
      // Close mobile menus when switching to desktop
      if (!this.isMobile) {
        this.closeAllMobileMenus();
      }
    };
    window.addEventListener('resize', this.resizeListener);
  }

  private initializeBootstrapDropdowns(): void {
    // Initialize Bootstrap dropdowns for desktop mega menus
    if (typeof (window as any).bootstrap !== 'undefined') {
      const dropdownElements = this.elRef.nativeElement.querySelectorAll(
        '.dropdown-toggle:not(.d-lg-none)'
      );
      dropdownElements.forEach((element: any) => {
        new (window as any).bootstrap.Dropdown(element);
      });
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 900;
  }

  private handleOutsideClick(event: MouseEvent): void {
    const navbarCollapse = document.getElementById('navbarCollapse');
    const toggler = this.elRef.nativeElement.querySelector('.navbar-toggler');
    const target = event.target as Node;

    // Close Bootstrap collapse menu if clicking outside
    if (
      navbarCollapse &&
      navbarCollapse.classList.contains('show') &&
      !navbarCollapse.contains(target) &&
      !toggler.contains(target)
    ) {
      const bsCollapse = (window as any).bootstrap?.Collapse?.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }

    // Close mobile accordion menus if clicking outside
    if (this.isMobile) {
      const clickedElement = event.target as HTMLElement;
      const isInsideDropdown = clickedElement.closest('.dropdown-mega');
      const isDropdownToggle = clickedElement.closest('.dropdown-toggle');

      if (!isInsideDropdown && !isDropdownToggle) {
        this.closeAllMobileMenus();
      }
    }
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      const theme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }

  toggleMobileMenu(menuKey: string): void {
    if (!this.isMobile) return;

    // Close all other menus first
    Object.keys(this.isMobileMenuOpen).forEach(key => {
      if (key !== menuKey) {
        this.isMobileMenuOpen[key] = false;
      }
    });

    // Toggle the current menu
    this.isMobileMenuOpen[menuKey] = !this.isMobileMenuOpen[menuKey];
  }

  private closeAllMobileMenus(): void {
    Object.keys(this.isMobileMenuOpen).forEach(key => {
      this.isMobileMenuOpen[key] = false;
    });
  }

  // Method to check if any mobile menu is open
  get isMobileMenuActive(): boolean {
    return Object.values(this.isMobileMenuOpen).some(isOpen => isOpen);
  }

  // Method to close specific mobile menu (useful for router navigation)
  closeMobileMenu(menuKey: string): void {
    this.isMobileMenuOpen[menuKey] = false;
  }

  // Method to handle navigation and close mobile menus
  onNavigate(): void {
    if (this.isMobile) {
      this.closeAllMobileMenus();
      // Also close the Bootstrap collapse menu
      const navbarCollapse = document.getElementById('navbarCollapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = (window as any).bootstrap?.Collapse?.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  }

  // Prevent event propagation for mobile menu items
  onMobileMenuClick(event: Event): void {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
      }
      if (this.clickListener) {
        document.removeEventListener('click', this.clickListener);
      }
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
      }
    }
  }
}