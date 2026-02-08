import { Component } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Hero, About, Skills, ExperienceComponent, Projects, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
