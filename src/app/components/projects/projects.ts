import { Component, signal } from '@angular/core';

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  icon: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  activeFilter = signal('All');

  readonly filters = ['All', 'Finance', 'Automotive', 'IoT'];

  readonly projects: Project[] = [
    {
      title: 'Leasing Auto Platform',
      category: 'Automotive',
      description:
        'Full-stack leasing management platform for automotive fleet operations with real-time tracking and automated workflows.',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
      icon: 'fas fa-car',
    },
    {
      title: 'Welcome Auto System',
      category: 'Automotive',
      description:
        'Digital onboarding system for automotive clients with document management and approval workflows.',
      technologies: ['Angular', 'C#', 'Entity Framework', 'Azure DevOps'],
      icon: 'fas fa-handshake',
    },
    {
      title: 'FundAlert Platform',
      category: 'Finance',
      description:
        'Real-time fund alerting and monitoring platform for asset management with configurable alert rules and dashboards.',
      technologies: ['Angular', '.NET Core', 'SignalR', 'SQL Server'],
      icon: 'fas fa-bell',
    },
    {
      title: 'Funds-Factsheet Generator',
      category: 'Finance',
      description:
        'Automated generation of fund factsheets with dynamic data visualization and PDF export capabilities.',
      technologies: ['Angular', 'C#', '.NET Core', 'Azure'],
      icon: 'fas fa-file-alt',
    },
    {
      title: 'IoT-Lifting Monitoring',
      category: 'IoT',
      description:
        'IoT-based real-time monitoring platform for lifting equipment with sensor data visualization and predictive alerts.',
      technologies: ['Angular', '.NET Core', 'MongoDB', 'SignalR'],
      icon: 'fas fa-microchip',
    },
    {
      title: 'Fund Administration',
      category: 'Finance',
      description:
        'Comprehensive fund administration system handling NAV calculations, investor reporting, and regulatory compliance.',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Entity Framework'],
      icon: 'fas fa-chart-line',
    },
  ];

  get filteredProjects(): Project[] {
    const filter = this.activeFilter();
    if (filter === 'All') return this.projects;
    return this.projects.filter((p) => p.category === filter);
  }

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }
}
