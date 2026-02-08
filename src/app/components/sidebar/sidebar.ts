import { Component, signal, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly themeService = inject(ThemeService);
  protected readonly activeSection = signal('hero');
  protected readonly isMobileMenuOpen = signal(false);

  readonly navItems = [
    { id: 'hero', icon: 'fas fa-home', label: 'Home' },
    { id: 'about', icon: 'fas fa-user', label: 'About' },
    { id: 'skills', icon: 'fas fa-cogs', label: 'Skills' },
    { id: 'experience', icon: 'fas fa-briefcase', label: 'Experience' },
    { id: 'projects', icon: 'fas fa-folder-open', label: 'Projects' },
    { id: 'contact', icon: 'fas fa-envelope', label: 'Contact' },
  ];

  readonly socialLinks = [
    { url: 'https://www.linkedin.com/in/boubaker-chieb-726b11187', icon: 'fab fa-linkedin-in' },
    { url: 'https://github.com/boubaker-chieb', icon: 'fab fa-github' },
    { url: 'mailto:boubaker.ch@outlook.fr', icon: 'fas fa-envelope' },
  ];

  scrollTo(sectionId: string): void {
    this.activeSection.set(sectionId);
    this.isMobileMenuOpen.set(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }
}
