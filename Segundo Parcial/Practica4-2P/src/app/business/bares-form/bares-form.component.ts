import { Component, OnInit, NgModule } from '@angular/core';
import { BaresService } from '../../services/bares.service';
import { Bares } from '../../models/bares';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-bares',
  templateUrl: './bares-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  styleUrls: ['./bares-form.component.css']
})
export default class BaresComponent implements OnInit {
  bares: Bares[] = [];
  cargando = true;
  modoEdicion = false;
  barSeleccionado: Bares | null = null;

  nuevoBar: Omit<Bares, 'id'> = {
    nombre: '',
    direccion: '',
    foto_url: '',
    horario: '',
    cerrado: false
  };

  constructor(private baresService: BaresService) {}

  ngOnInit(): void {
    this.baresService.obtenerBares().subscribe(b => {
      this.bares = b;
      this.cargando = false;
    });
  }

  agregarBar(): void {
    const barCreado = this.baresService.agregarBares(this.nuevoBar);
    this.resetFormulario();
  }

  editarBar(bar: Bares): void {
    this.barSeleccionado = bar;
    this.nuevoBar = { ...bar }; // sin el ID
    this.modoEdicion = true;
  }

  actualizarBar(): void {
    if (this.barSeleccionado) {
      this.baresService.actualizarBares(this.barSeleccionado.id, this.nuevoBar);
      this.resetFormulario();
    }
  }

  eliminarBar(id: number): void {
    this.baresService.eliminarBares(id);
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevoBar = {
      nombre: '',
      direccion: '',
      foto_url: '',
      horario: '',
      cerrado: false
    };
    this.modoEdicion = false;
    this.barSeleccionado = null;
  }
}
