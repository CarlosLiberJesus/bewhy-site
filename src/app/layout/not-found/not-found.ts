import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import {
  LucideAngularModule,
  AlertTriangle,
  Home,
  ArrowLeft,
} from "lucide-angular";
import { ThemeService } from "../../services/theme-service";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: "./not-found.html",
  styleUrl: "./not-found.scss",
})
export class NotFound implements OnInit, OnDestroy {
  readonly AlertTriangleIcon = AlertTriangle;
  readonly HomeIcon = Home;
  readonly ArrowLeftIcon = ArrowLeft;

  isDarkTheme = true;
  private destroy$ = new Subject<void>();

  private themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkTheme = isDark;
      });
  }

  getHighContrast(baseClasses: string): string {
    const themeClasses = this.isDarkTheme ? "text-gray-200" : "text-gray-700";
    return `${baseClasses} ${themeClasses}`;
  }

  getContrast(baseClasses: string): string {
    const themeClasses = this.isDarkTheme ? "text-gray-600" : "text-gray-400";
    return `${baseClasses} ${themeClasses}`;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
