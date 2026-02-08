import { Component } from '@angular/core';

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
  readonly categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: 'fas fa-laptop-code',
      color: '#61afef',
      skills: ['Angular', 'React', 'TypeScript', 'Signals'],
    },
    {
      title: 'Backend',
      icon: 'fas fa-server',
      color: '#98c379',
      skills: ['.NET Core', 'C#', 'Node.js', 'Entity Framework'],
    },
    {
      title: 'Database',
      icon: 'fas fa-database',
      color: '#e06c75',
      skills: ['SQL Server', 'T-SQL', 'MongoDB', 'Azure SQL'],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'fas fa-cloud',
      color: '#c678dd',
      skills: ['Azure', 'Azure DevOps', 'Git', 'CI/CD Pipelines'],
    },
    {
      title: 'Tools',
      icon: 'fas fa-tools',
      color: '#d19a66',
      skills: ['Visual Studio', 'VS Code', 'Postman', 'Azure Portal'],
    },
  ];
}
