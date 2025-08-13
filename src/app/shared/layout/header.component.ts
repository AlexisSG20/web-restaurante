import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private lastScrollTop = 0;
  private scrollThreshold = 10; // Umbral mínimo de scroll para activar el efecto
  private ticking = false;
  public isHeaderVisible = true;
  public currentRoute = '';
  public isMobileMenuOpen = false;

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
    // Asegurarse de limpiar las clases del body
    document.body.classList.remove('mobile-menu-open');
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

  @HostListener('window:resize')
  onResize(): void {
    // Cerrar el menú móvil cuando la ventana se redimensione a desktop
    if (this.isMobileMenuOpen && window.innerWidth >= 768) {
      this.closeMobileMenu();
    }
    // Limpiar las clases del body si estamos en desktop
    if (window.innerWidth >= 768) {
      document.body.classList.remove('mobile-menu-open');
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

  // Funciones para el menú móvil
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Menu toggled:', this.isMobileMenuOpen); // Debug
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    console.log('Menu closed'); // Debug
  }

  private updateBodyOverflow(): void {
    // Solo aplicar en dispositivos móviles
    if (window.innerWidth <= 768) {
      if (this.isMobileMenuOpen) {
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.classList.remove('mobile-menu-open');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isMobileMenuOpen) return;
    
    const target = event.target as HTMLElement;
    const headerElement = this.elementRef.nativeElement;
    
    // Cerrar el menú móvil si se hace clic fuera del header
    if (!headerElement.contains(target)) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
