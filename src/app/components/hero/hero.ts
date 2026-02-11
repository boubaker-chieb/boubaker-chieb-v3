import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.translations()?.['hero'] ?? {});

  protected readonly name = computed(() => this.t()['name'] ?? 'Boubaker Chieb');
  protected readonly title = computed(() => this.t()['title'] ?? 'Full Stack Developer');
  protected readonly subtitle = computed(() => this.t()['subtitle'] ?? 'C#, .NET, Angular, TypeScript | Cloud & REST APIs | C# Certified');
  protected readonly greeting = computed(() => this.t()['greeting'] ?? 'Hello, I\'m');
  protected readonly description = computed(() => this.t()['description'] ?? 'I create modern web applications with cutting-edge technologies. Passionate about clean code, scalable architecture, and delivering exceptional user experiences.');
  protected readonly cta = computed(() => this.t()['cta'] ?? 'Let\'s Talk');
  protected readonly linkedinLabel = computed(() => this.t()['linkedin'] ?? 'LinkedIn Profile');

  protected readonly stats = computed(() => {
    const s = this.t()['stats'];
    return [
      { value: s?.['experience']?.['value'] ?? '8+', label: s?.['experience']?.['label'] ?? 'Years Experience' },
      { value: s?.['projects']?.['value'] ?? '50+', label: s?.['projects']?.['label'] ?? 'Projects Delivered' },
      { value: s?.['technologies']?.['value'] ?? '15+', label: s?.['technologies']?.['label'] ?? 'Technologies' },
    ];
  });

  protected readonly codeBlock = computed(() => {
    const cb = this.t()['codeBlock'];
    return {
      name: cb?.['name'] ?? 'Boubaker Chieb',
      role: cb?.['role'] ?? 'Full Stack Developer',
      skills: cb?.['skills'] ?? ['Angular', 'C#', '.NET'],
      passion: cb?.['passion'] ?? 'Building great apps',
    };
  });

  readonly socialLinks = [
    { url: 'https://www.linkedin.com/in/boubaker-chieb-726b11187', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { url: 'https://github.com/boubaker-chieb', icon: 'fab fa-github', label: 'GitHub' },
    { url: 'mailto:boubaker.ch@outlook.fr', icon: 'fas fa-envelope', label: 'Email' },
  ];
}
