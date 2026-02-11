import { Component, signal, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.translations()?.['contact'] ?? {});

  protected readonly sectionSubtitle = computed(() => this.t()['subtitle'] ?? 'Get In Touch');
  protected readonly sectionTitle = computed(() => this.t()['title'] ?? 'Contact Me');
  protected readonly heading = computed(() => this.t()['heading'] ?? "Let's work together");
  protected readonly contactDescription = computed(() => this.t()['description'] ?? 'Feel free to reach out if you have a project in mind, want to collaborate, or just want to say hello.');

  protected readonly form = computed(() => {
    const f = this.t()['form'];
    return {
      name: f?.['name'] ?? 'Your Name',
      namePlaceholder: f?.['namePlaceholder'] ?? 'John Doe',
      email: f?.['email'] ?? 'Your Email',
      emailPlaceholder: f?.['emailPlaceholder'] ?? 'john@example.com',
      subject: f?.['subject'] ?? 'Subject',
      subjectPlaceholder: f?.['subjectPlaceholder'] ?? 'Project Inquiry',
      message: f?.['message'] ?? 'Message',
      messagePlaceholder: f?.['messagePlaceholder'] ?? 'Your message...',
      send: f?.['send'] ?? 'Send Message',
      success: f?.['success'] ?? 'Message Sent!',
    };
  });

  protected readonly contactInfo = computed<ContactInfo[]>(() => {
    const info = this.t()['info'];
    return [
      { icon: 'fas fa-map-marker-alt', label: info?.['location']?.['label'] ?? 'Location', value: info?.['location']?.['value'] ?? 'Paris, France' },
      { icon: 'fas fa-envelope', label: info?.['email']?.['label'] ?? 'Email', value: info?.['email']?.['value'] ?? 'boubaker.ch@outlook.fr', link: 'mailto:boubaker.ch@outlook.fr' },
      { icon: 'fab fa-linkedin', label: info?.['linkedin']?.['label'] ?? 'LinkedIn', value: info?.['linkedin']?.['value'] ?? 'Boubaker Chieb', link: 'https://www.linkedin.com/in/boubaker-chieb/' },
      { icon: 'fab fa-github', label: info?.['github']?.['label'] ?? 'GitHub', value: info?.['github']?.['value'] ?? 'github.com/boubaker-chieb', link: 'https://github.com/boubaker-chieb' },
    ];
  });

  name = signal('');
  email = signal('');
  subject = signal('');
  message = signal('');
  submitted = signal(false);

  onSubmit(): void {
    if (this.name() && this.email() && this.message()) {
      const mailtoLink = `mailto:boubaker.ch@outlook.fr?subject=${encodeURIComponent(this.subject() || 'Contact from Portfolio')}&body=${encodeURIComponent(`From: ${this.name()} (${this.email()})\n\n${this.message()}`)}`;
      window.open(mailtoLink);
      this.submitted.set(true);
      setTimeout(() => this.submitted.set(false), 3000);
    }
  }
}
