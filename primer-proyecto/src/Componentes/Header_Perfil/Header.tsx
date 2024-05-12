import "./Header.css"

import { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import { Perfil_BD } from "../../ConexionBD/Definiciones";

interface props_header{
    perfil: Perfil_BD,
}

export default function Header({perfil} : props_header){
    return(
        <>
        <header className="div_header">
            <div className="div_logo">
                <div className="logo_img"></div>
                <h1 className="h1_header">Coursera</h1>
            </div>
            <div className="perfil_div">
                <h2>
                    <NavLink className="Nombre_perfil" to={"/Perfil"}>{perfil.ID_Alumno}</NavLink>
                </h2>
                <div className="foto_perfil" style={{backgroundImage: `url(${perfil.Foto_Perfil})`} as CSSProperties}></div> 
            </div>
        </header>
        </>
    )
}