import './App.css'
import Cartelera from './componentes/cartelera'
import type { IPelicula } from "./componentes/pelicula"

const peliculas:IPelicula[] = [
  {
    id:"1",
    nombre:"Tropa de Elite",
    descripcion:"Pelicula de Accion",
    url:"ola"
  },
  {
    id:"2",
    nombre:"Tropa de Elite 2",
    descripcion:"Pelicula doble de Accion",
    url:"Alo"
  }
]

function App() {

  return (
    <Cartelera listaPeliculas={peliculas}/>
  )
}

export default App
