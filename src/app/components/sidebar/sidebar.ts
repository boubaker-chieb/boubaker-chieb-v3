import { Component, signal, inject, afterNextRender, DestroyRef, computed } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { I18nService, Language } from '../../services/i18n.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly themeService = inject(ThemeService);
  protected readonly i18n = inject(I18nService);
  protected readonly activeSection = signal('hero');
  protected readonly isMobileMenuOpen = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;

  protected readonly t = computed(() => this.i18n.translations()?.['nav'] ?? {});

  protected readonly navItems = computed(() => {
    const nav = this.t();
    return [
      { id: 'hero', icon: 'fas fa-home', label: nav['home'] ?? 'Home' },
      { id: 'about', icon: 'fas fa-user', label: nav['about'] ?? 'About' },
      { id: 'skills', icon: 'fas fa-cogs', label: nav['skills'] ?? 'Skills' },
      { id: 'experience', icon: 'fas fa-briefcase', label: nav['experience'] ?? 'Experience' },
      { id: 'projects', icon: 'fas fa-folder-open', label: nav['projects'] ?? 'Projects' },
      { id: 'contact', icon: 'fas fa-envelope', label: nav['contact'] ?? 'Contact' },
    ];
  });

  readonly languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  readonly socialLinks = [
    { url: 'https://www.linkedin.com/in/boubaker-chieb-726b11187', icon: 'fab fa-linkedin-in' },
    { url: 'https://github.com/boubaker-chieb', icon: 'fab fa-github' },
    { url: 'mailto:boubaker.ch@outlook.fr', icon: 'fas fa-envelope' },
  ];

  constructor() {
    afterNextRender(() => {
      this.setupScrollSpy();
      this.destroyRef.onDestroy(() => this.observer?.disconnect());
    });
  }

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

  cycleLang(): void {
    const order: Language[] = ['en', 'fr', 'ar'];
    const idx = order.indexOf(this.i18n.language());
    this.i18n.setLanguage(order[(idx + 1) % order.length]);
  }

  private setupScrollSpy(): void {
    const sectionIds = this.navItems().map((item) => item.id);
    const visibleSections = new Map<string, number>();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        for (const id of sectionIds) {
          if (visibleSections.has(id)) {
            this.activeSection.set(id);
            break;
          }
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '-10% 0px -60% 0px' }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }
}
