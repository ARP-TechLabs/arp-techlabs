import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private isBrowser: boolean;

  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  updateSeo(title: string, description: string, canonicalUrl?: string, keywords?: string) {
    this.updateTitle(title);
    this.updateDescription(description);
    if (keywords) this.updateKeywords(keywords);
    if (canonicalUrl) this.updateCanonical(canonicalUrl);
  }

  private updateTitle(title: string) {
    if (this.isBrowser) {
      this.titleService.setTitle(title);
    }
  }

  private updateDescription(desc: string) {
    if (this.isBrowser) {
      this.meta.updateTag({ name: 'description', content: desc });
    }
  }

  private updateKeywords(keywords: string) {
    if (this.isBrowser) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
  }

  private updateCanonical(url: string) {
    if (!this.isBrowser) return; // Only run in browser
    let link = this.doc.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
