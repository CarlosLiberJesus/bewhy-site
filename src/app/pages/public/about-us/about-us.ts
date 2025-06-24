import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import {
  LucideAngularModule,
  Target,
  RefreshCw,
  Megaphone,
} from "lucide-angular";
import { ThemeService } from "../../../services/theme-service";
import { MetaTagService } from "../../../services/meta-tag-service";

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./about-us.html",
  styleUrl: "./about-us.scss",
})
export class AboutUs implements OnInit, OnDestroy {
  isDarkTheme = true;

  readonly TargetIcon = Target;
  readonly RefreshCwIcon = RefreshCw;
  readonly MegaphoneIcon = Megaphone;

  /**
   * Seções da página Sobre Nós
   * Cada objeto representa uma parte da nossa história, missão, objetivos e evolução.
   */
  aboutSections = [
    {
      title: "Missão",
      content: `Oferecer "Agentes como Serviço" (AAAS) com a flexibilidade e escalabilidade do modelo SaaS, tornando tecnologia de automação e inteligência acessível a todos. Acreditamos em soluções éticas, transparentes e centradas no utilizador.`,
    },
    {
      title: "História Pré-Marca",
      content: `Fundador com background de senior corporate developer, experiência em ambientes enterprise, decide abraçar o espírito libertário e criar uma plataforma aberta, colaborativa e inovadora. A paixão por PHP e Node.js, aliada a experiências em Java e Python, moldou a visão técnica da BeWhyOrg.`,
    },
    {
      title: "Objetivos",
      content: `Capacitar empresas e criadores a integrarem agentes inteligentes nos seus fluxos de trabalho, promovendo automação, eficiência e criatividade. Foco em privacidade, interoperabilidade e experiência do utilizador.`,
    },
    {
      title: "Histórico de Versões",
      content: `\n        - v1.0.0: Lançamento inicial da plataforma BeWhyOrg AAAS/SAAS\n        - v1.1.0: Integração de agentes customizáveis e APIs abertas\n        - v1.2.0: Suporte a múltiplas linguagens e frameworks (PHP, Node.js, Java, Python)\n        - v2.0.0: Nova interface, foco em acessibilidade e colaboração\n      `,
    },
    {
      title: "Publicidade",
      content: `Se procura inovação, ética e tecnologia de ponta, a BeWhyOrg é a escolha certa. Junte-se à revolução dos agentes inteligentes!`,
    },
  ];

  activeFile = "about-us.interface.ts";

  private fileContents: Record<string, string> = {
    "about-us.interface.ts": `/**
 * Sobre Nós 
 * 
 * Conheça a missão, história, objetivos e evolução da BeWhyOrg.
 */

interface AboutUs {
  /**
   * Missão
   */
  mission: "Oferecer Agentes como Serviço (AAAS) com a flexibilidade SaaS, tornando automação e inteligência acessível a todos. Empoderar indivíduos e empresas de novas capacidades e processamento de informação! Combinar automação inteligente com ética e transparência, e integrando soluções inovadoras em infraestrutura existentes, recorrendo e produzindo código aberto.";

  /**
   * História Pré-Marca
   */
  preBrandHistory: "Fundada com paixão por tecnologia e liberdade de código. Depois de uma experiência corporativa sólida, incluindo projetos na PTSi e Accenture, rumo agora em projecto mais pro-bono e sociais. Parte da aprendizagem contínua e adaptação à revolução AI, abriu as possibilidades a criadores poderem aumentar os limites. A hoje pode planear uma nova <span class='text-blue-500'>história</span>, com a BeWhyOrg.";

  /**
   * Objetivos
   */
  goals: [
    "Capacitar empresas e criadores com agentes inteligentes personalizáveis",
    "Garantir privacidade e interoperabilidade em todos os projetos",
    "Actuar com agente não intrusivo, focado na experiência do utilizador",
    "Automação ética e transparente, integrando soluções inovadoras em infraestrutura existentes",
  ];

  /**
   * Serviços
   */
  services: [
    "Desenvolvimento de aplicações web",
    "APIs abertas para integração com sistemas existentes",
    "Agentes customizáveis para automação de tarefas",
    "Suporte a múltiplas linguagens e frameworks (PHP, Node.js, Python)",
  ],

  /**
   * Histórico de Versões
   */
  changelog: [
    {
      version: "v1.0.0",
      date: "2024-01-01",
      description: "Lançamento inicial da plataforma BeWhyOrg AAAS/SAAS"
    },
    {
      version: "v1.1.0",
      date: "2024-03-15",
      description: "Agentes customizáveis e APIs abertas"
    },
    {
      version: "v1.2.0",
      date: "2024-06-01",
      description: "Suporte a PHP, Node.js, Java, Python"
    },
    {
      version: "v2.0.0",
      date: "2025-01-10",
      description: "Nova interface, foco em acessibilidade"
    }
  ];

  /**
   * Publicidade
   */
  marketing: "Se procura inovação, ética e tecnologia de ponta, a BeWhyOrg é a escolha certa.";
}

export default AboutUs;
`,
  };

