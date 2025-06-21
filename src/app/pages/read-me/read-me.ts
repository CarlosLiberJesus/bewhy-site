import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import {
  LucideAngularModule,
  FileCode,
  FileText,
  Settings,
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

  private fileContents: Record<string, string> = {
    "README.md": `
██████╗ ███████╗██╗    ██╗██╗  ██╗██╗   ██╗ ██████╗ ██████╗  ██████╗ 
██╔══██╗██╔════╝██║    ██║██║  ██║╚██╗ ██╔╝██╔═══██╗██╔══██╗██╔════╝ 
██████╔╝█████╗  ██║ █╗ ██║███████║ ╚████╔╝ ██║   ██║██████╔╝██║  ███╗
██╔══██╗██╔══╝  ██║███╗██║██╔══██║  ╚██╔╝  ██║   ██║██╔══██╗██║   ██║
██████╔╝███████╗╚███╔███╔╝██║  ██║   ██║   ╚██████╔╝██║  ██║╚██████╔╝
╚═════╝ ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ 

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
    const baseClasses = "w-12 text-right pr-4 text-sm font-mono select-none";
    const themeClasses = this.isDarkTheme ? "text-gray-600" : "text-gray-400";
    return `${baseClasses} ${themeClasses}`;
  }

  getContentClasses(): string {
    const baseClasses = "flex-1 text-sm font-mono whitespace-pre";
    const themeClasses = this.isDarkTheme ? "text-gray-300" : "text-gray-700";
    return `${baseClasses} ${themeClasses}`;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
