import  {CSSProperties} from "react";
import "./Tarjetas.css"
import { NavLink } from "react-router-dom";

interface Curso{
    name: string;
    author: string;
    color: string;
    imagen: URL;
    semestre: string; 
    carrera: string;
}

export default function tarjeta({curso}:{curso : Curso}){

    return(
        <>
        <div className="tarjeta">
            <div className="item" style={{'--color_dinamico':curso.color} as CSSProperties} >
                <div className="Etiqueta">
                   {curso.carrera}
                </div>
                <h1>{curso.name}</h1>
                <div className='Etiqueta'>
                    {curso.semestre}
                </div>
            </div>
            <div className="informacion_cursos">
                <div className="foto_perfil" style={{backgroundImage: `url(${curso.imagen})`}}/>
                <p className="titulo_item">{curso.author}</p>
                <div className="boton_curso">
                    <NavLink className={"navlink_boton"} to={"/Curso"}>Entrar</NavLink>
                </div>
            </div> 
        </div>
        </>
    )
}