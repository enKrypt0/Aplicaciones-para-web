export interface ICliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  IDireccion: {
    calle: string;
    ciudad: string;
    codigoPostal: string;
    pais: string;
  };
}