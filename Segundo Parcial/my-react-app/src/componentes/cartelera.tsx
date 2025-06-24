import type { IPelicula } from "./pelicula"
import Pelicula from "./pelicula";

interface ICartelera {
    listaPeliculas: IPelicula[];
}

const Cartelera = ({listaPeliculas} : ICartelera ) => {
    return (
        <div className="Cartelera">
            <h1> Cartelera </h1>
            {listaPeliculas.map((pelicula) => (

            <Pelicula key={pelicula.id} nombre={pelicula.nombre} url={pelicula.url}/>
            ))}
        </div>
    )
}

export default Cartelera