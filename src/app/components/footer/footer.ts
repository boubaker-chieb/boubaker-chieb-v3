import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly socialLinks = [
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/boubaker-chieb/' },
    { icon: 'fab fa-github', url: 'https://github.com/bchieb' },
    { icon: 'fas fa-envelope', url: 'mailto:boubaker.ch@outlook.fr' },
  ];
}
