import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

// Classe para partículas 3D
class Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotationX: number;
  rotationY: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  shape: number;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * 1000;

    // Velocidades caóticas
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.vz = (Math.random() - 0.5) * 0.3;

    // Rotação para efeito 3D
    this.rotationX = Math.random() * Math.PI * 2;
    this.rotationY = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;

    // Propriedades visuais
    this.size = Math.random() * 3 + 1;
    this.opacity = Math.random() * 0.8 + 0.2;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;

    // Tipo de forma (círculo, losango, triângulo)
    this.shape = Math.floor(Math.random() * 3);

    this.canvas = canvas;
  }

  update() {
    // Movimento caótico
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;

    // Rotação 3D
    this.rotationX += this.rotationSpeed;
    this.rotationY += this.rotationSpeed * 0.7;

    // Pulso
    this.pulse += this.pulseSpeed;

    // Wraparound nas bordas
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
    if (this.z < 0) this.z = 1000;
    if (this.z > 1000) this.z = 0;

    // Mudança ocasional de direção (caos)
    if (Math.random() < 0.002) {
      this.vx += (Math.random() - 0.5) * 0.1;
      this.vy += (Math.random() - 0.5) * 0.1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, currentColors: any) {
    // Perspectiva 3D
    const scale = 1000 / (1000 + this.z);
    const x = this.x * scale;
    const y = this.y * scale;
    const size = this.size * scale;

    // Opacidade baseada na profundidade e pulso
    const depthOpacity = scale * this.opacity;
    const pulseOpacity = depthOpacity * (0.5 + 0.5 * Math.sin(this.pulse));

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotationX);
    ctx.globalAlpha = pulseOpacity;

    // Escolha da cor baseada na profundidade
    let color;
    if (this.z < 300) {
      color = currentColors.accent;
    } else if (this.z < 600) {
      color = currentColors.gold;
    } else {
      color = currentColors.secondary;
    }

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;

    // Desenhar diferentes formas
    ctx.beginPath();

    switch (this.shape) {
      case 0: // Círculo
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 1: // Losango
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        ctx.fill();
        break;

      case 2: // Triângulo
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  }
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('animationCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  protected title = 'bewhy-site';
  public isDarkMode = true;

  private particles: Particle3D[] = [];
  private animationId?: number;

  // Cores do tema
  public colors = {
    dark: {
      primary: '#210810', // Ameixa
      secondary: '#E8E3E1', // Pérola
      accent: '#A75A7B', // Rosa ameixa
      neutral: '#4A4A4A', // Cinza escuro
      gold: '#D4C2A8', // Dourado suave
    },
    light: {
      primary: '#F5F5F5', // Um branco mais suave
      secondary: '#333333', // Um cinza escuro para texto
      accent: '#8E44AD', // Um roxo vibrante
      neutral: '#CCCCCC', // Um cinza claro para elementos neutros
      gold: '#B8860B', // Um dourado mais escuro e rico
    },
  };

  public get currentColors() {
    return this.colors[this.isDarkMode ? 'dark' : 'light'];
  }

  public setIsDarkMode(value: boolean) {
    this.isDarkMode = value;
  }

  ngAfterViewInit() {
    this.initializeAnimation();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resizeCanvas);
  }

  private initializeAnimation() {
    const canvas = this.canvasRef.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);

    // Inicializar partículas
    this.initializeParticles(canvas);

    // Começar animação
    this.animate(canvas, ctx);
  }

  private resizeCanvas = () => {
    const canvas = this.canvasRef.nativeElement;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  private initializeParticles(canvas: HTMLCanvasElement) {
    const numParticles = 60; // Quantidade otimizada
    this.particles = [];

    for (let i = 0; i < numParticles; i++) {
      this.particles.push(new Particle3D(canvas));
    }
  }

  // Desenhar conexões entre partículas
  private drawConnections(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) {
    const maxDistance = 150;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        // Calcular distância 3D
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = (p1.z - p2.z) * 0.1; // Reduzir impacto do Z
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          // Perspectiva para as linhas
          const scale1 = 1000 / (1000 + p1.z);
          const scale2 = 1000 / (1000 + p2.z);

          const x1 = p1.x * scale1;
          const y1 = p1.y * scale1;
          const x2 = p2.x * scale2;
          const y2 = p2.y * scale2;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);

          // Opacidade baseada na distância e profundidade
          const opacity =
            (1 - distance / maxDistance) * 0.3 * Math.min(scale1, scale2);

          ctx.strokeStyle = `${this.currentColors.neutral}${Math.floor(
            opacity * 255,
          )
            .toString(16)
            .padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Loop de animação
  private animate = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) => {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar partículas
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(ctx, this.currentColors);
    });

    // Desenhar conexões
    this.drawConnections(ctx, canvas);

    // Continuar animação
    this.animationId = requestAnimationFrame(() => this.animate(canvas, ctx));
  };
}
