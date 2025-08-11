import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';

type CarouselImage = { src: string; alt?: string };

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements AfterViewInit {
  @Input() images: CarouselImage[] = [];
  @Input() fallbackSrc = 'https://picsum.photos/800/600?blur=2';

  @ViewChild('viewport', { static: true }) viewportRef!: ElementRef<HTMLDivElement>;

  current = 0;
  private step = 0; // tamaño de un slide (px)
  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;

  ngAfterViewInit() {
    // Calcular la distancia entre slides (ancho + gap) para el cálculo del índice
    queueMicrotask(() => this.computeStep());
    this.viewport.addEventListener('scroll', this.onScroll, { passive: true });
  // Eventos de arrastre con mouse/puntero
  this.viewport.addEventListener('pointerdown', this.onPointerDown);
  this.viewport.addEventListener('pointermove', this.onPointerMove);
  window.addEventListener('pointerup', this.onPointerUp);
  }

  ngOnDestroy() {
    this.viewport.removeEventListener('scroll', this.onScroll as any);
  this.viewport.removeEventListener('pointerdown', this.onPointerDown as any);
  this.viewport.removeEventListener('pointermove', this.onPointerMove as any);
  window.removeEventListener('pointerup', this.onPointerUp as any);
  }

  private get viewport() {
    return this.viewportRef.nativeElement;
  }

  private computeStep() {
    const slides = Array.from(this.viewport.children) as HTMLElement[];
    if (slides.length < 2) {
      this.step = this.viewport.clientWidth; // fallback
      return;
    }
    const a = slides[0].getBoundingClientRect();
    const b = slides[1].getBoundingClientRect();
    this.step = Math.round(b.left - a.left); // incluye gap
  }

  private onScroll = () => {
    if (!this.step) this.computeStep();
    const left = this.viewport.scrollLeft;
    const idx = Math.round(left / (this.step || 1));
    this.current = Math.max(0, Math.min(idx, (this.images?.length || 1) - 1));
  };

  // Arrastre con mouse/puntero
  private onPointerDown = (ev: PointerEvent) => {
    // Solo iniciar drag con botón primario
    if (ev.button !== 0) return;
    this.isDragging = true;
    this.startX = ev.clientX;
    this.startScrollLeft = this.viewport.scrollLeft;
    this.viewport.classList.add('grabbing');
    this.viewport.setPointerCapture(ev.pointerId);
  };

  private onPointerMove = (ev: PointerEvent) => {
    if (!this.isDragging) return;
    const dx = ev.clientX - this.startX;
    // Si el movimiento vertical es mayor que el horizontal, no capturar (permitir scroll vertical)
    const dy = Math.abs((ev as any).movementY ?? 0);
    if (Math.abs(dx) < dy) return;
    this.viewport.scrollLeft = this.startScrollLeft - dx;
  };

  private onPointerUp = (ev: PointerEvent) => {
    if (!this.isDragging) return;
    this.isDragging = false;
    try { this.viewport.releasePointerCapture(ev.pointerId); } catch {}
    this.viewport.classList.remove('grabbing');
  };

  next() {
    if (!this.step) this.computeStep();
    const nextLeft = this.viewport.scrollLeft + (this.step || this.viewport.clientWidth);
    this.viewport.scrollTo({ left: nextLeft, behavior: 'smooth' });
  }

  prev() {
    if (!this.step) this.computeStep();
    const prevLeft = this.viewport.scrollLeft - (this.step || this.viewport.clientWidth);
    this.viewport.scrollTo({ left: prevLeft, behavior: 'smooth' });
  }

  onImgError(i: number) {
    const img = this.images[i];
    if (!img) return;
    // Evitar loops si el fallback también falla
    if (img.src === this.fallbackSrc) return;
    this.images[i] = { ...img, src: this.fallbackSrc };
  }
}
