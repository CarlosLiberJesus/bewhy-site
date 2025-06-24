import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import {
  LucideAngularModule,
  FileCode,
  FileText,
  Settings,
  Lock,
  RefreshCw,
} from "lucide-angular";
import { ThemeService } from "../../services/theme-service";

@Component({
  selector: "app-pages-read-me",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./read-me.html",
  styleUrl: "./read-me.scss",
})
export class ReadMe implements OnInit, OnDestroy {
  activeFile = "README.md";
  isDarkTheme = true;

  readonly FileCodeIcon = FileCode;
  readonly FileTextIcon = FileText;
  readonly SettingsIcon = Settings;
  readonly LockIcon = Lock;
  readonly RefreshCwIcon = RefreshCw;

  readonly bannerContent: Record<string, string> = {
    "README.md": `
██████╗ ███████╗██╗    ██╗██╗  ██╗██╗   ██╗
██╔══██╗██╔════╝██║    ██║██║  ██║╚██╗ ██╔╝
██████╔╝█████╗  ██║ █╗ ██║███████║ ╚████╔╝ 
██╔══██╗██╔══╝  ██║███╗██║██╔══██║  ╚██╔╝  
██████╔╝███████╗╚███╔███╔╝██║  ██║   ██║   
╚═════╝ ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   

      ██████╗ ██████╗  ██████╗ 
     ██╔═══██╗██╔══██╗██╔════╝ 
     ██║   ██║██████╔╝██║  ███╗
     ██║   ██║██╔══██╗██║   ██║
██╗  ╚██████╔╝██║  ██║╚██████╔╝
╚═╝   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ 
`,
  };

  private fileContents: Record<string, string> = {
    "README.md": `
# Introdução

Bem-vindo ao projeto! Qualquer prestador de serviços, necessita de uma montra, o seu canto na internet.

## Sobre o Projeto
Demonstração de novos SAAS como AAAS. Muitos dos serviços são de código aberto, e estão disponíveis para consulta, modificação e utilização.
Como Agents As A Service (AAAS), necessitará de Keys de API para aceder a alguns serviços. Necessitará te der as suas próprias chaves de API para a sua LLM.

### Serviços Disponíveis
- **Web-Development**: Frontend e Backend
- **AI Agents**: Agentes de IA para diversas tarefas
- **Data Analysis**: Análise de dados com IA
- **Automation**: Automação de processos com IA

### Tecnologias Utilizadas
- Angular
- TypeScript
- Tailwind CSS
- Laravel
- PostgreSQL
- Redis
- Node.js
- Python

## Licença
Todos os serviços estão licenciados sob a GNU General Public License v3.0.
Pode consultar a licença completa no repositório do projeto.
[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
[GitHub Repository](https://github.com/CarlosLiberJesus/bewhy-site/blob/main/LICENSE)
Pode usar, modificar e distribuir o código, desde que mantenha a mesma licença.
`,
  };
  private destroy$ = new Subject<void>();
  private themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkTheme = isDark;
      });
  }

  get formattedContent(): string[] {
    const content =
      this.fileContents[this.activeFile] || "// File content not available";
    return content.split("\n");
  }

  getLineNumberClasses(): string {
    const baseClasses =
      "w-12 text-right pr-4 text-sm font-mono select-none whitespace-nowrap";
    //const baseClasses = "w-12 text-right pr-4 text-sm font-mono select-none";
    const themeClasses = "text-gray-400";
    return `${baseClasses} ${themeClasses}`;
  }

  getContentClasses(): string {
    const baseClasses =
      "flex-1 text-xs md:text-sm font-mono whitespace-pre-line break-words";
    const themeClasses = this.isDarkTheme ? "text-gray-200" : "text-gray-700";
    return `${baseClasses} ${themeClasses}`;
  }

  getIndentedLine(line: string): string {
    return line.replace(/^(\s+)/, (match) => "&nbsp;".repeat(match.length));
  }

  getHeaderClasses(): string {
    return this.isDarkTheme
      ? "bg-gray-800 border-gray-700"
      : "bg-gray-200 border-gray-300";
  }

  getFooterClasses(): string {
    return this.isDarkTheme
      ? "bg-gray-800 border-gray-700 text-gray-400"
      : "bg-gray-200 border-gray-300 text-gray-600";
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
