import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/SeoService.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import this

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ✅ Add FormsModule
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  constructor(private seo: SeoService) {}

  blogs = [
    {
      img: 'assets/blogs/aiChatSupportBlog.jpg',
      category: 'AI Solutions',
      author: 'ARP TechLabs',
      date: '20 August 2025',
      description:
        'How AI Agents are Revolutionizing Customer Support — A deep dive into building intelligent, context-aware chat agents for businesses using modern GenAI frameworks.',
      link: 'https://medium.com/@arptechlabs/how-ai-agents-are-changing-the-game-in-customer-support-dfe69f52c7d4',
      delay: '.3s',
    },
    // add more blogs here...
  ];

  categories: string[] = [];
  authors: string[] = [];

  selectedCategory: string = '';
  selectedAuthor: string = '';
  selectedSort: string = 'newest';

  ngOnInit(): void {
    this.seo.updateSeo(
      'Blog | ARP TechLabs',
      'Latest insights, case studies, and tech stories from ARP TechLabs.',
      'https://arp-techlabs.vercel.app/blog',
      'ARP TechLabs, AI Solutions, Software Development, Data Science, Blogs'
    );

    this.categories = [...new Set(this.blogs.map((b) => b.category))];
    this.authors = [...new Set(this.blogs.map((b) => b.author))];
  }

  filteredBlogs() {
    let result = [...this.blogs];

    if (this.selectedCategory) {
      result = result.filter((b) => b.category === this.selectedCategory);
    }

    if (this.selectedAuthor) {
      result = result.filter((b) => b.author === this.selectedAuthor);
    }

    if (this.selectedSort === 'newest') {
      result = result.sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      result = result.sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    return result;
  }
}
