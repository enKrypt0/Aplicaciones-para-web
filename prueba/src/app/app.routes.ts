import { Routes } from '@angular/router';
import { Personalizacion } from './components/personalizacion/personalizacion';
import { ProductosComponent } from './components/productos/productos';
import { CarritoComponent } from './components/carrito/carrito';

export const routes: Routes = [
  { path: '', redirectTo: '/personalizacion', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'personalizacion', component: Personalizacion },
  { path: '**', redirectTo: '/personalizacion' }
];
