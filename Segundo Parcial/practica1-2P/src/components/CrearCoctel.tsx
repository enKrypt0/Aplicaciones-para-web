//Creado por Diego Velez, modulo para simular cocteles creados por usuarios

import { useEffect, useState } from 'react';
import type { ICoctelPersonalizado } from '../interfaces/CoctelPersonalizado';

export default function CoctelPersonalizadoList() {
  const [cocteles, setCocteles] = useState<ICoctelPersonalizado[]>([]);

  useEffect(() => {
    const data: ICoctelPersonalizado[] = [
      { id: 1, usuario: 'Juan', TipoLicor: 'Ron', Licor: 'Bacardi', ingredientes: 'Jugo de piña, hielo', precio: 8 },
      { id: 2, usuario: 'Ana', TipoLicor: 'Vodka', Licor: 'Absolut', ingredientes: 'Jugo de naranja, hielo', precio: 10 },
    ];
    setTimeout(() => setCocteles(data), 1000); // Simula carga asincronica
  }, []);

  return (
    <div>
      <h2>Cocteles Personalizados</h2>
      {cocteles.map((c) => (
        <div key={c.id}>
          <p>Usuario: {c.usuario}</p>
          <p>Tipo de Licor: {c.TipoLicor}</p>
          <p>Licor: {c.Licor}</p>
          <p>Ingredientes: {c.ingredientes}</p>
          <p>Precio: ${c.precio}</p>
        </div>
      ))}
    </div>
  );
}