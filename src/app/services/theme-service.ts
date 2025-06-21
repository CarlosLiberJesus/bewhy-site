import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private themeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  theme$ = this.themeSubject.asObservable();

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem("ide-theme");
    return saved ? saved === "dark" : true;
  }

  setDarkTheme(isDark: boolean) {
    this.themeSubject.next(isDark);
    localStorage.setItem("ide-theme", isDark ? "dark" : "light");
  }
}
