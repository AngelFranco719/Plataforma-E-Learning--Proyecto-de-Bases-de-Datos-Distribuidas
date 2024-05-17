import { CSSProperties, useEffect, useState } from "react";
import { Curso, Publicacion_Autor } from "../../ConexionBD/Definiciones"
import "./cursoAlumno.css"
import Publicaciones from "../Publicacion/Publicaciones";
import axios from "axios";

interface props{
    curso: Curso
}

export default function cursoAlumno({curso}: props){
    const [publicaciones, setPublicaciones]=useState<Publicacion_Autor[] | undefined>();
    const colores:string[][]=[
        ["#DCFCFF","#24E3C0"],
        ["#FFD8C5"," #FF7664"],
        ["#F2CCFF", "#C565E6"],
        ["#FDFFB3","#FFCD24"]
    ];
    let dibujados=false; 
    const fechaActual:Date=new Date();
    const dia:number=fechaActual.getDate(); 
    const mes:number=fechaActual.getMonth();
    const año:number=fechaActual.getFullYear();

    const color_numero=Math.floor(Math.random()*colores.length)

    useEffect(()=>{
        axios.get(`/api/Publicacion_Autor?id_curso=${curso.ID_Curso}`).then((resultado)=>{
            setPublicaciones(resultado.data);
            console.log(resultado.data[0]);
        })
    },[])

    console.log("Curso: "+curso.ID_Curso)

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
                    {publicaciones ? publicaciones.map((publicacion, index)=>{
                        return(
                            <Publicaciones key={index} publicacion={publicacion}></Publicaciones>
                        )
                    }) : <p> No hay publicaciones disponibles. </p>}
                </div>
                <div id="Div_Actividades">
                    <h2 id="Titulo_Actividades">Actividades:</h2>
                    <h2 id="Fecha">{`${dia}/${mes}/${año}`}</h2>
                </div>
            </div>
        </>
    )
}