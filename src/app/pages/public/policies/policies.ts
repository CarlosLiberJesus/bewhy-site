import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ThemeService } from "../../../services/theme-service";

@Component({
  selector: "app-policies",
  imports: [],
  templateUrl: "./policies.html",
  styleUrl: "./policies.scss",
})
export class Policies implements OnInit, OnDestroy {
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

  getContrast(baseClasses: string): string {
    const themeClasses = this.isDarkTheme ? "dark:prose-invert prose" : "prose";
    return `${baseClasses} ${themeClasses}`;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
