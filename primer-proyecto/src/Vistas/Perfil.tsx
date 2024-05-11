import axios from "axios";
import { useEffect } from "react";

export default function Perfil(){
    useEffect(()=>{
        axios.get('/api/Perfiles').then((respuesta)=>{
            console.log(respuesta.data);
        }).catch((error)=>{
            console.log(error);
        })
    },[]);
   return(
    <h1>Hola</h1>
   )
}