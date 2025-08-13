import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  selectedCategory: string = 'todos';
  imageLoadErrors: Set<string> = new Set();
  
  // Mapeo exacto de nombres de platos a archivos de imagen
  private imageMap: { [key: string]: string } = {
    'Ceviche Clásico': 'ceviche_clasico.jpg',
    'Tiradito Nikkei': 'Tiradito_Nikkei.jpg',
    'Papa a la Huancaína': 'Papa_a_la_Huancaina.jpg',
    'Lomo Saltado': 'Lomo_Saltado.jpg',
    'Ají de Gallina': 'Aji_de_Gallina.jpg',
    'Anticuchos de Corazón': 'Anticuchos_de_Corazon.jpg',
    'Arroz con Pollo': 'Arroz_con_Pollo.jpg',
    'Suspiro a la Limeña': 'Suspiro_a_la_limena.jpg',
    'Mazamorra Morada': 'Mazamorra_Morada.jpg',
    'Picarones': 'Picarones.jpeg',
    'Pisco Sour': 'Pisco_Sour.jpg',
    'Chicha Morada': 'Chicha_Morada.jpg',
    'Inca Kola': 'Inca_Kola.jpg'
  };
  
  categories = [
    { id: 'todos', name: 'Todos', icon: '🍽️' },
    { id: 'entradas', name: 'Entradas', icon: '🥗' },
    { id: 'principales', name: 'Platos Principales', icon: '🍖' },
    { id: 'postres', name: 'Postres', icon: '🍰' },
    { id: 'bebidas', name: 'Bebidas', icon: '🥤' }
  ];

  menuItems: MenuItem[] = [
    // Entradas
    {
      id: 1,
      name: 'Ceviche Clásico',
      description: 'Pescado blanco fresco marinado en limón con cebolla roja, cilantro, ají limo y camote',
      price: 28.00,
      category: 'entradas',
      image: 'assets/images/menu/ceviche_clasico.jpg',
      ingredients: ['Pescado blanco', 'Limón', 'Cebolla roja', 'Cilantro', 'Ají limo', 'Camote'],
      popular: true,
      spicy: true
    },
    {
      id: 2,
      name: 'Tiradito Nikkei',
      description: 'Finas láminas de pescado con crema de ají amarillo y salsa nikkei',
      price: 32.00,
      category: 'entradas',
      image: 'assets/images/menu/Tiradito_Nikkei.jpg',
      ingredients: ['Pescado fresco', 'Ají amarillo', 'Salsa de soja', 'Jengibre', 'Aceite de sésamo'],
      popular: true,
      spicy: true
    },
    {
      id: 3,
      name: 'Papa a la Huancaína',
      description: 'Papas amarillas con cremosa salsa huancaína, aceitunas y huevo duro',
      price: 18.00,
      category: 'entradas',
      image: 'assets/images/menu/Papa_a_la_Huancaina.jpg',
      ingredients: ['Papa amarilla', 'Ají amarillo', 'Queso fresco', 'Leche', 'Aceitunas', 'Huevo'],
      spicy: true
    },

    // Platos Principales
    {
      id: 4,
      name: 'Lomo Saltado',
      description: 'Trozos de lomo salteados con cebolla, tomate, ají amarillo, acompañado de papas fritas y arroz',
      price: 42.00,
      category: 'principales',
      image: 'assets/images/menu/Lomo_Saltado.jpg',
      ingredients: ['Lomo de res', 'Cebolla roja', 'Tomate', 'Ají amarillo', 'Papas', 'Arroz', 'Culantro'],
      popular: true
    },
    {
      id: 5,
      name: 'Ají de Gallina',
      description: 'Pollo deshilachado en cremosa salsa de ají amarillo con pecanas y aceitunas',
      price: 38.00,
      category: 'principales',
      image: 'assets/images/menu/Aji_de_Gallina.jpg',
      ingredients: ['Pollo', 'Ají amarillo', 'Pan de molde', 'Pecanas', 'Aceitunas', 'Papa amarilla'],
      popular: true,
      spicy: true
    },
    {
      id: 6,
      name: 'Anticuchos de Corazón',
      description: 'Brochetas de corazón de res marinado en ají panca, acompañado de papas doradas',
      price: 35.00,
      category: 'principales',
      image: 'assets/images/menu/Anticuchos_de_Corazon.jpg',
      ingredients: ['Corazón de res', 'Ají panca', 'Vinagre', 'Comino', 'Papas', 'Choclo']
    },
    {
      id: 7,
      name: 'Arroz con Pollo',
      description: 'Arroz verde con pollo tierno, culantro, espinacas y arvejas',
      price: 34.00,
      category: 'principales',
      image: 'assets/images/menu/Arroz_con_Pollo.jpg',
      ingredients: ['Pollo', 'Arroz', 'Culantro', 'Espinaca', 'Arvejas', 'Chicha de jora']
    },

    // Postres
    {
      id: 8,
      name: 'Suspiro a la Limeña',
      description: 'Dulce manjar blanco cubierto con merengue de vino oporto y canela',
      price: 16.00,
      category: 'postres',
      image: 'assets/images/menu/Suspiro_a_la_limena.jpg',
      ingredients: ['Manjar blanco', 'Huevos', 'Vino oporto', 'Canela', 'Azúcar'],
      popular: true
    },
    {
      id: 9,
      name: 'Mazamorra Morada',
      description: 'Postre tradicional de maíz morado con frutas y especias aromáticas',
      price: 14.00,
      category: 'postres',
      image: 'assets/images/menu/Mazamorra_Morada.jpg',
      ingredients: ['Maíz morado', 'Piña', 'Membrillo', 'Canela', 'Clavo', 'Azúcar']
    },
    {
      id: 10,
      name: 'Picarones',
      description: 'Buñuelos de zapallo y camote bañados en miel de chancaca',
      price: 12.00,
      category: 'postres',
      image: 'assets/images/menu/Picarones.jpeg',
      ingredients: ['Zapallo', 'Camote', 'Harina', 'Chancaca', 'Anis', 'Clavo'],
      popular: true
    },

    // Bebidas
    {
      id: 11,
      name: 'Pisco Sour',
      description: 'El clásico cóctel peruano con pisco, limón, jarabe de goma, clara de huevo y amargo',
      price: 22.00,
      category: 'bebidas',
      image: 'assets/images/menu/Pisco_Sour.jpg',
      ingredients: ['Pisco peruano', 'Limón', 'Jarabe de goma', 'Clara de huevo', 'Amargo de angostura'],
      popular: true
    },
    {
      id: 12,
      name: 'Chicha Morada',
      description: 'Refrescante bebida de maíz morado con frutas y especias naturales',
      price: 8.00,
      category: 'bebidas',
      image: 'assets/images/menu/Chicha_Morada.jpg',
      ingredients: ['Maíz morado', 'Piña', 'Manzana', 'Canela', 'Clavo', 'Limón']
    },
    {
      id: 13,
      name: 'Inca Kola',
      description: 'La bebida dorada del Perú, sabor único y refrescante',
      price: 6.00,
      category: 'bebidas',
      image: 'assets/images/menu/Inca_Kola.jpg',
      ingredients: ['Sabor único peruano'],
      popular: true
    }
  ];

  get filteredItems(): MenuItem[] {
    if (this.selectedCategory === 'todos') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  getImagePath(itemName: string): string {
    const filename = this.imageMap[itemName];
    if (filename) {
      return `assets/images/menu/${filename}`;
    }
    // Fallback: generar nombre basado en el título
    return `assets/images/menu/${itemName.toLowerCase().replace(/\s+/g, '_').replace(/ñ/g, 'n')}.jpg`;
  }

  onImageLoad(event: any, item: MenuItem): void {
    console.log(`Image loaded successfully for ${item.name}: ${event.target.src}`);
  }

  onImageError(event: any, item: MenuItem): void {
    const originalSrc = event.target.src;
    console.log(`Error loading image for ${item.name}: ${originalSrc}`);
    
    // Marcar esta imagen como problemática
    this.imageLoadErrors.add(originalSrc);
    
    // Como último recurso, usar imagen de respaldo por categoría
    const fallbackImages: { [key: string]: string } = {
      'entradas': 'assets/images/menu/ceviche_clasico.jpg',
      'principales': 'assets/images/menu/Lomo_Saltado.jpg',
      'postres': 'assets/images/menu/Suspiro_a_la_limena.jpg',
      'bebidas': 'assets/images/menu/Pisco_Sour.jpg'
    };
    
    const fallbackUrl = fallbackImages[item.category];
    if (fallbackUrl && !this.imageLoadErrors.has(fallbackUrl)) {
      console.log(`Using category fallback: ${fallbackUrl}`);
      event.target.src = fallbackUrl;
    } else {
      // Mostrar placeholder
      this.showImagePlaceholder(event.target, item);
    }
  }

  private showImagePlaceholder(imgElement: HTMLImageElement, item: MenuItem): void {
    // Crear un elemento div para reemplazar la imagen
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = this.getCategoryEmoji(item.category);
    
    // Reemplazar la imagen con el placeholder
    if (imgElement.parentNode) {
      imgElement.parentNode.replaceChild(placeholder, imgElement);
    }
  }

  private getCategoryEmoji(category: string): string {
    const emojis: { [key: string]: string } = {
      'entradas': '🥗',
      'principales': '🍖',
      'postres': '🍰',
      'bebidas': '🥤'
    };
    return emojis[category] || '🍽️';
  }
}
