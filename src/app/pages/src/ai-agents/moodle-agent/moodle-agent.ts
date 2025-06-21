import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { ThemeService } from "../../../../services/theme-service";

interface MoodleService {
  name: string;
  description: string;
  file: string;
  route: string;
}

interface ProjectStatus {
  component: string;
  status: 'dev' | 'ready' | 'planned';
}

@Component({
  selector: "app-moodle-agent",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./moodle-agent.html",
  styleUrl: "./moodle-agent.scss",
})
export class MoodleAgent implements OnInit, OnDestroy {
  isDarkTheme = true;
  private destroy$ = new Subject<void>();
  private themeService = inject(ThemeService);

  services: MoodleService[] = [
    {
      name: 'MoodleChat',
      description: 'Interface de mensagens e comunicação direta com utilizadores Moodle',
      file: 'moodle.chat',
      route: '/src/ai-agent/moodle-agent/moodle-chat'
    },
    {
      name: 'MoodleLangChain',
      description: 'Integração com LangChain para processamento inteligente de conteúdo',
      file: 'moodle.langchain',
      route: '/src/ai-agent/moodle-agent/moodle-langchain'
    },
    {
      name: 'MoodleMcp',
      description: 'Protocolo de contexto para comunicação avançada entre modelos',
      file: 'moodle.mcp',
      route: '/src/ai-agent/moodle-agent/moodle-mcp'
    }
  ];

  projectStatus: ProjectStatus[] = [
    { component: 'MoodleChat', status: 'dev' },
    { component: 'MoodleLangChain', status: 'planned' },
    { component: 'MoodleMcp', status: 'planned' }
  ];

  ngOnInit() {
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkTheme = isDark;
      });
  }

  getHeaderClasses(): string {
    return `text-3xl font-bold mb-2 ${this.isDarkTheme ? 'text-green-400' : 'text-green-600'}`;
  }

  getSubtitleClasses(): string {
    return `text-lg ${this.isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`;
  }

  getSectionClasses(): string {
    return `text-xl font-semibold ${this.isDarkTheme ? 'text-yellow-400' : 'text-yellow-600'}`;
  }

  getServiceTitleClasses(): string {
    return `font-semibold ${this.isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`;
  }

  getTextClasses(): string {
    return this.isDarkTheme ? 'text-gray-300' : 'text-gray-700';
  }

  getCodeClasses(): string {
    return `text-sm ${this.isDarkTheme ? 'text-green-300' : 'text-green-700'}`;
  }

  getLinkClasses(): string {
    return `text-sm hover:underline ${this.isDarkTheme ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'}`;
  }

  getStatusClasses(status: string): string {
    const base = 'text-sm font-mono';
    switch(status) {
      case 'ready': return `${base} text-green-500`;
      case 'dev': return `${base} text-yellow-500`;
      case 'planned': return `${base} text-gray-500`;
      default: return `${base} text-gray-500`;
    }
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'ready': return '✓';
      case 'dev': return '⚡';
      case 'planned': return '○';
      default: return '?';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}