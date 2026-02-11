import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.translations()?.['about'] ?? {});

  protected readonly name = computed(() => this.t()['name'] ?? 'Boubaker CHIEB');
  protected readonly role = computed(() => this.t()['role'] ?? 'Full Stack Developer');
  protected readonly bio = computed(() => this.t()['bio'] ?? 'Passionate Full Stack Developer with 8+ years of experience building modern web applications. Specialized in Angular, C#/.NET, and cloud technologies. I thrive on creating clean, scalable solutions that make a real difference.');
  protected readonly sectionSubtitle = computed(() => this.t()['subtitle'] ?? 'Get to Know Me');
  protected readonly sectionTitle = computed(() => this.t()['title'] ?? 'About Me');
  protected readonly hireMeBtn = computed(() => this.t()['hireMeBtn'] ?? 'Hire Me');
  protected readonly experienceValue = computed(() => this.t()['experienceValue'] ?? '8+');
  protected readonly experienceLabel = computed(() => this.t()['experienceLabel'] ?? 'Years of Experience');

  protected readonly details = computed(() => {
    const d = this.t()['details'];
    return [
      { icon: 'fas fa-briefcase', label: d?.['current']?.['label'] ?? 'Current', value: d?.['current']?.['value'] ?? 'Amundi - Full-Stack Engineer' },
      { icon: 'fas fa-certificate', label: d?.['certification']?.['label'] ?? 'Certification', value: d?.['certification']?.['value'] ?? 'Microsoft C# Certified' },
      { icon: 'fas fa-map-marker-alt', label: d?.['location']?.['label'] ?? 'Location', value: d?.['location']?.['value'] ?? 'Paris, France' },
      { icon: 'fas fa-envelope', label: d?.['email']?.['label'] ?? 'Email', value: d?.['email']?.['value'] ?? 'boubaker.ch@outlook.fr' },
      { icon: 'fas fa-globe', label: d?.['languages']?.['label'] ?? 'Languages', value: d?.['languages']?.['value'] ?? 'French, English, Arabic' },
      { icon: 'fas fa-user-check', label: d?.['freelance']?.['label'] ?? 'Freelance', value: d?.['freelance']?.['value'] ?? 'Available' },
    ];
  });
}
