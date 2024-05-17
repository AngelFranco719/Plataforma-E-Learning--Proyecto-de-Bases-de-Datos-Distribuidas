import { CSSProperties } from "react"
import { Perfil_Alumno } from "../../ConexionBD/Definiciones"
import "./PerfilAlumno.css"

interface props{
    perfilAlumno: Perfil_Alumno | undefined
}

export default function PerfilAlumno({perfilAlumno}:props){
    const arreglo_Colores=["#FA4A27","#7427FA","#2794FA","#81FA27","#27FA97"]
    return(
        <>
        <div id="Informacion_Perfil">
            <div id="Informacion_General">
                <img id="Foto_Perfil" src={perfilAlumno?.Foto_Perfil}/>
            </div>
            <div id="Informacion_Especifica">
                <h1 id="Nombre">{perfilAlumno?.Nombre}.</h1>
                <p id="Biografia">{perfilAlumno?.Biografia}</p>
                <div id="Etiquetas_Div">
                    <div className="Etiqueta_Header" style={{backgroundColor: arreglo_Colores[Math.floor(Math.random()*arreglo_Colores.length)]} as CSSProperties}>{perfilAlumno?.Semestre} Semestre</div>
                    <div className="Etiqueta_Header" style={{backgroundColor: arreglo_Colores[Math.floor(Math.random()*arreglo_Colores.length)]} as CSSProperties}>{perfilAlumno?.Tipo_Perfil}</div>
                    <div className="Etiqueta_Header" style={{backgroundColor: arreglo_Colores[Math.floor(Math.random()*arreglo_Colores.length)]} as CSSProperties}>Grupo {perfilAlumno?.Grupo}</div>
                </div>
                <div id="Botones_div">
                    <div id="Boton_Div_editar">
                        Editar Perfil
                    </div>
                    <div id="Boton_Div_mensaje">
                        Inscrito
                    </div>
                </div>
            </div>
            <div className="div_informacion">
                <h2 className="Titulo_informacion">Email:</h2>
                <p className="Contenido_informacion">{perfilAlumno?.Email}</p>
            </div>
            <div className="div_informacion">
                <h2 className="Titulo_informacion">Programa Educativo:</h2>
                <p className="Contenido_informacion">{perfilAlumno?.Carrera}</p>
            </div>
            <div className="div_informacion">
                <h2 className="Titulo_informacion">Institución:</h2>
                <p className="Contenido_informacion">{perfilAlumno?.Institucion}</p>
            </div>
        </div>
        </>
    )
}