import { CSSProperties, useEffect, useState } from "react"

export interface Tablero{
    id: number,
    fila: number,
    columna:number,
    color: string,
    letra: string,
    inicio: boolean, 
    numero?: number,
    celda_seleccionada: (coordenadas:number[])=>void;
}


export default function Celda(props : Tablero){
    const {fila, columna, color, celda_seleccionada, letra, numero}=props;
    const [color_estado, setColorEstado]=useState<string>(color); 
    const [activado, setActivado]=useState<boolean>(false); 
    const [letra_estado, setLetra]=useState<string>("");
    const [numero_estado, setNumero]=useState<number>(); 
    useEffect(()=>{
        setColorEstado(color);
    },[color]);

    useEffect(()=>{
        setLetra(letra);
    },[letra]);

    useEffect(()=>{
        setNumero(numero);
    },[numero])

    const devolver_filas_columnas=()=>{
        celda_seleccionada([props.fila,props.columna])
    }

    const cambiar_Color=()=>{
        if(!activado){
            setColorEstado("#6EFD27");
            setActivado(true); 
            devolver_filas_columnas(); 
        } 
        else{
            setColorEstado("#E6E4E4");
            setActivado(false); 
        }
    }


    return(
        <>
        <div className="div_celda" onClick={()=>cambiar_Color()}
        style={{backgroundColor: color_estado, gridColumn: columna, gridRow: fila} as CSSProperties}> 
            <p className="numero">{numero_estado}</p>
            <input className="input_letra" type="text" readOnly={true} value={letra_estado}/>
        </div>
        </>
    )
}


