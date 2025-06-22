import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Subscription } from "rxjs";
import { LucideAngularModule, X } from "lucide-angular";

import {
  SystemMessage,
  SystemMessageType,
} from "../../services/system-message.model";
import { SystemMessageService } from "../../services/system-message-service";

@Component({
  selector: "app-system-messages",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./system-messages.html",
  styleUrl: "./system-messages.scss",
  animations: [
    trigger("messageState", [
      state(
        "void",
        style({
          opacity: 0,
          transform: "translateY(-20px)",
          height: "0px",
          marginTop: "0px",
          marginBottom: "0px",
          paddingTop: "0px",
          paddingBottom: "0px",
        }),
      ),
      state(
        "*",
        style({
          opacity: 1,
          transform: "translateY(0)",
          height: "*",
          marginTop: "*", // Rely on actual margin from CSS
          marginBottom: "*", // Rely on actual margin from CSS
          paddingTop: "*", // Rely on actual padding from CSS
          paddingBottom: "*", // Rely on actual padding from CSS
        }),
      ),
      transition("void <=> *", [animate("300ms ease-in-out")]),
    ]),
  ],
})
export class SystemMessages implements OnInit, OnDestroy {
  @Output() cookiesForward = new EventEmitter<string>();

  messages: SystemMessage[] = [];
  SystemMessageType = SystemMessageType; // To use enum in template
  readonly CloseIcon = X;

  private messageService = inject(SystemMessageService);
  private subscription!: Subscription;

  trackById(index: number, message: SystemMessage): string {
    return message.id;
  }

  ngOnInit(): void {
    this.subscription = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeMessage(messageId: string): void {
    this.messageService.removeMessage(messageId);
  }

  handleButtonClick(message: SystemMessage): void {
    if (message.onButtonClick) {
      message.onButtonClick(message);
    }
  }

  handleLinkClick(link: string): void {
    if (link) {
      this.cookiesForward.emit(link);
    }
  }

  // Helper to get CSS classes based on message type
  getMessageClasses(messageType: SystemMessageType): string {
    switch (messageType) {
      case SystemMessageType.Success:
        return "bg-green-100 border-green-500 text-green-700";
      case SystemMessageType.Warning:
        return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case SystemMessageType.Error:
        return "bg-red-100 border-red-500 text-red-700";
      case SystemMessageType.Info:
        return "bg-blue-100 border-blue-500 text-blue-700";
      case SystemMessageType.Cookie:
        return "bg-slate-100 border-slate-500 text-slate-700 dark:bg-slate-700 dark:border-slate-400 dark:text-slate-200"; // Special styling for cookie
      default:
        return "bg-gray-100 border-gray-500 text-gray-700";
    }
  }

  getIconClasses(messageType: SystemMessageType): string {
    switch (messageType) {
      case SystemMessageType.Success:
        return "text-green-500";
      case SystemMessageType.Warning:
        return "text-yellow-500";
      case SystemMessageType.Error:
        return "text-red-500";
      case SystemMessageType.Info:
        return "text-blue-500";
      case SystemMessageType.Cookie:
        return "text-slate-500 dark:text-slate-400";
      default:
        return "text-gray-500";
    }
  }
}
