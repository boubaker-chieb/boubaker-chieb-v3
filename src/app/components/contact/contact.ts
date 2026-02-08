import { Component, signal } from '@angular/core';

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
  readonly contactInfo: ContactInfo[] = [
    {
      icon: 'fas fa-map-marker-alt',
      label: 'Location',
      value: 'Paris, France',
    },
    {
      icon: 'fas fa-envelope',
      label: 'Email',
      value: 'boubaker.ch@outlook.fr',
      link: 'mailto:boubaker.ch@outlook.fr',
    },
    {
      icon: 'fab fa-linkedin',
      label: 'LinkedIn',
      value: 'Boubaker Chieb',
      link: 'https://www.linkedin.com/in/boubaker-chieb/',
    },
    {
      icon: 'fab fa-github',
      label: 'GitHub',
      value: 'github.com/bchieb',
      link: 'https://github.com/bchieb',
    },
  ];

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
