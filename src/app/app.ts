import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Subject } from "rxjs/internal/Subject";
import { filter } from "rxjs/operators";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { LucideAngularModule, Menu, X } from "lucide-angular";
import { LayoutFileTree } from "./layout/file-tree/file-tree";
import { LayoutSidebarFooter } from "./layout/sidebar-footer/sidebar-footer";
import { LayoutTabBar } from "./layout/tab-bar/tab-bar";
import { SystemMessages } from "./layout/system-messages/system-messages";
import { ThemeService } from "./services/theme-service";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    CommonModule,
    LucideAngularModule,
    LayoutFileTree,
    LayoutTabBar,
    SystemMessages,
    LayoutSidebarFooter,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit, OnDestroy {
  sidebarOpen = false;
  activeFile = "src/web-app/index-angular";
  openTabs = ["src/web-app/index-angular", "readme-md"];
  isDarkTheme = true;
  private destroy$ = new Subject<void>();
  readonly MenuIcon = Menu;
  readonly XIcon = X;

  private router = inject(Router);
  private themeService = inject(ThemeService);

  get themeClass(): string {
    return this.isDarkTheme ? "bg-black text-white" : "bg-white text-black";
  }

  get sidebarClasses(): string {
    const baseClasses =
      "fixed md:relative z-50 md:z-0 w-80 h-full transition-transform duration-300 ease-in-out border-r";
    const themeClasses = this.isDarkTheme
      ? "bg-black border-gray-800"
      : "bg-white border-gray-300";
    const transformClasses = this.sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full md:translate-x-0";

    return `${baseClasses} ${themeClasses} ${transformClasses}`;
  }

  ngOnInit() {
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkTheme = isDark;
        document.documentElement.classList.toggle("dark", isDark);
      });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: NavigationEnd) => {
        const normalized = event.url.startsWith("/")
          ? event.url.slice(1)
          : event.url;
        this.activeFile = normalized;
      });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  handleFileSelect(path: string) {
    this.setActiveFile(path);
    if (!this.openTabs.includes(path)) {
      this.openTabs = [...this.openTabs, path];
    }
    // Close sidebar on mobile after file selection
    if (window.innerWidth < 768) {
      this.closeSidebar();
    }
  }

  setActiveFile(path: string) {
    this.activeFile = path;
    this.router.navigate([path]);
  }

  handleTabClose(path: string) {
    this.openTabs = this.openTabs.filter((tab) => tab !== path);
    if (this.activeFile === path && this.openTabs.length > 0) {
      //fix: set the last opened tab as active
      const newActiveTab = this.openTabs[this.openTabs.length - 1];
      this.setActiveFile(newActiveTab);
    } else if (this.openTabs.length === 0) {
      // Navigate to 404 when no tabs are open
      this.router.navigate(["/404"]);
    }
  }

  toggleTheme() {
    this.themeService.setDarkTheme(!this.isDarkTheme);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
