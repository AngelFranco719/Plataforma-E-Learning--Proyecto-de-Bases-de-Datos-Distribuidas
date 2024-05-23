import React, { CSSProperties, useRef, useState } from "react"
import "./Ahogado.css"

interface prop{
    caracter: string,
    error: number, 
    setError: React.Dispatch<React.SetStateAction<number>>,
    setAcierto: React.Dispatch<React.SetStateAction<number>>,
    acierto: number
}

export default function InputAhogado({caracter, setError, error, setAcierto, acierto} : prop){
    const [evaluacion, setEvalucion]=useState<boolean | null>(null)

    const InputRef=useRef<HTMLInputElement>(null);
    const EvaluarLetra=()=>{
        if(InputRef.current && InputRef.current.value==caracter){
            setAcierto(acierto+1);
            setEvalucion(true); 
        }
        else if(InputRef.current && InputRef.current.value!=caracter && InputRef.current.value!=""){
            setError(error+1)
            setEvalucion(false);
        }
    }
    return(
        <>
            <input maxLength={1} ref={InputRef} onChange={()=>EvaluarLetra()} style={{backgroundColor: evaluacion!=null? (evaluacion? "#9FFF6C" : "#FF996C") : "#FFFFFF" } as CSSProperties} className="Input_Palabra_Ah" ></input>
        </>
    )
}