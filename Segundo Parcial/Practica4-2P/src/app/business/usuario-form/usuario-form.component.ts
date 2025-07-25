import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service.service';
import { Iusuario } from '../../models/iusuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  imports: [CommonModule, FormsModule]
})
export default class UsuarioComponent implements OnInit {
  usuarios: Iusuario[] = [];
  cargando = true;
  modoEdicion = false;
  usuarioSeleccionado: Iusuario | null = null;

  nuevoUsuario: Omit<Iusuario, 'id'> = {
    nombre_usuario: '',
    email: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerusuarios().subscribe(u => {
      this.usuarios = u;
      this.cargando = false;
    });
  }

  agregarUsuario(): void {
    this.usuarioService.agregarUsuarios(this.nuevoUsuario);
    this.resetFormulario();
  }

  editarUsuario(usuario: Iusuario): void {
    this.usuarioSeleccionado = usuario;
    this.nuevoUsuario = { ...usuario };
    this.modoEdicion = true;
  }

  actualizarUsuario(): void {
    if (this.usuarioSeleccionado) {
      this.usuarioService.actualizarUsuarios(this.usuarioSeleccionado.id, this.nuevoUsuario);
      this.resetFormulario();
    }
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminarUsuario(id);
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevoUsuario = {
      nombre_usuario: '',
      email: '',
      telefono: '',
      direccion: '',
      fecha_nacimiento: ''
    };
    this.usuarioSeleccionado = null;
    this.modoEdicion = false;
  }
}
