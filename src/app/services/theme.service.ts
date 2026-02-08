import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly theme = signal<Theme>('dark');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('portfolio-theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        this.theme.set(saved);
      }
      this.applyTheme(this.theme());

      effect(() => {
        const t = this.theme();
        this.applyTheme(t);
        localStorage.setItem('portfolio-theme', t);
      });
    }
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
