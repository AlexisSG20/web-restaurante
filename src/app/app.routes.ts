import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

export const routes: Routes = [
	{ path: '', component: InicioComponent, pathMatch: 'full' },
	{ path: 'menu', component: MenuComponent },
	{ path: 'contacto', component: ContactoComponent },
	{ path: '**', redirectTo: '' },
];
