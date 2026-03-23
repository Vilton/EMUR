// home-news.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';

interface Slide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush, // Otimização: Reduz verificações desnecessárias de mudança
})

/**
 * Component to render the news section on the home page
 * Instructions:
 * - Gerencia um carrossel com animações Ken Burns e transições fade.
 * - Autoplay controlado via evento animationend para sincronia com duração da animação.
 * - Inicia reproduzindo automaticamente (isPlaying = true).
 * - Direção de animação aleatória por slide para variedade.
 * - Otimizações: Usa trackBy para ngFor, estratégia OnPush para detecção de mudanças, loading="lazy" para imagens.
 */
export class HomeNewsComponent extends BaseComponent implements OnInit, OnDestroy {

  currentAnimation: string = ''; // Para animação aleatória
  previousSlide: number | null = null; // Rastreia o slide anterior para manter animação durante fade out

  private animations: string[] = [
    'top-left', 'top-right', 'bottom-left', 'bottom-right',
    'top', 'bottom', 'left', 'right' // Direções de pan para efeito Ken Burns
  ];

  slides: Slide[] = [
    {
      image: 'assets/dspace/images/emur/carrossel/01.svg',
      title: 'Retalhos da Cidade. Petrônio Cunha.',
      description: 'Recife: Retalhos da Cidade. Petrônio Cunha'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/02.svg',
      title: 'Entrada do Recife, Arrecifes.',
      description: 'Descrição do segundo slide.'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/03.svg',
      title: 'Bairros do Recife, Santo Antônio e São José.',
      description: 'Descrição do terceiro slide.'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/04.svg',
      title: 'Teatro Hermilo Borba Filho.',
      description: 'Descrição do terceiro slide.'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/05.svg',
      title: 'Forte de São João Batista do Brum.',
      description: 'Descrição do terceiro slide.'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/06.svg',
      title: 'Ponte da Boa Vista',
      description: 'Descrição do terceiro slide.'
    }
  ];

  currentSlide = 0;
  isPlaying = true; // Inicia com autoplay rodando

  ngOnInit(): void {
    this.randomizeAnimation(); // Define animação inicial para o primeiro slide
    // Força detecção de mudança para aplicar classes iniciais
    setTimeout(() => {
      this.currentSlide = 0;
    }, 0);
  }

  ngOnDestroy(): void {
    // Limpeza opcional, mantido para boas práticas
  }

  onAnimationEnd(): void {
    if (this.isPlaying) {
      this.next();
    }
  }

  next(): void {
    this.previousSlide = this.currentSlide; // Mantém o slide anterior para continuar animação durante fade
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.randomizeAnimation();
    // Remove a classe exiting após o tempo de fade (1s), permitindo reset enquanto invisível
    setTimeout(() => {
      this.previousSlide = null;
    }, 1000);
  }

  prev(): void {
    this.previousSlide = this.currentSlide;
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.randomizeAnimation();
    setTimeout(() => {
      this.previousSlide = null;
    }, 1000);
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      // Avança se a animação já terminou ao resumir
      if (!this.isAnimationRunning()) {
        this.next();
      }
    }
  }

  private randomizeAnimation(): void {
    const randomIndex = Math.floor(Math.random() * this.animations.length);
    this.currentAnimation = this.animations[randomIndex];
  }

  // Função auxiliar para verificar se animação está em execução (pode ser expandida com ViewChild se necessário)
  private isAnimationRunning(): boolean {
    return true; // Assumir em execução para simplicidade
  }

  // trackBy para otimizar ngFor, evitando re-renderizações desnecessárias
  trackBySlide(index: number, slide: Slide): string {
    return slide.image; // Usa caminho da imagem como identificador único
  }

}