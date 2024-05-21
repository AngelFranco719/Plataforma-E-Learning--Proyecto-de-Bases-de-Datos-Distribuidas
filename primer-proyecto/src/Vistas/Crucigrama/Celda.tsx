import { CSSProperties, useEffect, useRef, useState } from "react";

interface prop{
    fila:number, 
    columna:number,
    seleccionado: boolean,
    setCeldaActivada: React.Dispatch<React.SetStateAction<{fila:number, columna: number} | null>>,
    numero: number | null, 
    letra: string | null,
    resolver: boolean,
    correctas: number, 
    setCorrectas: React.Dispatch<React.SetStateAction<number>>
}

export default function Celda({fila, columna, seleccionado, setCeldaActivada, letra, numero, resolver, setCorrectas, correctas}:prop){
    const [conletra, setConLetra]=useState<boolean>(false);
    const [evaluarLetra, setEvaluarLetra]=useState<boolean | null>(null);
    const [bien, setBien]=useState<boolean>(false);
    const InputLetraRef=useRef<HTMLInputElement>(null); 

    const devolverSeleccionada=()=>{
        setCeldaActivada({fila,columna});
    }

    useEffect(()=>{
        if(letra!=null && !resolver){
            if(InputLetraRef.current){
                InputLetraRef.current.value=letra; 
                setConLetra(true);  
            }
        }
        else if(letra != null && resolver){
            if(InputLetraRef.current) {
                InputLetraRef.current.value="";
                setConLetra(true);
            }
        }
    },[letra])

    const estadoLetra=()=>{
        if(!resolver) setConLetra(true);
        if(InputLetraRef.current){
            const letra_actual=InputLetraRef.current.value;
            setEvaluarLetra(letra_actual == letra? true : false);
        }
    }

    useEffect(()=>{
        let num_correctas=correctas;
        if(evaluarLetra!=null && evaluarLetra){
            setCorrectas(num_correctas+1);
            setBien(true);
        }
        else if(evaluarLetra!=null && !evaluarLetra){
            if(bien)
            setCorrectas(num_correctas-1);
            setBien(false);
        }
    },[evaluarLetra])

    return(
        <>
        <div id="Div_Celda" onClick={()=>devolverSeleccionada()} style={{backgroundColor: seleccionado? "#28FF4F" : (conletra? (evaluarLetra==null? "#FFFFFF" : (evaluarLetra? "#C4FF89" : "#FFA8A8")) : "#E9E9E9"), gridColumn:columna, gridRow:fila} as CSSProperties}>
            <div id="Numero_palabra">
                <label>{numero? numero : ""}</label>
            </div>
            <input ref={InputLetraRef} readOnly={resolver? false : true} onChange={()=>estadoLetra()}  className="Input_Celda" type="text"></input>
        </div>
        </>
    )
}