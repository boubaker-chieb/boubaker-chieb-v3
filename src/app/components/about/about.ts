import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly name = signal('Boubaker CHIEB');
  protected readonly role = signal('Full Stack Developer');
  protected readonly location = signal('Paris, France');
  protected readonly bio = signal(
    'Passionate Full Stack Developer with 8+ years of experience building modern web applications. Specialized in Angular, C#/.NET, and cloud technologies. I thrive on creating clean, scalable solutions that make a real difference.'
  );

  readonly details = [
    { icon: 'fas fa-briefcase', label: 'Current', value: 'Amundi - Full-Stack Engineer' },
    { icon: 'fas fa-certificate', label: 'Certification', value: 'Microsoft C# Certified' },
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Paris, France' },
    { icon: 'fas fa-envelope', label: 'Email', value: 'boubaker.ch@outlook.fr' },
    { icon: 'fas fa-globe', label: 'Languages', value: 'French, English, Arabic' },
    { icon: 'fas fa-user-check', label: 'Freelance', value: 'Available' },
  ];
}
