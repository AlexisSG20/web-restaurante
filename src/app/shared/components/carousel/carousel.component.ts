import { AfterViewInit, Component, Input, OnInit, OnDestroy } from '@angular/core';

type CarouselImage = { 
  src: string; 
  alt?: string; 
  loaded?: boolean;
};

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() images: CarouselImage[] = [];
  @Input() fallbackSrc = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop';

  current = 0;
  private animationInProgress = false;
  isLoading = true;
  private keyboardListener?: (event: KeyboardEvent) => void;

  // Variables para el drag
  isDragging = false;
  private startX = 0;
  private currentX = 0;
  private dragThreshold = 50; // Píxeles mínimos para considerar un swipe

  ngOnInit() {
    // Resetear estado cuando se inicializa el componente
    this.current = 0;
    this.isLoading = true;
    this.animationInProgress = false;
    
    // Inicializar el estado de carga de las imágenes
    this.images.forEach(img => img.loaded = false);
    this.preloadImages();
  }

  ngAfterViewInit() {
    // Configurar eventos de teclado
    this.setupKeyboardEvents();
  }

  ngOnDestroy() {
    // Limpiar el event listener de teclado
    if (this.keyboardListener) {
      document.removeEventListener('keydown', this.keyboardListener);
    }
  }

  private preloadImages() {
    if (this.images.length === 0) {
      this.isLoading = false;
      return;
    }

    let loadedCount = 0;
    const totalImages = this.images.length;

    // Precargar la primera imagen con mayor prioridad
    this.preloadImage(0).then(() => {
      this.images[0].loaded = true;
      loadedCount++;
      
      // Si es la única imagen o ya todas están cargadas
      if (loadedCount === totalImages) {
        this.isLoading = false;
        return;
      }
      
      // Mostrar el carrusel tan pronto como la primera imagen esté lista
      this.isLoading = false;
      
      // Continuar cargando el resto de imágenes en segundo plano
      for (let i = 1; i < totalImages; i++) {
        this.preloadImage(i).then(() => {
          this.images[i].loaded = true;
        }).catch(() => {
          this.images[i].src = this.fallbackSrc;
          this.images[i].loaded = true;
        });
      }
    }).catch(() => {
      this.images[0].src = this.fallbackSrc;
      this.images[0].loaded = true;
      this.isLoading = false;
    });
  }

  private preloadImage(index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const imageElement = new Image();
      
      imageElement.onload = () => resolve();
      imageElement.onerror = () => reject();
      
      // Configurar crossorigin y referrerpolicy para mejor compatibilidad
      imageElement.crossOrigin = 'anonymous';
      imageElement.referrerPolicy = 'no-referrer';
      imageElement.src = this.images[index].src;
    });
  }

  private setupKeyboardEvents() {
    this.keyboardListener = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        this.prev();
      } else if (event.key === 'ArrowRight') {
        this.next();
      }
    };
    
    document.addEventListener('keydown', this.keyboardListener);
  }

  getPrevIndex(): number {
    return this.current === 0 ? this.images.length - 1 : this.current - 1;
  }

  getNextIndex(): number {
    return (this.current + 1) % this.images.length;
  }

  onImgError(index: number) {
    if (!this.images[index]) return;
    console.warn(`Error loading image at index ${index}`);
    this.images[index].src = this.fallbackSrc;
  }

  next() {
    if (this.animationInProgress) return;
    this.animationInProgress = true;
    
    this.current = (this.current + 1) % this.images.length;
    
    setTimeout(() => {
      this.animationInProgress = false;
    }, 600);
  }

  prev() {
    if (this.animationInProgress) return;
    this.animationInProgress = true;
    
    this.current = this.current === 0 ? this.images.length - 1 : this.current - 1;
    
    setTimeout(() => {
      this.animationInProgress = false;
    }, 600);
  }

  goToSlide(index: number) {
    if (this.animationInProgress || index === this.current) return;
    this.animationInProgress = true;
    
    this.current = Math.max(0, Math.min(index, this.images.length - 1));
    
    setTimeout(() => {
      this.animationInProgress = false;
    }, 600);
  }

  // Métodos para manejo de drag con mouse
  onDragStart(event: MouseEvent) {
    if (this.animationInProgress) return;
    
    this.isDragging = true;
    this.startX = event.clientX;
    this.currentX = event.clientX;
    
    // Prevenir selección de texto
    event.preventDefault();
    
    // Cambiar cursor
    document.body.style.cursor = 'grabbing';
  }

  onDragMove(event: MouseEvent) {
    if (!this.isDragging || this.animationInProgress) return;
    
    this.currentX = event.clientX;
    event.preventDefault();
  }

  onDragEnd(event: MouseEvent) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    document.body.style.cursor = '';
    
    const deltaX = this.currentX - this.startX;
    
    // Si el movimiento es mayor al threshold, navegar
    if (Math.abs(deltaX) > this.dragThreshold) {
      if (deltaX > 0) {
        // Arrastró hacia la derecha → imagen anterior
        this.prev();
      } else {
        // Arrastró hacia la izquierda → siguiente imagen
        this.next();
      }
    }
  }

  // Métodos para manejo de touch (dispositivos móviles)
  onTouchStart(event: TouchEvent) {
    if (this.animationInProgress) return;
    
    this.isDragging = true;
    const touch = event.touches[0];
    this.startX = touch.clientX;
    this.currentX = touch.clientX;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging || this.animationInProgress) return;
    
    const touch = event.touches[0];
    this.currentX = touch.clientX;
    
    // Prevenir scroll vertical si hay movimiento horizontal significativo
    const deltaX = Math.abs(this.currentX - this.startX);
    if (deltaX > 10) {
      event.preventDefault();
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    
    const deltaX = this.currentX - this.startX;
    
    // Si el movimiento es mayor al threshold, navegar
    if (Math.abs(deltaX) > this.dragThreshold) {
      if (deltaX > 0) {
        // Arrastró hacia la derecha → imagen anterior
        this.prev();
      } else {
        // Arrastró hacia la izquierda → siguiente imagen
        this.next();
      }
    }
  }
}
