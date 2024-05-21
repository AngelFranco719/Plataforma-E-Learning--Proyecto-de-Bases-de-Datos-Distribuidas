import { useEffect, useState } from "react"
import "./Crucigrama.css"
import { Crucigrama_BD, Palabra } from "../../ConexionBD/Definiciones"
import axios from "axios";

interface prop{
    setConjuntoPalabras: React.Dispatch<React.SetStateAction<Palabra [] | null>>,
    setResolver: React.Dispatch<React.SetStateAction<boolean>>,
    Correctas: number
}

export default function ResolverCrucigrama({setConjuntoPalabras, setResolver, Correctas}:prop){
    const [id, setID]=useState<{ID_Crucigrama: number}[]>(); 
    const [crucigrama, setCrucigrama]=useState<Crucigrama_BD[]>();
    const [palabras, setPalabra]=useState<Palabra[]>();
    const [aciertosTotal, setAciertosTotal]=useState<number>(0);

    useEffect(()=>{
        axios.get(`/api/Crucigrama?id_crucigrama=${7}`).then((respuesta)=>{
            setCrucigrama(respuesta.data); 
        })
        setResolver(true); 
    },[])

    useEffect(()=>{
        if(crucigrama) {
            axios.get(`/api/Crucigrama?titulo=${crucigrama[0].Titulo}`).then((respuesta)=>{
                setID(respuesta.data)
            });
        }   
    },[crucigrama])

    useEffect(()=>{
        if(id){
            axios.get(`/api/Palabra?id_crucigrama=${id[0].ID_Crucigrama}`).then((respuesta)=>{
                setPalabra(respuesta.data); 
            })
        }
    },[id])

    useEffect(()=>{
        if(palabras){
            setConjuntoPalabras(palabras); 
            console.log(palabras);
            let aciertos_actual=aciertosTotal; 
            palabras.forEach((palabra)=>{
                aciertos_actual+=palabra.Palabra.length;
                setAciertosTotal(aciertos_actual); 
            })
        }
    },[palabras])

    return(
        <>
            <div id="Resolver_Div">
                <h2>{crucigrama? crucigrama[0].Titulo : "Not Found"}</h2>
                <p id="Descripcion_Crucigrama">{crucigrama? crucigrama[0].Descripcion : "Not Found"}</p>
                <div id="Palabras_Crucigrama">
                    <div id="Palabras_Verticales">
                        <h2>Vertical:</h2>
                        {palabras?.map((palabra, index)=>{
                            if(palabra.Orientacion=="Vertical"){
                                return(
                                    <p key={index} className="Descripcion_Palabra">{`${palabra.Numero}.-${palabra.Descripcion}`}</p>
                                )
                            }
                            else{
                                return;
                            }
                        })}
                    </div>
                    <div id="Palabras_Horizontales">
                        <h2>Horizontal:</h2>
                        {palabras?.map((palabra, index)=>{
                            if(palabra.Orientacion=="Horizontal"){
                                return(
                                    <p key={index} className="Descripcion_Palabra">{`${palabra.Numero}.-${palabra.Descripcion}`}</p>
                                )
                            }
                        })}
                    </div>
                </div>
                <div>
                    <h2>{`Aciertos: ${Correctas}/${aciertosTotal}`}</h2>
                </div>
            </div>
        </>
    )
}