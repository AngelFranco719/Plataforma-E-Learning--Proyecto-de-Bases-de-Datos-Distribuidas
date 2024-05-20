import { CSSProperties} from "react"
import { Perfil_Curso, Publicacion_Autor } from "../../ConexionBD/Definiciones"
import "./Publicaciones.css"
import ComentarioComponente from "../Comentario/Comentario"

interface prop{
    publicacion: Publicacion_Autor | undefined,
    perfilActual: Perfil_Curso | undefined
}

export default function Publicaciones({publicacion, perfilActual} : prop){

    const primerPerfil=Array.isArray(perfilActual)? perfilActual[0] : perfilActual;

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
                <ComentarioComponente publicacionActual={publicacion} perfilActual={primerPerfil}></ComentarioComponente>
            </div>
           
        </>
    )
}