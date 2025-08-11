import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError,
  ActivatedRoute,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FooterComponent } from './public/components/footer/footer.component';
import { HeaderComponent } from './public/components/header/header.component';
import { BackTopComponent } from './public/components/backTop/back-top/back-top.component';
import { LoadingService } from './services/loading.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    BackTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'arp-techlabs';
  isLoading = true;

  @ViewChild('cursor') cursor!: ElementRef;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Show loader at navigation start
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        this.cdr.detectChanges();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Wait until all HTTP calls are completed
        this.loadingService.loading$.subscribe((status) => {
          this.isLoading = status;
          this.cdr.detectChanges();
        });
      }
    });

    // Set dynamic page title
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        const pageTitle = data['title'] ?? 'ARP TechLabs';
        this.titleService.setTitle(pageTitle);
        this.title = pageTitle;
      });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('mousemove', (e) => {
        if (this.cursor?.nativeElement) {
          this.cursor.nativeElement.style.left = `${e.clientX}px`;
          this.cursor.nativeElement.style.top = `${e.clientY}px`;
        }
      });
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }
}
