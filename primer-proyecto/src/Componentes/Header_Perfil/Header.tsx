import "./Header.css"
import {Perfil} from "../../Objetos Temporales/Objetos_Perfil"
import Devolver_Perfiles from "../../Objetos Temporales/Objetos_Perfil"
import { CSSProperties } from "react";
import { NavLink } from "react-router-dom";


const perfiles:Perfil[]=Devolver_Perfiles(); 

export default function Header(){
    return(
        <>
        <header className="div_header">
            <div className="div_logo">
                <div className="logo_img"></div>
                <h1 className="h1_header">Coursera</h1>
            </div>
            <div className="perfil_div">
                <h2>
                    <NavLink className="Nombre_perfil" to={"/Perfil"}>{perfiles[0].name}</NavLink>
                </h2>
                <div className="foto_perfil" style={{backgroundImage: `url(${perfiles[0].foto_perfil})`} as CSSProperties}></div> 
            </div>
        </header>
        </>
    )
}