import { CSSProperties, useEffect, useState } from "react";
import { Actividad, Curso, Perfil_Curso, Publicacion_Autor } from "../../ConexionBD/Definiciones"
import "./cursoAlumno.css"
import Publicaciones from "../Publicacion/Publicaciones";
import axios from "axios";
import { NavLink } from "react-router-dom";

interface props{
    curso: Curso,
    setActividad: React.Dispatch<React.SetStateAction<Actividad| undefined>>,
    perfilActual: Perfil_Curso | undefined
}

export default function cursoAlumno({curso, setActividad, perfilActual}: props){
    const [publicaciones, setPublicaciones]=useState<Publicacion_Autor[] | undefined>();
    const [actividades, setActividades]=useState<Actividad[] | undefined>();
    const colores:string[][]=[
        ["#DCFCFF","#24E3C0"],
        ["#FFD8C5"," #FF7664"],
        ["#F2CCFF", "#C565E6"],
        ["#FDFFB3","#FFCD24"]
    ];
    const primerPerfil=Array.isArray(perfilActual)? perfilActual[0] : perfilActual;
    const color_numero=Math.floor(Math.random()*colores.length)

    useEffect(()=>{
        axios.get(`/api/Publicacion_Autor?id_curso=${curso.ID_Curso}`).then((resultado)=>{
            setPublicaciones(resultado.data);
        })
        axios.get(`/api/Actividad?id_curso=${curso.ID_Curso}`).then((resultado)=>{
            setActividades(resultado.data);
        })
    },[])

    const conseguirActividad=(actividadActual:Actividad)=>{
        setActividad(actividadActual);
    }

    return(
        <>
        <div id="Div_Principal">
            <div id="Div_Titulo">
                    <h1 id="Titulo_Curso">Bienvenido al Curso de </h1>
                    <h1 className="Marcatextos" style={{backgroundColor: colores[color_numero][1]} as CSSProperties}>{curso.Nombre}</h1>
                    <h2 id="Descripcion_Curso">{curso.Descripcion}</h2>
                    <div id="Div_Etiquetas">
                        <div className="Etiqueta_Curso_Alumno">{curso.Autor}</div>
                        <div className="Etiqueta_Curso_Alumno">{curso.Dificultad}</div>
                        <div className="Etiqueta_Curso_Alumno">{curso.Licenciatura}</div>
                    </div>
                </div>
                <div id="Div_Publicaciones">
                    <h2 id="Titulo_Publicaciones">Publicaciones del Curso:</h2>
                    {publicaciones ? publicaciones.map((publicacion)=>{
                        return(
                            <Publicaciones key={publicacion.ID_Publicacion} publicacion={publicacion} perfilActual={primerPerfil}></Publicaciones>
                        )
                    }) : <p> No hay publicaciones disponibles. </p>}
                </div>
                <div id="Div_Actividades">
                    <h2 id="Titulo_Actividades">Actividades:</h2>
                    {actividades? actividades.map((actividad)=>{
                        return(
                            <div key={actividad.ID_Actividad} style={{marginTop: "10px"} as CSSProperties}>
                                <NavLink to={"/Actividad"} className="Nombre_Actividad" onClick={()=>conseguirActividad(actividad)}>{actividad.Titulo}.</NavLink>
                                <br></br>
                            </div>    
                        )
                    }) : undefined}
                </div>
            </div>
        </>
    )
}