import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header.component';
import { FooterComponent } from './shared/layout/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen">
      <app-header></app-header>
      <main class="w-full pt-16 md:pt-20">
        <router-outlet />
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class App {
  protected readonly title = signal('web-restaurante');
}
