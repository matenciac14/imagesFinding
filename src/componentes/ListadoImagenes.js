import React from 'react';
import Imagen from './Imagen';
import PropTypes from 'prop-types';

const ListadoImagenes = ({imagenes}) => {
    return (
       <div className="col-12 p-5 row">
           {imagenes.map(imagen =>(
              <Imagen
                key={imagen.id}
                imagen={imagen}
              />
           ))}
       </div>
    )
}

ListadoImagenes.propTypes = {
    imagenes: PropTypes.array.isRequired,
}
export default ListadoImagenes