  private destroy$ = new Subject<void>();
  private themeService = inject(ThemeService);
  private metaTagService = inject(MetaTagService);

  ngOnInit() {
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkTheme = isDark;
      });
    this.metaTagService.setPageTags(
      "Sobre Nós",
      "Saiba mais sobre a BeWhyOrg, a nossa missão, visão e valores.",
      "https://www.BeWhyOrg/img/about-us-image.jpg",
      ["bewhyorg", "sobre nós", "missão", "visão", "valores"],
    );
  }

  getSectionTitleClasses(): string {
    const base = "text-lg font-bold font-mono flex items-center gap-2";
    return this.isDarkTheme
      ? `${base} text-yellow-400`
      : `${base} text-yellow-700`;
  }

  getSectionContentClasses(): string {
    const base = "text-sm font-mono whitespace-pre-line break-words";
    return this.isDarkTheme ? `${base} text-gray-200` : `${base} text-gray-700`;
  }

  get formattedContent(): string[] {
    const content =
      this.fileContents[this.activeFile] || "// File content not available";
    return content.split("\n");
  }

  getLineNumberClasses(): string {
    const baseClasses =
      "w-12 text-right pr-4 text-sm font-mono select-none whitespace-nowrap";
    const themeClasses = "text-gray-400";
    return `${baseClasses} ${themeClasses}`;
  }

  getContentClasses(): string {
    const baseClasses =
      "flex-1 text-sm font-mono whitespace-pre-line break-words";
    const themeClasses = this.isDarkTheme ? "text-gray-200" : "text-gray-700";
    return `${baseClasses} ${themeClasses}`;
  }

  getHighlightedLine(line: string): string {
    line = line.replace(/^(\s+)/, (match) => "&nbsp;".repeat(match.length));
    // Comentários
    if (
      line.includes("/*") ||
      line.includes("*/") ||
      line.includes("&nbsp;* ") ||
      line.startsWith("//")
    ) {
      return "<span class='text-emerald-400 italic'>" + line + "</span>";
    }
    if (line.split(":").length > 1) {
      const parts = line.split(":");
      let value = parts[1].trim();
      let colored;
      if (value.includes("{") || value.includes("[")) {
        colored = value;
      } else if (
        [
          "string",
          "number",
          "boolean",
          "true",
          "false",
          "never",
          "null",
          "undefined",
        ].some((type) => value.includes(type))
      ) {
        if (value.endsWith(";") || value.endsWith(","))
          value = value.slice(0, -1);
        colored = `<span class='text-pink-500'>${value}</span>;`;
      } else if (/^["'].*["']$/.test(value)) {
        if (value.endsWith(";") || value.endsWith(","))
          value = value.slice(0, -1);
        colored = `<span class='text-yellow-500'>${value}</span>;`;
      } else {
        if (value.endsWith(";") || value.endsWith(","))
          value = value.slice(0, -1);
        colored = `<span class='text-yellow-500'>${value}</span>;`;
      }
      return (
        '<span class="text-blue-500 font-semibold">' +
        parts[0] +
        "</span>: " +
        colored
      );
    }

    // Destacar keywords/tipos
    line = line.replace(
      /(?<!span class="[^"]*">)(\b(interface|type|export|import|const|let|var|function|class)\b)/g,
      `<span class="text-blue-500 font-semibold">$1</span>`,
    );
    line = line.replace(
      /(?<!span class="[^"]*">)(\b(string|number|boolean|true|false|never|null|undefined|default)\b)/g,
      `<span class="text-emerald-500">$1</span>`,
    );

    return line;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
