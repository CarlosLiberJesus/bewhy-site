import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Menu, X } from "lucide-angular";
import { LayoutEditorArea } from "./layout/editor-area/editor-area";
import { LayoutFileTree } from "./layout/file-tree/file-tree";
import { LayoutSidebarFooter } from "./layout/sidebar-footer/sidebar-footer";
import { LayoutTabBar } from "./layout/tab-bar/tab-bar";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    CommonModule,
    LucideAngularModule,
    LayoutFileTree,
    LayoutTabBar,
    LayoutEditorArea,
    LayoutSidebarFooter,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  sidebarOpen = false;
  activeFile = "src/app/app.component.ts";
  openTabs = ["src/app/app.component.ts", "package.json", "README.md"];
  isDarkTheme = true;

  readonly MenuIcon = Menu;
  readonly XIcon = X;

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
  }

  handleTabClose(path: string) {
    this.openTabs = this.openTabs.filter((tab) => tab !== path);
    if (this.activeFile === path && this.openTabs.length > 0) {
      this.activeFile = this.openTabs[this.openTabs.length - 1];
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem("ide-theme", this.isDarkTheme ? "dark" : "light");
  }
}
