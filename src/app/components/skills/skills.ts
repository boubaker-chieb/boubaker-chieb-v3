import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.translations()?.['skills'] ?? {});

  protected readonly sectionSubtitle = computed(() => this.t()['subtitle'] ?? 'What I Know');
  protected readonly sectionTitle = computed(() => this.t()['title'] ?? 'Skills & Technologies');

  private readonly categoryMeta = [
    { key: 'frontend', icon: 'fas fa-laptop-code', color: '#61afef', fallbackTitle: 'Frontend', fallbackSkills: ['Angular', 'React', 'TypeScript', 'Signals'] },
    { key: 'backend', icon: 'fas fa-server', color: '#98c379', fallbackTitle: 'Backend', fallbackSkills: ['.NET Core', 'C#', 'Node.js', 'Entity Framework'] },
    { key: 'database', icon: 'fas fa-database', color: '#e06c75', fallbackTitle: 'Database', fallbackSkills: ['SQL Server', 'T-SQL', 'MongoDB', 'Azure SQL'] },
    { key: 'cloud', icon: 'fas fa-cloud', color: '#c678dd', fallbackTitle: 'Cloud & DevOps', fallbackSkills: ['Azure', 'Azure DevOps', 'Git', 'CI/CD Pipelines'] },
    { key: 'tools', icon: 'fas fa-tools', color: '#d19a66', fallbackTitle: 'Tools', fallbackSkills: ['Visual Studio', 'VS Code', 'Postman', 'Azure Portal'] },
  ];

  protected readonly categories = computed<SkillCategory[]>(() => {
    const cats = this.t()['categories'];
    return this.categoryMeta.map((m) => ({
      title: cats?.[m.key]?.['name'] ?? m.fallbackTitle,
      icon: m.icon,
      color: m.color,
      skills: cats?.[m.key]?.['items'] ?? m.fallbackSkills,
    }));
  });
}
