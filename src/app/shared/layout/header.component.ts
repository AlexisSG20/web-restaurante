import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private lastScrollTop = 0;
  private scrollThreshold = 10; // Umbral mínimo de scroll para activar el efecto
  private ticking = false;
  public isHeaderVisible = true;
  public currentRoute = '';

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngOnInit(): void {
    // Inicializar la posición del scroll
    this.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Suscribirse a los cambios de ruta para saber en qué página estamos
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
    
    // Establecer la ruta inicial
    this.currentRoute = this.router.url;
  }

  ngOnDestroy(): void {
    // Cleanup si es necesario
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.handleScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private handleScroll(): void {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDifference = Math.abs(currentScrollTop - this.lastScrollTop);

    // Solo procesar si el scroll es mayor al umbral
    if (scrollDifference < this.scrollThreshold) {
      return;
    }

    // Si estamos en la parte superior de la página, siempre mostrar el header
    if (currentScrollTop <= 100) {
      this.isHeaderVisible = true;
    } else {
      // Scroll hacia abajo - ocultar header
      if (currentScrollTop > this.lastScrollTop) {
        this.isHeaderVisible = false;
      }
      // Scroll hacia arriba - mostrar header
      else {
        this.isHeaderVisible = true;
      }
    }

    this.lastScrollTop = currentScrollTop;
  }

  // Función para manejar el clic en el logo o el enlace de inicio
  onHomeClick(event: Event): void {
    // Verificar si ya estamos en la página de inicio
    const isOnHomePage = this.currentRoute === '/' || 
                        this.currentRoute === '' || 
                        this.currentRoute === '/inicio';
    
    if (isOnHomePage) {
      event.preventDefault(); // Prevenir la navegación
      this.scrollToTop();
    }
    // Si no estamos en inicio, dejar que la navegación normal ocurra
  }

  // Función para hacer scroll suave hacia arriba
  private scrollToTop(): void {
    // Agregar una pequeña animación visual al logo
    const logoElement = this.elementRef.nativeElement.querySelector('.logo-icon');
    if (logoElement) {
      logoElement.style.transform = 'scale(0.9) rotate(10deg)';
      setTimeout(() => {
        logoElement.style.transform = '';
      }, 200);
    }

    // Scroll suave hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
