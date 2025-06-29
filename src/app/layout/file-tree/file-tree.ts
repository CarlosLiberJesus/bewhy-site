import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  LucideAngularModule,
  Folder,
  FolderOpen,
  FileText,
  FileCode,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  Link,
  Server,
} from "lucide-angular/src/icons";

interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
}

@Component({
  selector: "app-layout-file-tree",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./file-tree.html",
  styleUrl: "./file-tree.scss",
})
export class LayoutFileTree {
  @Input() activeFile = "";
  @Input() isDarkTheme = true;
  @Output() fileSelected = new EventEmitter<string>();

  expandedFolders: Set<string>;

  constructor() {
    // Pega o path da URL (sem barra inicial)
    const url = window.location.pathname.replace(/^\/+/, "");
    // Exemplo: "src/ai-agent/moodle-agent/moodle-langchain"
    // Queremos ["src", "src/ai-agent", "src/ai-agent/moodle-agent"]
    const segments = url.split("/");
    const folders: string[] = [];
    for (let i = 1; i < segments.length; i++) {
      const folderPath = segments.slice(0, i).join("/");
      folders.push(folderPath);
    }
    // expande "src" se padrão
    // if (!folders.includes("src")) folders.unshift("src");
    this.expandedFolders = new Set(folders);
  }

  readonly FolderIcon = Folder;
  readonly FolderOpenIcon = FolderOpen;
  readonly FileTextIcon = FileText;
  readonly FileCodeIcon = FileCode;
  readonly MessageCircleIcon = MessageCircle;
  readonly ChevronRightIcon = ChevronRight;
  readonly ChevronDownIcon = ChevronDown;
  readonly LinkIcon = Link;
  readonly ServerIcon = Server;

  fileStructure: FileNode[] = [
    {
      name: "src",
      type: "folder",
      path: "src",
      children: [
        {
          name: "web-app",
          type: "folder",
          path: "src/web-app",
          children: [
            {
              name: "index.angular",
              type: "file",
              path: "src/web-app/index-angular",
            },
            {
              name: "laravel.php",
              type: "file",
              path: "src/web-app/laravel-php",
            },
          ],
        },
        {
          name: "ai-agent",
          type: "folder",
          path: "src/ai-agent",
          children: [
            {
              name: "moodle-agent",
              type: "folder",
              path: "src/ai-agent/moodle-agent",
              children: [
                {
                  name: "moodle.chat",
                  type: "file",
                  path: "src/ai-agent/moodle-agent/moodle-chat",
                },
                {
                  name: "moodle.langchain",
                  type: "file",
                  path: "src/ai-agent/moodle-agent/moodle-langchain",
                },
                {
                  name: "moodle.mcp",
                  type: "file",
                  path: "src/ai-agent/moodle-agent/moodle-mcp",
                },
              ],
            },
            { name: "site.bot", type: "file", path: "src/ai-agent/site-bot" },
          ],
        },
      ],
    },
    {
      name: "public",
      type: "folder",
      path: "public",
      children: [
        { name: "sobre.org", type: "file", path: "public/sobre-org" },
        { name: "contacte.nos", type: "file", path: "public/contacte-nos" },
      ],
    },
    { name: "README.md", type: "file", path: "readme-md" },
    { name: "site.xml", type: "file", path: "site-xml" },
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
      case "angular":
      case "php":
      case "xml":
        return this.FileCodeIcon;
      case "mcp":
        return this.ServerIcon;
      case "langchain":
        return this.LinkIcon;
      case "nos":
      case "bot":
      case "chat":
        return this.MessageCircleIcon;
      case "md":
      case "org":
        return this.FileTextIcon;
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
      case "angular":
      case "php":
      case "xml":
        return "text-blue-400";
      case "mcp":
        return "text-orange-500";
      case "langchain":
        return "text-purple-400";
      case "nos":
      case "bot":
      case "chat":
        return "text-green-400";
      case "md":
      case "org":
        return this.isDarkTheme ? "text-gray-400" : "text-gray-600";
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
