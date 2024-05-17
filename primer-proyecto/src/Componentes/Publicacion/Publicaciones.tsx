import { CSSProperties } from "react"
import {Publicacion_Autor } from "../../ConexionBD/Definiciones"
import "./Publicaciones.css"

interface prop{
    publicacion: Publicacion_Autor | undefined
}

export default function Publicaciones({publicacion} : prop){
    return(
        <>
            <div id="Div_Publicacion">
                <div id="Div_Cabecera">
                    <div className="Etiqueta_Publicacion">{publicacion?.Categoria}</div>
                    <p id="Nombre_Autor">{publicacion?.Nombre}</p>
                    <div id="Foto_Autor" style={{backgroundImage: `url(${publicacion?.Foto_Perfil})`} as CSSProperties}></div>
                </div>
                <h2 id="Titulo_Publicacion">{publicacion?.Titulo}:</h2>
                <p id="Contenido_Publicacion">{publicacion?.Contenido}</p>
            </div>
        </>
    )
}