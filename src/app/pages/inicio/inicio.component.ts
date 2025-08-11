import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, CarouselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  images = [
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop', alt: 'Bar y barra' },
    { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop', alt: 'Comedor moderno' },
    { src: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1600&auto=format&fit=crop', alt: 'Terraza con vista' },
    { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop', alt: 'Mesa servida' },
  ];
}
