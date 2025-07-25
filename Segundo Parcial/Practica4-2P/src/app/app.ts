import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddBebidaFormComponent } from './components/AddBebidaForm';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, AddBebidaFormComponent],
  templateUrl: './app-simple.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Gestión de Bebidas - Práctica 4');
}
