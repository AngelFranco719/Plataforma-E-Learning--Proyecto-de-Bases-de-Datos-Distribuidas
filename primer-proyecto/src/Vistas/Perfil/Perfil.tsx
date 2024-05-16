import { useEffect, useState } from "react";
import { Perfil_Alumno, Perfil_BD, Perfil_Profesor } from "../../ConexionBD/Definiciones"
import "./Perfil.css"
import axios from "axios";
import PerfilProfesor from "../../Componentes/Perfil_Profesor/PerfilProfesor";
import PerfilAlumno from "../../Componentes/Perfil_Alumno/PerfilAlumno";

interface props_Perfil{
    perfil: Perfil_BD;
}

export default function Perfil({perfil}:props_Perfil){
    const [perfilAlumno, setPerfilAlumno]=useState<Perfil_Alumno[] | undefined>();
    const [perfilProfesor, setPerfilProfesor]=useState<Perfil_Profesor[] | undefined>();
    const perfil_actual=Array.isArray(perfil)? perfil[0] : perfil;

    useEffect(()=>{
        if(perfil_actual && perfil_actual.Tipo_Perfil=="Alumno"){
            axios.get(`/api/Perfil_Alumno?id_perfil=${perfil_actual.ID_Perfil}`).then((resp)=>{
                setPerfilAlumno(resp.data);
            })
        }
        else if(perfil_actual && perfil_actual.Tipo_Perfil=="Profesor"){
            axios.get(`/api/Perfil_Profesor?id_perfil=${perfil_actual.ID_Perfil}`).then((resp)=>{
                setPerfilProfesor(resp.data);
            })
        }
    },[])

    if(perfil_actual && perfil_actual.Tipo_Perfil=="Alumno"){
        return(
            <div className="div_perfil">
                <PerfilAlumno perfilAlumno={perfilAlumno? perfilAlumno[0] : undefined}></PerfilAlumno>
            </div>
           )
    }
    else{
        return(
        <>
            <div className="div_perfil">
            <PerfilProfesor perfilProfesor={perfilProfesor? perfilProfesor[0] : undefined}/>
            </div>
        </>
        );
    }
    
   
}