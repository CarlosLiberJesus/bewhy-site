import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import {
  LucideAngularModule,
  FileCode,
  Shield,
  Lock,
  Cookie,
  Mail,
  RefreshCw,
} from "lucide-angular";
import { ThemeService } from "../../../services/theme-service";

@Component({
  selector: "app-policies",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./policies.html",
  styleUrl: "./policies.scss",
})
export class Policies implements OnInit, OnDestroy {
  isDarkTheme = true;

  activeFile = "privacy-policy.interface.ts";

  readonly FileCodeIcon = FileCode;
  readonly ShieldIcon = Shield;
  readonly LockIcon = Lock;
  readonly CookieIcon = Cookie;
  readonly MailIcon = Mail;
  readonly RefreshCwIcon = RefreshCw;

  private fileContents: Record<string, string> = {
    "privacy-policy.interface.ts": `/**
 * Política de Privacidade
 * 
 * A sua privacidade é importante para nós. Esta interface explica 
 * como tratamos os seus dados pessoais e como utilizamos cookies.
 */

interface PrivacyPolicy {
  title: "Política de Privacidade";
  version: "1.0.0";
  lastUpdated: "2025-01-27";
  
  /**
   * Dados Pessoais
   * 
   * Não recolhemos dados pessoais identificáveis dos utilizadores,
   * exceto quando necessário para funcionalidades essenciais.
   */
  personalData: {
    collection: false;
    sharing: never;
    thirdPartyVendors: false;
    essentialOnly: true;
    
    exceptions: {
      contactForm: {
        purpose: "Funcionalidades essenciais";
        protection: "Google reCAPTCHA";
        retention: "Mínimo necessário";
      };
    };
  };

  /**
   * Cookies e Armazenamento Local
   * 
   * Utilizamos apenas cookies estritamente necessários
   * para o funcionamento do site.
   */
  cookies: {
    trackingCookies: false;
    advertisingCookies: false;
    analyticsCookies: false;
    
    essentialCookies: {
      themePreference: {
        type: "localStorage";
        purpose: "Guardar preferência de tema (claro/escuro)";
        data: "theme: 'light' | 'dark'";
        expiry: "Permanente até limpeza manual";
      };
      
      reCaptcha: {
        type: "cookie";
        purpose: "Proteger formulários contra spam";
        provider: "Google reCAPTCHA";
        data: "Tokens de segurança temporários";
        expiry: "Sessão";
      };
    };
  };

  /**
   * Segurança
   * 
   * Empenhamo-nos em proteger os seus dados através de
   * práticas seguras e minimização de recolha.
   */
  security: {
    dataProtection: "Práticas seguras implementadas";
    minimization: "Apenas dados estritamente necessários";
    encryption: "Comunicações HTTPS";
    accessControl: "Restrito ao essencial";
  };

  /**
   * Contacto
   * 
   * Para dúvidas sobre esta política de privacidade.
   */
  contact: {
    method: "Formulário do site";
    response: "Resposta em 48h úteis";
    privacy: "Protegido por reCAPTCHA";
  };

  /**
   * Alterações
   * 
   * Esta política pode ser atualizada ocasionalmente.
   */
  updates: {
    frequency: "Conforme necessário";
    notification: "Através desta página";
    recommendation: "Consultar periodicamente";
    changelog: "Versionamento semântico";
  };
}

export default PrivacyPolicy;
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

    // 1. comentários multilinha
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
      if (value.includes("{")) {
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
        if (value.endsWith(";")) value = value.slice(0, -1);
        colored = `<span class='text-pink-500'>${value}</span>;`;
      } else if (/^["'].*["']$/.test(value)) {
        if (value.endsWith(";")) value = value.slice(0, -1);
        colored = `<span class='text-yellow-500'>${value}</span>;`;
      } else {
        if (value.endsWith(";")) value = value.slice(0, -1);
        colored = `<span class='text-yellow-500'>${value}</span>;`;
      }
      return (
        '<span class="text-blue-500 font-semibold">' +
        parts[0] +
        "</span>: " +
        colored
      );
    }
    // 4. Destacar keywords/tipos apenas fora de spans
    // Isto é um truque: só faz replace em palavras que NÃO estão dentro de um span
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
