interface IPelicula {
    id : string;
    nombre : string;
    descripcion : string;
    url : string;
}

interface IPeliculaProps {
    nombre : string;
    url : string;
}

const Pelicula = ({nombre, url}:IPeliculaProps) => {
    return (
       <div className="pelicula">
            <h1 style={{backgroundColor:'gray'}}>{nombre}</h1>
            <img src={url} alt={nombre} style={{width: '450px', height: '450px'}}/>
       </div> 
    )
};

export default Pelicula
export type {IPelicula}

console.log(Pelicula)