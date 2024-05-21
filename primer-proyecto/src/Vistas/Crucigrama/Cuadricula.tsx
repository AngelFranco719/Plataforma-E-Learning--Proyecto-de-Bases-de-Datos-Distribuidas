import { useEffect, useState } from "react";
import Celda from "./Celda";
import { Palabra } from "../../ConexionBD/Definiciones";

interface prop{
    ConjuntoPalabras:Palabra[] | null,
    resolver:boolean,
    setCoordenadas: React.Dispatch<React.SetStateAction<{fila:number, columna: number} | null>>,
    setCorrectas: React.Dispatch<React.SetStateAction<number>>,
    correctas:number, 
    palabra: Palabra | null
}

export default function Cuadricula({setCoordenadas, palabra, ConjuntoPalabras, resolver, setCorrectas, correctas}: prop){
    const [celdaActivada, setCeldaActivada]=useState<{fila: number, columna:number}| null>(null);
    const [celdaLetra, setCeldaLetra]=useState<{fila:number, columna:number, letra:string}[] | null>(null); 
    const [inicios, setInicios]=useState<{fila:number, columna:number, numero: number}[] | null>(null); 
    const arregloCeldas=Array.from({length: 225});
    let fila=0;
    let columna=0; 
    useEffect(()=>{
        setCoordenadas(celdaActivada);
    },[celdaActivada])

    useEffect(()=>{
        if(ConjuntoPalabras){
            const nuevo_array=inicios? inicios : [];
            ConjuntoPalabras.forEach((palabra)=>{
                const nueva_coordenada={
                    fila: palabra.Fila,
                    columna: palabra.Columna,
                    numero: palabra.Numero
                }
                nuevo_array.push(nueva_coordenada); 
            })
            setInicios([...nuevo_array]);
        }
    },[ConjuntoPalabras])

    useEffect(()=>{
        if(inicios && ConjuntoPalabras){
            const nuevoArreglo=celdaLetra? celdaLetra :[];
            ConjuntoPalabras.forEach((palabra,index)=>{
                const celda_inicio={
                    fila: inicios[index].fila,
                    columna: inicios[index].columna,
                    letra: palabra.Palabra[0]
                }
                nuevoArreglo.push(celda_inicio);
                const tamañoPalabra=palabra.Palabra.length;
                const orientacion=palabra.Orientacion;
                let fila_actual= celda_inicio.fila;
                let columna_actual=celda_inicio.columna;
                if(orientacion=="Vertical"){
                    for(let i=1; i<tamañoPalabra; i++){
                        fila_actual++;
                        const nuevaCelda={
                            fila: fila_actual,
                            columna: columna_actual,
                            letra: palabra.Palabra[i]
                        }
                        nuevoArreglo.push(nuevaCelda);
                    }
                }
                else{
                    for(let i=1; i<tamañoPalabra; i++){
                        columna_actual++;
                        const nuevaCelda={
                            fila:fila_actual,
                            columna:columna_actual,
                            letra:palabra.Palabra[i]
                        }
                        nuevoArreglo.push(nuevaCelda);
                    }
                }
            })
            setCeldaLetra([...nuevoArreglo]);
        }
    },[inicios])

    useEffect(()=>{
        if(palabra!=null){
            const nuevoArreglo=[];
            const celda_inicio={
                fila:celdaActivada? celdaActivada.fila : 0,
                columna:celdaActivada? celdaActivada.columna : 0,
                letra: palabra.Palabra[0]
            }
            nuevoArreglo.push(celda_inicio);
            const tamaño_palabra=palabra.Palabra.length;
            const orientacion=palabra.Orientacion;
            let fila_actual=celdaActivada? celdaActivada.fila : 0;
            let columna_actual=celdaActivada? celdaActivada.columna : 0;
            if(orientacion=="Vertical"){
                for(let i=1; i<tamaño_palabra; i++){
                    fila_actual++;
                    const nueva_celda={
                        fila:fila_actual,
                        columna:columna_actual,
                        letra: palabra.Palabra[i]
                    }
                    nuevoArreglo.push(nueva_celda);
                }
            }
            else{
                for(let i=1; i<tamaño_palabra; i++){
                    columna_actual++;
                    const nueva_celda={
                        fila:fila_actual,
                        columna:columna_actual,
                        letra: palabra.Palabra[i]
                    }
                    nuevoArreglo.push(nueva_celda);
                }  
            }
            setCeldaLetra([...nuevoArreglo]);
        }
    },[palabra])

    useEffect(()=>{
        if(celdaLetra && !resolver){
            const nuevo_arreglo=inicios? inicios : [];
            const fila=celdaLetra[0].fila;
            const columna=celdaLetra[0].columna;
            const nuevo_inicio={
                fila: fila,
                columna:columna,
                numero: palabra? palabra.Numero : 0
            }
            nuevo_arreglo.push(nuevo_inicio); 
            setInicios([...nuevo_arreglo]);
        }
    },[celdaLetra])

    return(
        <>
            <div id="Div_Cuadricula">
                {arregloCeldas.map(()=>{
                    if(columna==15){
                        columna=0; 
                        fila++; 
                    }
                    columna++;
                    const key = `${fila}-${columna}`;
                    const isSelected:boolean = celdaActivada!=null && celdaActivada.fila===fila && celdaActivada.columna===columna; 
                    const primero= inicios!=null? inicios.find(celda=>celda.fila == fila && celda.columna == columna) : false; 
                    const numero= primero? primero.numero : null; 
                    const letraObj = celdaLetra!=null? celdaLetra.find(celda => celda.fila === fila && celda.columna === columna) : false;
                    const letra = letraObj ? letraObj.letra : null;
                    
                    return(
                        <>
                            <Celda correctas={correctas} setCorrectas={setCorrectas} resolver={resolver} numero={numero? numero : null} letra={letra? letra : null} key={key} fila={fila} setCeldaActivada={setCeldaActivada} columna={columna} seleccionado={isSelected}></Celda>
                        </>
                    )
                })}
            </div>
        </>
    )
}