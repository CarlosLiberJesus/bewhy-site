import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Menu, X } from "lucide-angular";
import { LayoutFileTree } from "./layout/file-tree/file-tree";
import { LayoutSidebarFooter } from "./layout/sidebar-footer/sidebar-footer";
import { LayoutTabBar } from "./layout/tab-bar/tab-bar";
import { RouterOutlet } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    CommonModule,
    LucideAngularModule,
    LayoutFileTree,
    LayoutTabBar,
    LayoutSidebarFooter,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  sidebarOpen = false;
  activeFile = "/projects/moodle-agent/moodle-chat";
  openTabs = ["/projects/moodle-agent/moodle-chat"];
  isDarkTheme = true;

  readonly MenuIcon = Menu;
  readonly XIcon = X;

  constructor(private router: Router) {}

  get themeClass(): string {
    return this.isDarkTheme ? "bg-black text-white" : "bg-white text-black";
  }

  get sidebarClasses(): string {
    const baseClasses =
      "fixed md:relative z-50 md:z-0 w-80 h-full transition-transform duration-300 ease-in-out border-r border-opacity-20";
    const themeClasses = this.isDarkTheme
      ? "bg-black border-gray-800"
      : "bg-white border-gray-300";
    const transformClasses = this.sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full md:translate-x-0";

    return `${baseClasses} ${themeClasses} ${transformClasses}`;
  }

  ngOnInit() {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("ide-theme");
    if (savedTheme) {
      this.isDarkTheme = savedTheme === "dark";
    }

    // Listen to route changes to update active file
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeFile = event.url;
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
      const newActiveTab = this.openTabs[this.openTabs.length - 1];
      this.setActiveFile(newActiveTab);
    } else if (this.openTabs.length === 0) {
      // Navigate to 404 when no tabs are open
      this.router.navigate(["/404"]);
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem("ide-theme", this.isDarkTheme ? "dark" : "light");
  }
}