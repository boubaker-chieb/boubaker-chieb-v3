import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.translations()?.['experience'] ?? {});

  protected readonly sectionSubtitle = computed(() => this.t()['subtitle'] ?? 'My Journey');
  protected readonly sectionTitle = computed(() => this.t()['title'] ?? 'Work Experience');

  private readonly fallbackExperiences: Experience[] = [
    {
      company: 'Amundi Technology',
      role: 'Tech Lead .NET / Angular',
      period: 'Jan 2026 - Present',
      location: 'Paris, France',
      description: 'Leading technical architecture and development of fund management applications using .NET Core and Angular with modern patterns.',
      technologies: ['Angular', '.NET Core', 'Azure', 'SQL Server', 'CI/CD'],
    },
    {
      company: 'Ayvens (ALD Automotive)',
      role: 'Full Stack Developer .NET / Angular',
      period: 'Dec 2023 - Jan 2026',
      location: 'Paris, France',
      description: 'Developed and maintained leasing management platforms, implementing new features and optimizing existing systems for automotive leasing operations.',
      technologies: ['Angular', 'C#', '.NET Core', 'SQL Server', 'Azure DevOps'],
    },
    {
      company: 'Société Générale',
      role: 'Full Stack Developer .NET / Angular',
      period: 'Mar 2021 - Dec 2023',
      location: 'Paris, France',
      description: 'Built and maintained banking applications for fund management, implementing complex business rules and real-time data processing.',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Entity Framework', 'Azure'],
    },
    {
      company: 'HLi-Group',
      role: 'Full Stack Developer .NET / Angular',
      period: 'Jan 2019 - Feb 2021',
      location: 'Paris, France',
      description: 'Developed IoT monitoring platforms and business management solutions, working across the full stack with .NET backend and Angular frontend.',
      technologies: ['Angular', 'C#', '.NET Core', 'MongoDB', 'SignalR'],
    },
    {
      company: 'Spark-IT',
      role: 'Web Developer .NET',
      period: 'Oct 2017 - Dec 2018',
      location: 'Tunis, Tunisia',
      description: 'Started professional career developing web applications with ASP.NET MVC, handling database design and frontend integration.',
      technologies: ['ASP.NET MVC', 'C#', 'SQL Server', 'JavaScript', 'Bootstrap'],
    },
  ];

  protected readonly experiences = computed<Experience[]>(() => {
    const entries = this.t()['entries'];
    if (!entries?.length) return this.fallbackExperiences;
    return entries.map((e: any, i: number) => ({
      company: e['company'] ?? this.fallbackExperiences[i]?.company ?? '',
      role: e['role'] ?? this.fallbackExperiences[i]?.role ?? '',
      period: e['period'] ?? this.fallbackExperiences[i]?.period ?? '',
      location: e['location'] ?? this.fallbackExperiences[i]?.location ?? '',
      description: e['description'] ?? this.fallbackExperiences[i]?.description ?? '',
      technologies: e['technologies'] ?? this.fallbackExperiences[i]?.technologies ?? [],
    }));
  });
}
