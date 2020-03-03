import React, { useState, useEffect } from "react";
import Formulario from "./componentes/Formulario";
import ListadoImagenes from "./componentes/ListadoImagenes";
import Spinner from './componentes/Spinner.js';

function App() {
  //estado de la aplicaicon
  const [busqueda, guardarBusqueda] = useState("");
  const [categoria, guardarCategoria] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(5);
  const [ cargando, guardarCargando ] = useState(false)
 
  //manejamos la recarga  la pagina para hacer las peticiones
  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === "") return;

      const imagenesPorPagina = 50;
      const key = "13119377-fc7e10c6305a7de49da6ecb25";
      const url = ` https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page={imagenesPorPagina}&page=${paginaActual}&category=${categoria}`;
     
      //consultamos con fetch otras opciones axios 
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      guardarTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina));

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})

    };
    consultarApi();
  }, [busqueda,paginaActual,categoria]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron mt-2">
        <h3 className=" text-center pb-4">Buscador de imagenes By Miguel Atencia</h3>

        <Formulario 
          guardarBusqueda={guardarBusqueda} 
          guardarCategoria={guardarCategoria}
          guardarCargando={guardarCargando}
        />
      </div>

      

      <div className="row justify-content-center">
      {cargando ? <Spinner/> : null}
      
        
        <ListadoImagenes imagenes={imagenes} />
        
        {paginaActual === 1 ? null : (
          <button
            type="button"
            className="btn btn-outline-primary mr-1 mb-5"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}
        {paginaActual === totalPaginas ? null : (
          <button
            type="button"
            className="btn btn-outline-primary mb-5"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
