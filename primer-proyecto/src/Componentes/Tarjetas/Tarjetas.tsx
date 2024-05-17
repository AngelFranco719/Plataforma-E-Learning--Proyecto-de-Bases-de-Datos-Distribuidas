import  {CSSProperties} from "react";
import "./Tarjetas.css"
import { NavLink } from "react-router-dom";
import { Curso, Perfil_BD} from "../../ConexionBD/Definiciones";

interface props{
    curso:Curso | undefined,
    color:string,
    perfil: Perfil_BD,
    setCurso: React.Dispatch<React.SetStateAction<Curso | undefined>>
}

export default function tarjeta({curso, color, perfil, setCurso}:props){
    const abrir_vista_curso=()=>{
        setCurso(curso);
    }

    return(
        <>
        <div className="tarjeta">
            <div className="item" style={{'--color_dinamico':color} as CSSProperties} >
                <div className="Etiqueta">
                   {curso?.Licenciatura}
                </div>
                <h1>{curso?.Nombre}</h1>
                <div className='Etiqueta'>
                    {curso?.Semestre}
                </div>
            </div>
            <div className="informacion_cursos">
                <div className="foto_perfil" style={{backgroundImage: `url(${perfil.Foto_Perfil})`}}/>
                <p className="titulo_item">{curso?.Autor}</p>
                <div className="boton_curso">
                    <NavLink className={"navlink_boton"} to={"/Curso"} onClick={abrir_vista_curso}>Entrar</NavLink>
                </div>
            </div> 
        </div>
        </>
    )
}