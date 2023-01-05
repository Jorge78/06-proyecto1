import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({listadoState, setListadoState}) => {

    //const [listadoState, setListadoState] = useState([]);

    const [editar, setEditar] = useState(0);

    useEffect(() => {
        conseguirPeliculas();
    }, []);

    const conseguirPeliculas = () => {
        let peliculas = JSON.parse(localStorage.getItem('pelis'));

        setListadoState(peliculas);

        return peliculas;
    }

    const borrarPeli = (id) => {
        //Conseguir peliculas almacenadas
        let pelis_almacenadas = conseguirPeliculas();

        //Filtrar esas peliculkas para que elimine del array la que no quiero
        let nuevo_array_pelis = pelis_almacenadas.filter(peli => peli.id !== parseInt(id));

        //Actualizar el stado del listado
        setListadoState(nuevo_array_pelis);

        //Actualizar los datos en el LocalStorage
        localStorage.setItem('pelis', JSON.stringify(nuevo_array_pelis));
    }

    return (
        <>
            {listadoState != null && listadoState.length > 0 ?
                    listadoState.map(peli => {
                        return (
                            <article key={peli.id} className="peli-item">
                                <h3 className="title">{peli.titulo}</h3>
                                <p className="description">{peli.descripcion}</p>

                                <button className="edit" onClick={ () => setEditar(peli.id) }>Editar</button>
                                <button className="delete" onClick={ () => borrarPeli(peli.id) }>Borrar</button>

                                {/* Aparece formulario editar */}
                                {editar === peli.id && 
                                    <Editar peli={peli}
                                            conseguirPeliculas={conseguirPeliculas}
                                            setEditar={setEditar}
                                            setListadoState={setListadoState}
                                    />
                                }

                            </article>
                        )
                    })

                : <h2>No hay películas para mostrar</h2>
                
            }

            {/* <article className="peli-item">
                <h3 className="title">Desarrollo web</h3>
                <p className="description">victorroblesweb.es</p>

                <button className="edit">Editar</button>
                <button className="delete">Borrar</button>
            </article>

            <article className="peli-item">
                <h3 className="title">Desarrollo web</h3>
                <p className="description">victorroblesweb.es</p>

                <button className="edit">Editar</button>
                <button className="delete">Borrar</button>
            </article>

            <article className="peli-item">
                <h3 className="title">Desarrollo web</h3>
                <p className="description">victorroblesweb.es</p>

                <button className="edit">Editar</button>
                <button className="delete">Borrar</button>
            </article>

            <article className="peli-item">
                <h3 className="title">Desarrollo web</h3>
                <p className="description">victorroblesweb.es</p>

                <button className="edit">Editar</button>
                <button className="delete">Borrar</button>
            </article> */}
        </>
    )
}
