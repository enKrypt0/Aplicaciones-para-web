import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'characters', loadComponent: () => import('./pages/characters/characters')
    },
    {
        path: 'character/:id', loadComponent: () => import('./pages/character/character')
    },
    {
        path: '**', redirectTo: 'character'
    }
];
