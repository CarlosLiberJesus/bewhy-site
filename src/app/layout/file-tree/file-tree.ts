import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  LucideAngularModule,
  Folder,
  FolderOpen,
  FileText,
  FileCode,
  Settings,
  ChevronRight,
  ChevronDown,
} from "lucide-angular";

interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
}

@Component({
  selector: "app-file-tree",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./file-tree.html",
  styleUrl: "./file-tree.scss",
})
export class FileTree {
  @Input() activeFile = "";
  @Input() isDarkTheme = true;
  @Output() fileSelected = new EventEmitter<string>();

  expandedFolders = new Set(["src", "src/app", "src/app/components"]);

  readonly FolderIcon = Folder;
  readonly FolderOpenIcon = FolderOpen;
  readonly FileTextIcon = FileText;
  readonly FileCodeIcon = FileCode;
  readonly SettingsIcon = Settings;
  readonly ChevronRightIcon = ChevronRight;
  readonly ChevronDownIcon = ChevronDown;

  fileStructure: FileNode[] = [
    {
      name: "src",
      type: "folder",
      path: "src",
      children: [
        {
          name: "app",
          type: "folder",
          path: "src/app",
          children: [
            {
              name: "components",
              type: "folder",
              path: "src/app/components",
              children: [
                {
                  name: "file-tree",
                  type: "folder",
                  path: "src/app/components/file-tree",
                },
                {
                  name: "tab-bar",
                  type: "folder",
                  path: "src/app/components/tab-bar",
                },
                {
                  name: "editor-area",
                  type: "folder",
                  path: "src/app/components/editor-area",
                },
                {
                  name: "sidebar-footer",
                  type: "folder",
                  path: "src/app/components/sidebar-footer",
                },
              ],
            },
            {
              name: "app.component.ts",
              type: "file",
              path: "src/app/app.component.ts",
            },
            {
              name: "app.component.html",
              type: "file",
              path: "src/app/app.component.html",
            },
            {
              name: "app.component.css",
              type: "file",
              path: "src/app/app.component.css",
            },
          ],
        },
        { name: "main.ts", type: "file", path: "src/main.ts" },
        { name: "styles.css", type: "file", path: "src/styles.css" },
        { name: "index.html", type: "file", path: "src/index.html" },
      ],
    },
    { name: "package.json", type: "file", path: "package.json" },
    { name: "angular.json", type: "file", path: "angular.json" },
    { name: "tsconfig.json", type: "file", path: "tsconfig.json" },
    { name: "tailwind.config.js", type: "file", path: "tailwind.config.js" },
    { name: "README.md", type: "file", path: "README.md" },
  ];

  isExpanded(path: string): boolean {
    return this.expandedFolders.has(path);
  }

  getFileIcon(fileName: string, type: string) {
    if (type === "folder") {
      return this.isExpanded(fileName) ? this.FolderOpenIcon : this.FolderIcon;
    }

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

  getIconClass(fileName: string, type: string): string {
    if (type === "folder") {
      return "text-yellow-500";
    }

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

  getNodeClasses(node: FileNode): string {
    const baseClasses =
      "flex items-center py-1 px-2 cursor-pointer transition-colors";
    const hoverClasses = this.isDarkTheme
      ? "hover:bg-gray-900"
      : "hover:bg-gray-100";
    const activeClasses =
      this.activeFile === node.path
        ? this.isDarkTheme
          ? "bg-gray-800 border-r-2 border-yellow-500"
          : "bg-gray-200 border-r-2 border-yellow-500"
        : "";

    return `${baseClasses} ${hoverClasses} ${activeClasses}`;
  }

  getTextClasses(node: FileNode): string {
    const baseClasses = "text-sm font-mono";
    const activeClasses =
      this.activeFile === node.path ? "text-yellow-500 font-medium" : "";
    const themeClasses = this.isDarkTheme ? "text-gray-300" : "text-gray-700";

    return `${baseClasses} ${activeClasses || themeClasses}`;
  }

  handleNodeClick(node: FileNode) {
    if (node.type === "folder") {
      this.toggleFolder(node.path);
    } else {
      this.fileSelected.emit(node.path);
    }
  }

  private toggleFolder(path: string) {
    if (this.expandedFolders.has(path)) {
      this.expandedFolders.delete(path);
    } else {
      this.expandedFolders.add(path);
    }
  }
}
