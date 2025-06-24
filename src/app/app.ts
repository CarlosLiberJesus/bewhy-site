import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Subject, filter, takeUntil } from "rxjs";
import { LucideAngularModule, Menu, X } from "lucide-angular";
import { LayoutFileTree } from "./layout/file-tree/file-tree";
import { LayoutSidebarFooter } from "./layout/sidebar-footer/sidebar-footer";
import { LayoutTabBar } from "./layout/tab-bar/tab-bar";
import { SystemMessages } from "./layout/system-messages/system-messages";
import { ThemeService } from "./services/theme-service";
import { SystemMessage } from "./services/system-message.model";
import { SystemMessageService } from "./services/system-message-service";
import { MetaTagService } from "./services/meta-tag-service";

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
  activeFile: string;
  openTabs: string[];

  isDarkTheme = true;
  readonly MenuIcon = Menu;
  readonly XIcon = X;

  private initialPath: string;
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private systemMessageService = inject(SystemMessageService);
  private metaTagService = inject(MetaTagService);

  private readonly COOKIE_CONSENT_KEY = "cookieConsentAccepted";

  constructor() {
    // Pega o path da URL (sem barra inicial)
    const url = window.location.pathname.replace(/^\/+/, "");
    this.initialPath = url || "src/web-app/index-angular";
    this.activeFile = this.initialPath;
    this.openTabs = [
      "readme-md",
      this.initialPath !== "readme-md" ? this.initialPath : "",
    ].filter(Boolean) as string[];
  }

  get themeClass(): string {
    return this.isDarkTheme
      ? "bg-black text-gray-200"
      : "bg-white text-gray-700";
  }

  get sidebarClasses(): string {
    const baseClasses =
      "fixed md:relative z-50 md:z-0 w-80 h-full transition-transform duration-300 ease-in-out border-r";
    const themeClasses = this.isDarkTheme
      ? "bg-black border-gray-800"
      : "bg-white border-gray-200";
    const transformClasses = this.sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full md:translate-x-0";

    return `${baseClasses} ${themeClasses} ${transformClasses}`;
  }

  ngOnInit() {
    this.metaTagService.setDefaultTags();
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

    this.showCookieConsentBanner();
  }

  private showCookieConsentBanner(): void {
    try {
      if (localStorage.getItem(this.COOKIE_CONSENT_KEY) === "true") {
        return;
      }
    } catch (e) {
      // LocalStorage might be disabled or unavailable
      console.warn("Could not access localStorage for cookie consent:", e);
      // Decide if you want to show the banner anyway or not.
      // For this example, we'll proceed to show it if localStorage is inaccessible.
    }

    const consentMessageText = `Este site utiliza cookies para melhorar a sua experiência. Ao continuar a navegar está a consentir a sua utilização.`;
    const privacyPolicyLink = "public/politicas-md"; // Example link
    const linkText = "Saber mais";
    const buttonText = "Recusar";

    this.systemMessageService.cookie(
      consentMessageText,
      privacyPolicyLink,
      linkText,
      buttonText,
      (message: SystemMessage) => {
        try {
          localStorage.setItem(this.COOKIE_CONSENT_KEY, "true");
        } catch (e) {
          console.warn("Could not set localStorage for cookie consent:", e);
        }
        this.systemMessageService.removeMessage(message.id);
      },
    );
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
