import { CSSProperties } from "react"
import { Perfil_Profesor } from "../../ConexionBD/Definiciones"
import "./PerfilProfesor.css"

interface props{
    perfilProfesor: Perfil_Profesor | undefined
}

export default function PerfilAlumno({perfilProfesor}:props){
    const arreglo_Colores=["#FA4A27","#7427FA","#2794FA","#81FA27","#27FA97"]
    return(
        <>
        <div id="Informacion_Perfil">
            <div id="Informacion_General">
                <img id="Foto_Perfil" src={perfilProfesor?.Foto_Perfil}/>
            </div>
            <div id="Informacion_Especifica">
                <h1 id="Nombre">{perfilProfesor?.Nombre}.</h1>
                <p id="Biografia">{perfilProfesor?.Biografia}</p>
                <div id="Etiquetas_Div">
                    <div className="Etiqueta_Header" style={{backgroundColor: arreglo_Colores[Math.floor(Math.random()*arreglo_Colores.length)]} as CSSProperties}>{perfilProfesor?.NivelAcademico}</div>
                    <div className="Etiqueta_Header" style={{backgroundColor: arreglo_Colores[Math.floor(Math.random()*arreglo_Colores.length)]} as CSSProperties}>{perfilProfesor?.Tipo_Perfil}</div>
                </div>
                <div id="Botones_div">
                    <div id="Boton_Div_editar">
                        Editar Perfil
                    </div>
                    <div id="Boton_Div_mensaje">
                        Activo
                    </div>
                </div>
            </div>
            <div className="div_informacion">
                <h2 className="Titulo_informacion">Email:</h2>
                <p className="Contenido_informacion">{perfilProfesor?.Email}</p>
            </div>
            <div className="div_informacion">
                <h2 className="Titulo_informacion">Programa Educativo:</h2>
                <p className="Contenido_informacion">{perfilProfesor?.Licenciatura}</p>
            </div>
            <div className="div_informacion">
                <h2 className="Titulo_informacion">Institución:</h2>
                <p className="Contenido_informacion">{perfilProfesor?.Institucion}</p>
            </div>
            <div className="div_informacion">
                <h2 className="Titulo_informacion">Especialización:</h2>
                <p className="Contenido_informacion">{perfilProfesor?.Especializacion}</p>
            </div>
        </div>
        </>
    )
}