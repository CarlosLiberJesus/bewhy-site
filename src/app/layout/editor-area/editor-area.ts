import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  LucideAngularModule,
  FileCode,
  FileText,
  Settings,
} from "lucide-angular";

@Component({
  selector: "app-layout-editor-area",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./editor-area.html",
  styleUrl: "./editor-area.scss",
})
export class LayoutEditorArea {
  @Input() activeFile = "";
  @Input() isDarkTheme = true;

  readonly FileCodeIcon = FileCode;
  readonly FileTextIcon = FileText;
  readonly SettingsIcon = Settings;

  private fileContents: Record<string, string> = {
    "src/app/app.component.ts": `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTreeComponent } from './components/file-tree/file-tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileTreeComponent],
  template: \`
    <div class="h-screen bg-black text-white">
      <!-- Angular IDE Interface Implementation -->
    </div>
  \`
})
export class AppComponent implements OnInit {
  sidebarOpen = false;
  activeFile = 'src/app/app.component.ts';
  isDarkTheme = true;

  ngOnInit() {
    // Component initialization
  }
}`,
    "package.json": `{
  "name": "angular-ide-interface",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build"
  },
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0",
    "lucide-angular": "^0.344.0"
  },
  "devDependencies": {
    "@angular/cli": "^17.0.0",
    "tailwindcss": "^3.4.1",
    "typescript": "~5.2.0"
  }
}`,
    "README.md": `# Angular IDE-Inspired Interface

A professional IDE-inspired web interface built with Angular and Tailwind CSS.

## Features

- **File Tree Explorer**: Navigate through your project structure
- **Tab-based Interface**: Open multiple files with tab management
- **Theme Switcher**: Toggle between dark and light themes
- **Auth Avatar**: Placeholder for user authentication
- **Mobile Responsive**: Collapsible sidebar for mobile devices
- **Angular Architecture**: Component-based structure with standalone components

## Technology Stack

- Angular 17
- TypeScript
- Tailwind CSS
- Lucide Angular Icons

## Getting Started

\`\`\`bash
npm install
ng serve
\`\`\`

## Design Principles

- Sharp, angular design (no rounded corners)
- Theme-aware interface (dark/light mode)
- Production-ready interface
- Clean, minimal aesthetic
`,
  };

  get fileName(): string {
    return this.activeFile.split("/").pop() || this.activeFile;
  }

  get formattedContent(): string[] {
    const content =
      this.fileContents[this.activeFile] || "// File content not available";
    return content.split("\n");
  }

  getHeaderClasses(): string {
    const baseClasses =
      "border-b border-opacity-20 px-4 py-2 flex items-center";
    const themeClasses = this.isDarkTheme
      ? "bg-gray-900 border-gray-800"
      : "bg-gray-50 border-gray-300";
    return `${baseClasses} ${themeClasses}`;
  }

  getHeaderTextClasses(): string {
    const baseClasses = "text-sm font-mono";
    const themeClasses = this.isDarkTheme ? "text-gray-300" : "text-gray-700";
    return `${baseClasses} ${themeClasses}`;
  }

  getLineNumberClasses(): string {
    const baseClasses = "w-12 text-right pr-4 text-sm font-mono select-none";
    const themeClasses = this.isDarkTheme ? "text-gray-600" : "text-gray-400";
    return `${baseClasses} ${themeClasses}`;
  }

  getContentClasses(): string {
    const baseClasses = "flex-1 text-sm font-mono whitespace-pre";
    const themeClasses = this.isDarkTheme ? "text-gray-300" : "text-gray-700";
    return `${baseClasses} ${themeClasses}`;
  }

  getFileIcon(fileName: string) {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "ts":
      case "js":
      case "jsx":
        return this.FileCodeIcon;
      case "json":
        return this.SettingsIcon;
      case "md":
        return this.FileTextIcon;
      case "css":
        return this.FileCodeIcon;
      default:
        return this.FileTextIcon;
    }
  }

  getIconClass(fileName: string): string {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "ts":
      case "js":
      case "jsx":
        return "text-blue-400";
      case "json":
        return "text-green-400";
      case "md":
        return this.isDarkTheme ? "text-gray-400" : "text-gray-600";
      case "css":
        return "text-pink-400";
      default:
        return this.isDarkTheme ? "text-gray-400" : "text-gray-600";
    }
  }
}
