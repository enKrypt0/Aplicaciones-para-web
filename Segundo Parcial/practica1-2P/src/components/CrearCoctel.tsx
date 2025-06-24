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
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cocteles.map((c) => (
          <div
            key={c.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              minWidth: '220px',
              background: '#fff',
              color: '#222',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <p><strong>Usuario:</strong> {c.usuario}</p>
            <p><strong>Tipo de Licor:</strong> {c.TipoLicor}</p>
            <p><strong>Licor:</strong> {c.Licor}</p>
            <p><strong>Ingredientes:</strong> {c.ingredientes}</p>
            <p><strong>Precio:</strong> ${c.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}