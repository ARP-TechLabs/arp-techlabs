import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  updateSeo(title: string, description: string, canonicalUrl: string, keywords?: string) {
    this.updateTitle(title);
    this.updateDescription(description);
    if (keywords) this.updateKeywords(keywords);
    this.updateCanonical(canonicalUrl);
  }

  private updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  private updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  private updateKeywords(keywords: string) {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  private updateCanonical(url: string) {
    let link = this.doc.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
