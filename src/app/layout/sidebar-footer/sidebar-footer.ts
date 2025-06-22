import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Sun, Moon, User } from "lucide-angular";
import { ThemeService } from "../../services/theme-service";

@Component({
  selector: "app-layout-sidebar-footer",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./sidebar-footer.html",
  styleUrl: "./sidebar-footer.scss",
})
export class LayoutSidebarFooter implements OnInit {
  isDarkTheme = true; // Mantida para lógica interna, mas não mais como @Input
  // @Output() themeToggled foi removido anteriormente, o que está correto

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly UserIcon = User;

  private themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.theme$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });
  }

  getFooterClasses(): string {
    const baseClasses =
      "flex items-center justify-between p-4 border-t flex-shrink-0";
    const themeClasses = this.isDarkTheme
      ? "border-gray-800"
      : "border-gray-200";
    return `${baseClasses} ${themeClasses}`;
  }

  getThemeButtonClasses(): string {
    const baseClasses = "p-2 rounded transition-colors";
    const themeClasses = this.isDarkTheme
      ? "text-gray-400 hover:text-yellow-500 hover:bg-gray-800"
      : "text-gray-400 hover:text-yellow-500 hover:bg-gray-200";
    return `${baseClasses} ${themeClasses}`;
  }

  getAvatarButtonClasses(): string {
    const baseClasses = "p-2 rounded transition-colors";
    const themeClasses = this.isDarkTheme
      ? "text-gray-400 hover:text-white hover:bg-gray-800"
      : "text-gray-400 hover:text-black hover:bg-gray-200";
    return `${baseClasses} ${themeClasses}`;
  }

  onThemeToggle() {
    this.themeService.setDarkTheme(!this.isDarkTheme);
  }
}
