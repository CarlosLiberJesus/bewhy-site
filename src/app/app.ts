import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  computed,
  signal,
  effect,
  AfterViewInit,
} from '@angular/core';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface ContactData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  protected title = 'bewhy-site';

  // Theme management
  isDarkMode = signal(true);
  currentTheme = computed(() => (this.isDarkMode() ? 'dark' : 'light'));

  // Mobile menu
  mobileMenuOpen = signal(false);
  isMobile = signal(false);

  // Chat functionality
  chatMode = signal<'initial' | 'conversation'>('initial');
  messages = signal<ChatMessage[]>([]);
  currentMessage = signal('');
  isTyping = signal(false);

  // Services carousel
  currentServiceIndex = signal(0);
  services: Service[] = [
    {
      icon: '🤖',
      title: 'AI Agents',
      description: 'Agentes inteligentes personalizados para automatizar processos',
      features: [
        'Processamento de linguagem natural',
        'Automação de tarefas',
        'Integração com sistemas existentes',
        'Aprendizado contínuo',
      ],
    },
    {
      icon: '💻',
      title: 'Desenvolvimento Web',
      description: 'Aplicações web modernas e responsivas',
      features: [
        'Angular, React, Vue.js',
        'Design responsivo',
        'Performance otimizada',
        'SEO friendly',
      ],
    },
    {
      icon: '📱',
      title: 'Apps Mobile',
      description: 'Aplicações móveis nativas e híbridas',
      features: [
        'iOS e Android',
        'React Native / Flutter',
        'UI/UX intuitiva',
        'Integração com APIs',
      ],
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Soluções em nuvem escaláveis e seguras',
      features: [
        'AWS, Azure, Google Cloud',
        'Microserviços',
        'DevOps e CI/CD',
        'Monitoramento 24/7',
      ],
    },
  ];

  // Contact form
  contactData = signal<ContactData>({
    name: '',
    email: '',
    message: '',
  });
  isSubmitting = signal(false);

  // Theme colors mapping
  private themeColors = {
    dark: {
      primary: '#210810',
      secondary: '#E8E3E1',
      accent: '#A75A7B',
      neutral: '#4A4A4A',
      gold: '#D4C2A8',
    },
    light: {
      primary: '#E8E3E1',
      secondary: '#210810',
      accent: '#A75A7B',
      neutral: '#4A4A4A',
      gold: '#D4C2A8',
    },
  };

  constructor() {
    // Theme effect
    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDarkMode());
    });

    // Auto-scroll chat effect
    effect(() => {
      if (this.messages().length > 0) {
        setTimeout(() => this.scrollChatToBottom(), 100);
      }
    });
  }

  ngOnInit() {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    }
  }

  ngAfterViewInit() {
    // Initialize smooth scrolling
    this.initializeSmoothScroll();
  }

  // Theme methods
  toggleTheme() {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  getThemeColor(colorKey: keyof typeof this.themeColors.dark): string {
    return this.themeColors[this.currentTheme()][colorKey];
  }

  // Mobile methods
  checkMobile() {
    this.isMobile.set(window.innerWidth < 768);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  // Navigation methods
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    this.mobileMenuOpen.set(false);
  }

  private initializeSmoothScroll() {
    // Add smooth scroll behavior to snap container
    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer) {
      snapContainer.addEventListener('wheel', (e) => {
        if (!this.isMobile()) {
          e.preventDefault();
          const delta = e.deltaY;
          const scrollAmount = window.innerHeight;

          if (delta > 0) {
            // Scroll down
            snapContainer.scrollBy({
              top: scrollAmount,
              behavior: 'smooth',
            });
          } else {
            // Scroll up
            snapContainer.scrollBy({
              top: -scrollAmount,
              behavior: 'smooth',
            });
          }
        }
      });
    }
  }

  // Chat methods
  startChat() {
    if (!this.currentMessage().trim()) return;

    const userMessage: ChatMessage = {
      text: this.currentMessage(),
      isUser: true,
      timestamp: new Date(),
    };

    this.messages.update((messages) => [...messages, userMessage]);
    this.chatMode.set('conversation');

    // Simulate AI response
    this.simulateAIResponse();
    this.currentMessage.set('');
  }

  sendMessage() {
    if (!this.currentMessage().trim() || this.isTyping()) return;

    const userMessage: ChatMessage = {
      text: this.currentMessage(),
      isUser: true,
      timestamp: new Date(),
    };

    this.messages.update((messages) => [...messages, userMessage]);
    this.simulateAIResponse();
    this.currentMessage.set('');
  }

  private simulateAIResponse() {
    this.isTyping.set(true);

    setTimeout(() => {
      const responses = [
        'Interessante! Conte-me mais sobre os detalhes específicos do seu projeto.',
        'Posso ajudar com isso. Que tipo de funcionalidades você tem em mente?',
        'Excelente ideia! Vamos explorar as melhores tecnologias para implementar isso.',
        'Entendo sua necessidade. Que tal discutirmos o cronograma e orçamento?',
        'Perfeito! Posso criar uma proposta personalizada para seu projeto.',
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: ChatMessage = {
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      this.messages.update((messages) => [...messages, aiMessage]);
      this.isTyping.set(false);
    }, 1500 + Math.random() * 1000);
  }

  private scrollChatToBottom() {
    if (this.chatContainer) {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  trackByMessage(index: number, message: ChatMessage): string {
    return `${message.timestamp.getTime()}-${message.isUser}`;
  }

  // Services carousel methods
  nextService() {
    this.currentServiceIndex.update((index) =>
      index === this.services.length - 1 ? 0 : index + 1,
    );
  }

  previousService() {
    this.currentServiceIndex.update((index) =>
      index === 0 ? this.services.length - 1 : index - 1,
    );
  }

  goToService(index: number) {
    this.currentServiceIndex.set(index);
  }

  // Contact form methods
  submitContact() {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', this.contactData());

      // Reset form
      this.contactData.set({
        name: '',
        email: '',
        message: '',
      });

      this.isSubmitting.set(false);

      // Show success message (you could add a toast notification here)
      alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
    }, 2000);
  }
}