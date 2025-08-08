export interface IMetodoPago {
  metodo: 'tarjeta' | 'paypal' | 'transferencia';
  numeroTarjeta?: string;
  nombreTitular?: string;
  expiracion?: string;
  cvv?: string;
}