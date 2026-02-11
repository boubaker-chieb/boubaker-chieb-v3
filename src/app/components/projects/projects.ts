import { Component, signal, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

interface Project {
  title: string;
  category: string;
  categoryKey: string;
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
  protected readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.translations()?.['projects'] ?? {});

  protected readonly sectionSubtitle = computed(() => this.t()['subtitle'] ?? 'My Work');
  protected readonly sectionTitle = computed(() => this.t()['title'] ?? 'Recent Projects');

  activeFilter = signal('all');

  protected readonly filterLabels = computed(() => {
    const f = this.t()['filters'];
    return {
      all: f?.['all'] ?? 'All',
      finance: f?.['finance'] ?? 'Finance',
      automotive: f?.['automotive'] ?? 'Automotive',
      iot: f?.['iot'] ?? 'IoT',
    };
  });

  protected readonly filters = computed(() => {
    const labels = this.filterLabels();
    return [
      { key: 'all', label: labels.all },
      { key: 'finance', label: labels.finance },
      { key: 'automotive', label: labels.automotive },
      { key: 'iot', label: labels.iot },
    ];
  });

  private readonly icons = ['fas fa-car', 'fas fa-handshake', 'fas fa-bell', 'fas fa-file-alt', 'fas fa-microchip', 'fas fa-chart-line'];
  private readonly categoryKeys = ['automotive', 'automotive', 'finance', 'finance', 'iot', 'finance'];

  private readonly fallbackProjects: Omit<Project, 'icon' | 'categoryKey'>[] = [
    { title: 'Leasing Auto Platform', category: 'Automotive', description: 'Full-stack leasing management platform for automotive fleet operations with real-time tracking and automated workflows.', technologies: ['Angular', '.NET Core', 'SQL Server', 'Azure'] },
    { title: 'Welcome Auto System', category: 'Automotive', description: 'Digital onboarding system for automotive clients with document management and approval workflows.', technologies: ['Angular', 'C#', 'Entity Framework', 'Azure DevOps'] },
    { title: 'FundAlert Platform', category: 'Finance', description: 'Real-time fund alerting and monitoring platform for asset management with configurable alert rules and dashboards.', technologies: ['Angular', '.NET Core', 'SignalR', 'SQL Server'] },
    { title: 'Funds-Factsheet Generator', category: 'Finance', description: 'Automated generation of fund factsheets with dynamic data visualization and PDF export capabilities.', technologies: ['Angular', 'C#', '.NET Core', 'Azure'] },
    { title: 'IoT-Lifting Monitoring', category: 'IoT', description: 'IoT-based real-time monitoring platform for lifting equipment with sensor data visualization and predictive alerts.', technologies: ['Angular', '.NET Core', 'MongoDB', 'SignalR'] },
    { title: 'Fund Administration', category: 'Finance', description: 'Comprehensive fund administration system handling NAV calculations, investor reporting, and regulatory compliance.', technologies: ['Angular', '.NET Core', 'SQL Server', 'Entity Framework'] },
  ];

  protected readonly projects = computed<Project[]>(() => {
    const entries = this.t()['entries'];
    if (!entries?.length) {
      return this.fallbackProjects.map((p, i) => ({ ...p, icon: this.icons[i], categoryKey: this.categoryKeys[i] }));
    }
    return entries.map((e: any, i: number) => ({
      title: e['title'] ?? this.fallbackProjects[i]?.title ?? '',
      category: e['category'] ?? this.fallbackProjects[i]?.category ?? '',
      categoryKey: this.categoryKeys[i] ?? 'all',
      description: e['description'] ?? this.fallbackProjects[i]?.description ?? '',
      technologies: e['technologies'] ?? this.fallbackProjects[i]?.technologies ?? [],
      icon: this.icons[i] ?? 'fas fa-project-diagram',
    }));
  });

  get filteredProjects(): Project[] {
    const filter = this.activeFilter();
    if (filter === 'all') return this.projects();
    return this.projects().filter((p) => p.categoryKey === filter);
  }

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }
}
