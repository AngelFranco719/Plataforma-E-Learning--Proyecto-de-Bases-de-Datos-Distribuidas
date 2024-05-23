import { useEffect, useState } from "react"
import "./Ahogado.css"
import Muñeco from "./Muñeco"
import { Ahogado, Concepto} from "../../ConexionBD/Definiciones"
import axios from "axios"
import InputAhogado from "./InputAhogado"

interface prop{
    ID_Ahogado:number,
}

export default function ResolverAhogado({ID_Ahogado}:prop){
    const [error, setError]=useState<number>(0);
    const [acierto, setAcierto]=useState<number>(0);
    const [ahogado, setAhogado]=useState<Ahogado[]>();
    const [concepto, setConcepto]=useState<Concepto[]>(); 
    const [caracteres, setCaracteres]=useState<string[]>(); 
    const [status, setStatus]=useState<string>(); 

    useEffect(()=>{
        axios.get(`/api/Ahogado?id_ahogado=${ID_Ahogado}`).then(respuesta=>{
            setAhogado(respuesta.data);
        })
    },[])

    useEffect(()=>{
        if(ahogado)
        axios.get(`/api/Concepto?id_ahogado=${ahogado[0].ID_Ahogado}`).then(respuesta=>{
            setConcepto(respuesta.data);
        })
    },[ahogado])

    useEffect(()=>{
        if(concepto){
            setCaracteres(concepto[0].Concepto.split(''))
        }
    },[concepto])

    useEffect(()=>{
        if(caracteres) console.log(caracteres);
    },[caracteres])

    useEffect(()=>{
        console.log(error)
        if(error==6){
            setStatus("Perdiste");
        }
    },[error])

    useEffect(()=>{
        if(caracteres && acierto==caracteres.length){
            setStatus("Ganaste")
        }
    },[acierto])


    return(
        <>
            <div id="ResolverA_Div">
                <div id="Div_InfoR">
                    <Muñeco error={error}></Muñeco>
                </div>
                <div id="Minijuego_Ah">
                    <h1 id="Titulo_Ahogado_Re">{ahogado? ahogado[0].Titulo : "Not Found"}:</h1>
                    <p className="Descripcion_Ah_Re">{ahogado? ahogado[0].Descripcion : "Not Found"}</p>
                    <h1 style={{textAlign: "center"}}>Adivina:</h1>
                    <p className="Descripcion_Ah_Re">{concepto? concepto[0].Descripcion : "Not Found"}</p>
                    <div style={{display:"flex", justifyContent: "center"}}>
                        {caracteres? caracteres.map((caracter, index)=>{
                            if(error<6)
                            return(
                                <InputAhogado setAcierto={setAcierto} acierto={acierto} error={error} setError={setError} key={index} caracter={caracter}></InputAhogado>
                            )
                        }) : undefined}
                    </div>
                    {status=="Perdiste"? <h2 id="Titulo_Perdiste">{"Perdiste :("}</h2> : undefined}
                    {status=="Ganaste"? <h2 id="Titulo_Ganaste">{"Lo lograste :)"}</h2> : undefined}
                </div>
            </div>
        </>
    )
}