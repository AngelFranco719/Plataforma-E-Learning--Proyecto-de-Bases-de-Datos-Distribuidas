import "./Header.css"

import { CSSProperties, useEffect, useState } from "react";
import { Perfil_Alumno, Perfil_BD, Perfil_Profesor } from "../../ConexionBD/Definiciones";
import { Link } from "react-router-dom";
import axios from "axios";

interface props_header{
    perfil: Perfil_BD,
}

export default function Header({perfil} : props_header){
    const [perfilAlumno, setPerfilAlumno]=useState<Perfil_Alumno[] | undefined>()
    const [perfilProfesor, setPerfilProfesor]=useState<Perfil_Profesor[] | undefined>();
    const primerPerfil = Array.isArray(perfil) ? perfil[0] : perfil;

    useEffect(()=>{
        if(primerPerfil.Tipo_Perfil=="Alumno"){
            axios.get(`/api/Perfil_Alumno?id_perfil=${primerPerfil.ID_Perfil}`).then((res)=>{
                setPerfilAlumno(res.data);
            })
        }
        else if(primerPerfil.Tipo_Perfil=="Profesor"){
            axios.get(`/api/Perfil_Profesor?id_perfil=${primerPerfil.ID_Perfil}`).then((res)=>{
                setPerfilProfesor(res.data);
            })
        }
    },[])

    return(
        <>
        <header className="div_header">
            <div className="div_logo">
                <div className="logo_img"></div>
                <h1 className="h1_header">Coursera</h1>
            </div>
            <div className="perfil_div">
                <h2>
                    <Link to={"/Perfil"} className="Nombre_perfil">{perfilAlumno? perfilAlumno[0].Nombre : (perfilProfesor ? perfilProfesor[0].Nombre : "")}</Link>
                </h2>
                <div className="foto_perfil" style={{backgroundImage: `url(${perfilAlumno? perfilAlumno[0].Foto_Perfil : (perfilProfesor? perfilProfesor[0].Foto_Perfil : "")})`} as CSSProperties}></div> 
            </div>
        </header>
        </>
    )
}