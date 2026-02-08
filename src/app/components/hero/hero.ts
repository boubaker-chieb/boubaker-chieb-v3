import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly name = signal('Boubaker Chieb');
  protected readonly title = signal('Full Stack Developer');
  protected readonly subtitle = signal('C#, .NET, Angular, TypeScript | Cloud & REST APIs | C# Certified');
  protected readonly description = signal(
    'I create modern web applications with cutting-edge technologies. Passionate about clean code, scalable architecture, and delivering exceptional user experiences.'
  );

  readonly stats = [
    { value: '8+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Delivered' },
    { value: '15+', label: 'Technologies' },
  ];

  readonly socialLinks = [
    { url: 'https://www.linkedin.com/in/boubaker-chieb-726b11187', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { url: 'https://github.com/boubaker-chieb', icon: 'fab fa-github', label: 'GitHub' },
    { url: 'mailto:boubaker.ch@outlook.fr', icon: 'fas fa-envelope', label: 'Email' },
  ];
}
