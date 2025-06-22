import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemMessage, SystemMessageType } from "./system-message.model";

@Injectable({
  providedIn: "root",
})
export class SystemMessageService {
  private messagesSubject = new BehaviorSubject<SystemMessage[]>([]);
  messages$: Observable<SystemMessage[]> = this.messagesSubject.asObservable();

  private generateId(): string {
    return (
      "_" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
    );
  }

  addMessage(message: Omit<SystemMessage, "id">): SystemMessage {
    const newMessage: SystemMessage = {
      ...message,
      id: this.generateId(),
      closable: message.closable === undefined ? true : message.closable,
    };
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, newMessage]);

    if (message.duration) {
      setTimeout(() => {
        this.removeMessage(newMessage.id);
      }, message.duration);
    }
    return newMessage;
  }

  removeMessage(id: string): void {
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next(currentMessages.filter((msg) => msg.id !== id));
  }

  getMessages(): Observable<SystemMessage[]> {
    return this.messages$;
  }

  // Convenience methods
  success(text: string, duration?: number, closable = true): SystemMessage {
    return this.addMessage({
      type: SystemMessageType.Success,
      text,
      closable,
      duration,
    });
  }

  warning(text: string, duration?: number, closable = true): SystemMessage {
    return this.addMessage({
      type: SystemMessageType.Warning,
      text,
      closable,
      duration,
    });
  }

  info(text: string, duration?: number, closable = true): SystemMessage {
    return this.addMessage({
      type: SystemMessageType.Info,
      text,
      closable,
      duration,
    });
  }

  error(text: string, duration?: number, closable = true): SystemMessage {
    return this.addMessage({
      type: SystemMessageType.Error,
      text,
      closable,
      duration,
    });
  }

  cookie(
    text: string,
    link: string,
    linkText: string,
    buttonText: string,
    onButtonClickCallback: (message: SystemMessage) => void,
  ): SystemMessage {
    const messageData: Omit<SystemMessage, "id"> = {
      type: SystemMessageType.Cookie,
      text,
      link,
      linkText,
      buttonText,
      closable: false, // Cookie messages are typically not closable by a generic 'x'
      onButtonClick: (message: SystemMessage) => {
        // Wrapped to ensure service context if needed
        onButtonClickCallback(message);
        // Optionally, remove the message after click, or let the callback handle it
        // this.removeMessage(message.id);
      },
    };
    return this.addMessage(messageData);
  }

  clearAll(): void {
    this.messagesSubject.next([]);
  }
}
