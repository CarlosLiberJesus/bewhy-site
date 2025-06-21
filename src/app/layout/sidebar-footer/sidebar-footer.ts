import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from "@angular/core";
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
  @Input() isDarkTheme = true;
  @Output() themeToggled = new EventEmitter<void>();

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
      : "border-gray-300";
    return `${baseClasses} ${themeClasses}`;
  }

  getThemeButtonClasses(): string {
    const baseClasses = "p-2 rounded transition-colors";
    const themeClasses = this.isDarkTheme
      ? "text-gray-400 hover:text-yellow-500 hover:bg-gray-900"
      : "text-gray-600 hover:text-yellow-600 hover:bg-gray-100";
    return `${baseClasses} ${themeClasses}`;
  }

  getAvatarButtonClasses(): string {
    const baseClasses = "p-2 rounded transition-colors";
    const themeClasses = this.isDarkTheme
      ? "text-gray-400 hover:text-white hover:bg-gray-900"
      : "text-gray-600 hover:text-black hover:bg-gray-100";
    return `${baseClasses} ${themeClasses}`;
  }

  onThemeToggle() {
    this.themeService.setDarkTheme(!this.isDarkTheme);
  }
}
