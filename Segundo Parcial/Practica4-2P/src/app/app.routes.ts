import { Routes } from '@angular/router';
import LayoutComponent from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/layout/layout.component'),
        children: [
            {
               path: 'bebidas',
               loadComponent: () => import ('./business/bebidas-form/bebidas-form.component')
            },
            {
                path: 'bares',
                loadComponent: () => import('./business/bares-form/bares-form.component')
            },
            {
                path: 'usuarios',
                loadComponent: () => import('./business/usuario-form/usuario-form.component')
            },
            {
                path: '',
                redirectTo: 'bebidas',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo:'bebidas'
    }
    
];
