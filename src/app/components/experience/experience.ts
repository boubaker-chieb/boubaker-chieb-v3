import { Component } from '@angular/core';

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
  readonly experiences: Experience[] = [
    {
      company: 'Amundi Technology',
      role: 'Tech Lead .NET / Angular',
      period: 'Jan 2026 - Present',
      location: 'Paris, France',
      description:
        'Leading technical architecture and development of fund management applications using .NET Core and Angular with modern patterns.',
      technologies: ['Angular', '.NET Core', 'Azure', 'SQL Server', 'CI/CD'],
    },
    {
      company: 'Ayvens (ALD Automotive)',
      role: 'Full Stack Developer .NET / Angular',
      period: 'Dec 2023 - Jan 2026',
      location: 'Paris, France',
      description:
        'Developed and maintained leasing management platforms, implementing new features and optimizing existing systems for automotive leasing operations.',
      technologies: ['Angular', 'C#', '.NET Core', 'SQL Server', 'Azure DevOps'],
    },
    {
      company: 'Société Générale',
      role: 'Full Stack Developer .NET / Angular',
      period: 'Mar 2021 - Dec 2023',
      location: 'Paris, France',
      description:
        'Built and maintained banking applications for fund management, implementing complex business rules and real-time data processing.',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Entity Framework', 'Azure'],
    },
    {
      company: 'HLi-Group',
      role: 'Full Stack Developer .NET / Angular',
      period: 'Jan 2019 - Feb 2021',
      location: 'Paris, France',
      description:
        'Developed IoT monitoring platforms and business management solutions, working across the full stack with .NET backend and Angular frontend.',
      technologies: ['Angular', 'C#', '.NET Core', 'MongoDB', 'SignalR'],
    },
    {
      company: 'Spark-IT',
      role: 'Web Developer .NET',
      period: 'Oct 2017 - Dec 2018',
      location: 'Tunis, Tunisia',
      description:
        'Started professional career developing web applications with ASP.NET MVC, handling database design and frontend integration.',
      technologies: ['ASP.NET MVC', 'C#', 'SQL Server', 'JavaScript', 'Bootstrap'],
    },
  ];
}
