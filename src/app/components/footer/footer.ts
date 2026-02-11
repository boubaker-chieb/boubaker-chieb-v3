import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.translations()?.['footer'] ?? {});

  readonly currentYear = new Date().getFullYear();

  protected readonly description = computed(() => this.t()['description'] ?? 'Full Stack Developer specializing in .NET and Angular development.');
  protected readonly rights = computed(() => this.t()['rights'] ?? 'All rights reserved.');
  protected readonly footerName = computed(() => this.t()['name'] ?? 'Boubaker Chieb');

  readonly socialLinks = [
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/boubaker-chieb/' },
    { icon: 'fab fa-github', url: 'https://github.com/boubaker-chieb' },
    { icon: 'fas fa-envelope', url: 'mailto:boubaker.ch@outlook.fr' },
  ];
}
