import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'fr' | 'ar';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly language = signal<Language>('en');
  readonly translations = signal<Record<string, any>>({});
  readonly direction = computed(() => (this.language() === 'ar' ? 'rtl' : 'ltr'));

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('portfolio-lang') as Language | null;
      if (saved === 'en' || saved === 'fr' || saved === 'ar') {
        this.language.set(saved);
      }

      this.loadTranslations(this.language());

      effect(() => {
        const lang = this.language();
        localStorage.setItem('portfolio-lang', lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      });
    }
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.loadTranslations(lang);
    }
  }

  private async loadTranslations(lang: Language): Promise<void> {
    try {
      const response = await fetch(`/i18n/${lang}.json`);
      this.translations.set(await response.json());
    } catch {
      if (lang !== 'en') {
        const fallback = await fetch('/i18n/en.json');
        this.translations.set(await fallback.json());
      }
    }
  }
}
