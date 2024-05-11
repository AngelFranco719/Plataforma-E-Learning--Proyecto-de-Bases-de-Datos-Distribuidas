import axios from "axios";
import { useEffect } from "react";
import { Perfil_BD } from "../ConexionBD/Definiciones";

export default function Perfil(){
    useEffect(()=>{
        const email="fr397783@uaeh.edu.mx"; 
        const contraseña="397783"
        axios.get(`/api/Perfiles?email=${email}&contraseña=${contraseña}`).then((respuesta)=>{
            const sesion:Perfil_BD[]=respuesta.data; 
            console.log(sesion);
        }).catch((error)=>{
            console.log(error);
        })
    },[]);
   return(
    <h1>Hola</h1>
   )
}