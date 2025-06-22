import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ThemeService } from "../../../../services/theme-service";

@Component({
  selector: "app-moodle-agent",
  imports: [],
  templateUrl: "./moodle-agent.html",
  styleUrl: "./moodle-agent.scss",
})
export class MoodleAgent implements OnInit, OnDestroy {
  @Input() page = "moodle";

  private destroy$ = new Subject<void>();
  private themeService = inject(ThemeService);
  isDarkTheme = true;

  ngOnInit() {
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkTheme = isDark;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
