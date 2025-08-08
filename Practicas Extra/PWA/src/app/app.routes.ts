import { Routes } from '@angular/router';
import { Characters } from './pages/characters/characters';
import { Character } from './pages/character/character';

export const routes: Routes = [
    {path: '', redirectTo: '/characters', pathMatch: 'full'},
    {path: 'characters', component: Characters},
    {path: 'character/:id', component: Character},
];
