import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, CarouselComponent],
  templateUrl: './inicio.component.html'
})
export class InicioComponent {
  images = [
    { 
      src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop', 
      alt: 'Elegante restaurante con iluminación moderna' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop', 
      alt: 'Bar del restaurante con ambiente exclusivo' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1920&auto=format&fit=crop', 
      alt: 'Cena de alta gastronomía' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop', 
      alt: 'Platos gourmet presentados con elegancia' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop', 
      alt: 'Espacio interior moderno y acogedor' 
    }
  ];

  // Imagen para la sección "Nuestra Historia"
  chefImage = {
    src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop',
    alt: 'Chef profesional en uniforme cocinando con experiencia'
  };
}
