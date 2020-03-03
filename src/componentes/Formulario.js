import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Error from "./Error"

const Formulario = ({guardarBusqueda, guardarCategoria, guardarCargando}) => {
    //estado local del componente
    const [termino, guardarTermino] = useState("");
    const [error, guardarError] = useState(false);

    const buscarImagenes =(e)=>{
        e.preventDefault();

        //validamos
        if(termino.trim() === ""){
            guardarError(true);
            return;

        }
        guardarError(false);

        guardarCargando(true);

        setTimeout(()=>{
            guardarCargando(false);
           //enviar el termino
            guardarBusqueda(termino);
        },2000)
        
    }

    return (
      <form onSubmit={buscarImagenes}>
        <div className="row">
          <div className="form-group col-md-5">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Busca una Imagen, Ejemplo: Futbol o Café"
              onChange={e => guardarTermino(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3 ">
            <select className="form-control-lg form-control " name='categoria' onChange={e => guardarCategoria(e.target.value)}>
            <option value="">-- Categoria--</option>
            <option value="science">Ciencia</option>
            <option value="education">Educacion</option>
            <option value="people">Personas</option>
            <option value="feelings">Sentimientos</option>
            <option value="computer">Computacion</option>
            <option value="buildings">Construccion</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <input
              type="submit"
              className="btn btn-lg btn-danger btn-block"
              value="Buscar"
            />
          </div>
        </div>
        {error ? <Error mensaje="Agrega un termino de busqueda" /> : null}
      </form>
    );
}


Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired,
    guardarCategoria: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario
