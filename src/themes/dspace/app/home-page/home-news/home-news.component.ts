import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
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
  imports: [CommonModule, RouterLink, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNewsComponent extends BaseComponent implements OnInit, OnDestroy {
  currentAnimation = '';
  previousSlide: number | null = null;

  private readonly animations = [
    'top-left', 'top-right', 'bottom-left', 'bottom-right',
    'top', 'bottom', 'left', 'right'
  ];

  slides: Slide[] = [
    {
      image: 'assets/dspace/images/emur/carrossel/RPA1.jpg',
      title: 'Ilha de Antônio Vaz',
      description: 'Recife: Ilha de Antônio Vaz'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/RPA1-2.jpg',
      title: 'Ilha de Antônio Vaz',
      description: 'Recife: Ilha de Antônio Vaz'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/RPA2.jpg',
      title: 'Bairro do Arruda',
      description: 'Recife: Arruda'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/RPA3.jpg',
      title: 'Morro da Conceição',
      description: 'Recife: Morro da Conceição'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/RPA4.jpg',
      title: 'Bairro da Várzea',
      description: 'Recife: Várzea'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/RPA5.jpg',
      title: 'Bairro do Jiquiá (Torre do Zeppelin)',
      description: 'Recife: Jiquiá (Torre do Zeppelin)'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/RPA6.jpg',
      title: 'Bairro de Boa Viagem',
      description: 'Recife: Boa Viagem'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/RPA6-1.jpg',
      title: 'Bairro de Brasília Teimosa',
      description: 'Recife: Brasília Teimosa'
    },
    {
      image: 'assets/dspace/images/emur/carrossel/RPA6-2.jpg',
      title: 'Bairro do Ibura (Morros da Zona Sul)',
      description: 'Recife: Ibura (Morros da Zona Sul)'
    }
  ];

  currentSlide = 0;
  isPlaying = true;

  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly slideDuration = 8000;
  private autoplayTimer: ReturnType<typeof setTimeout> | null = null;
  private fadeTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.randomizeAnimation();
    this.scheduleNextSlide();
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
    if (this.fadeTimer !== null) {
      clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  next(): void {
    this.changeSlide(1);
  }

  prev(): void {
    this.changeSlide(-1);
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.scheduleNextSlide();
    } else {
      this.clearAutoplay();
    }
    this.changeDetector.markForCheck();
  }

  private changeSlide(direction: number): void {
    this.clearAutoplay();
    if (this.slides.length < 2) {
      return;
    }
    if (this.fadeTimer !== null) {
      clearTimeout(this.fadeTimer);
    }
    this.previousSlide = this.currentSlide;
    this.currentSlide = (
      this.currentSlide + direction + this.slides.length
    ) % this.slides.length;
    this.randomizeAnimation();
    this.changeDetector.markForCheck();

    this.fadeTimer = setTimeout(() => {
      this.previousSlide = null;
      this.fadeTimer = null;
      this.changeDetector.markForCheck();
    }, 1000);
    this.scheduleNextSlide();
  }

  private scheduleNextSlide(): void {
    this.clearAutoplay();
    // No SSR o timer recursivo impede a renderizacao de terminar
    if (!isPlatformBrowser(this.platformId) || !this.isPlaying || this.slides.length < 2) {
      return;
    }
    this.autoplayTimer = setTimeout(() => {
      this.autoplayTimer = null;
      this.next();
    }, this.slideDuration);
  }

  private clearAutoplay(): void {
    if (this.autoplayTimer !== null) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private randomizeAnimation(): void {
    const index = Math.floor(Math.random() * this.animations.length);
    this.currentAnimation = this.animations[index];
  }

  trackBySlide(index: number, slide: Slide): string {
    return slide.image;
  }
}
