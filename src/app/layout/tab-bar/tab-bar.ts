import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  LucideAngularModule,
  X,
  FileText,
  FileCode,
  MessageCircle,
  Link,
  Server,
  AlertTriangle,
} from "lucide-angular/src/icons";

@Component({
  selector: "app-layout-tab-bar",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./tab-bar.html",
  styleUrl: "./tab-bar.scss",
})
export class LayoutTabBar {
  @Input() tabs: string[] = [];
  @Input() activeTab = "";
  @Input() isDarkTheme = true;
  @Output() tabSelected = new EventEmitter<string>();
  @Output() tabClosed = new EventEmitter<string>();

  readonly XIcon = X;
  readonly FileTextIcon = FileText;
  readonly FileCodeIcon = FileCode;
  readonly MessageCircleIcon = MessageCircle;
  readonly LinkIcon = Link;
  readonly ServerIcon = Server;
  readonly AlertTriangleIcon = AlertTriangle;

  getTabBarClasses(): string {
    const baseClasses = "border-b flex overflow-x-auto";
    const themeClasses = this.isDarkTheme
      ? "bg-black border-gray-800"
      : "bg-white border-gray-300";
    return `${baseClasses} ${themeClasses}`;
  }

  getTabClasses(tab: string): string {
    const baseClasses = "flex items-center min-w-0 border-r group";
    const borderClasses = this.isDarkTheme
      ? "border-gray-800"
      : "border-gray-300";
    const activeClasses =
      this.activeTab === tab
        ? this.isDarkTheme
          ? "bg-gray-900 border-b-2 border-yellow-500"
          : "bg-gray-100 border-b-2 border-yellow-500"
        : this.isDarkTheme
          ? "hover:bg-gray-900"
          : "hover:bg-gray-100";

    return `${baseClasses} ${borderClasses} ${activeClasses}`;
  }

  getTabTextClasses(tab: string): string {
    const baseClasses = "text-sm font-mono truncate";
    const activeClasses = this.activeTab === tab ? "text-yellow-500" : "";
    const themeClasses = this.isDarkTheme ? "text-gray-300" : "text-gray-700";

    return `${baseClasses} ${activeClasses || themeClasses}`;
  }

  getCloseButtonClasses(): string {
    const baseClasses = "p-2 transition-colors flex-shrink-0";
    const themeClasses = this.isDarkTheme
      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
      : "hover:bg-gray-200 text-gray-600 hover:text-black";

    return `${baseClasses} ${themeClasses}`;
  }

  getFileIcon(fileName: string) {
    const extension = this.getFileName(fileName)
      .split(".")
      .pop()
      ?.toLowerCase();
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
        return this.AlertTriangleIcon;
    }
  }

  getIconClass(fileName: string): string {
    const extension = this.getFileName(fileName)
      .split(".")
      .pop()
      ?.toLowerCase();

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
        return "text-yellow-500";
    }
  }

  getFileName(path: string): string {
    const last = path.split("/").pop() || path;
    const dotIndex = last.indexOf("-");
    if (last.startsWith("readme")) {
      return "README.md";
    }
    if (dotIndex > 0) {
      return last.slice(0, dotIndex) + "." + last.slice(dotIndex + 1);
    }
    return last;
  }
}
