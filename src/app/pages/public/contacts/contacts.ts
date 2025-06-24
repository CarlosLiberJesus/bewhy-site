import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import {
  LucideAngularModule,
  FileCode,
  Mail,
  User,
  MessageSquare,
  Send,
  RefreshCw,
} from "lucide-angular";
import { ThemeService } from "../../../services/theme-service";
import { SystemMessageService } from "../../../services/system-message-service";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: "app-contacts",
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: "./contacts.html",
  styleUrl: "./contacts.scss",
})
export class Contacts implements OnInit, OnDestroy {
  activeFile = "contact-form.interface.ts";
  isDarkTheme = true;

  readonly FileCodeIcon = FileCode;
  readonly MailIcon = Mail;
  readonly UserIcon = User;
  readonly MessageSquareIcon = MessageSquare;
  readonly SendIcon = Send;
  readonly RefreshCwIcon = RefreshCw;

  // Form data
  contactForm: ContactForm = {
    name: "",
    email: "",
    message: "",
  };

  private destroy$ = new Subject<void>();
  private themeService = inject(ThemeService);
  private systemMessage = inject(SystemMessageService);

  ngOnInit() {
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkTheme = isDark;
      });
  }

  // Código simplificado - gerado no HTML

  isFormValid(): boolean {
    return (
      this.contactForm.name.length >= 2 &&
      this.isEmailValid() &&
      this.contactForm.message.length >= 10
    );
  }

  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.contactForm.email);
  }

  canSubmit(): boolean {
    return this.isFormValid();
  }

  onSubmit() {
    this.systemMessage.error(
      "Funcionalidade de envio em desenvolvimento! Nenhum dado será enviado.",
      5000,
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
