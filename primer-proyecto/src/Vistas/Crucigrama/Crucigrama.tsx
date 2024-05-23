import { useEffect, useState } from "react"
import CrearCrucigrama from "./Crear_Crucigrama"
import "./Crucigrama.css"
import Cuadricula from "./Cuadricula"
import { Actividad, Palabra, Perfil_BD } from "../../ConexionBD/Definiciones";
import ResolverCrucigrama from "./Resolver_Crucigrama";

interface prop{
    actividad:Actividad | undefined,
    perfil: Perfil_BD | undefined
}

export default function Crucigrama({actividad, perfil}: prop){ 
    const [coordenadas, setCoordenadas]=useState<{fila: number, columna:number} | null>(null);
    const [nuevaPalabra, setNuevaPalabra]=useState<Palabra | null>(null); 
    const [conjuntoPalabras, setConjuntoPalabras]=useState<Palabra[] | null>(null); 
    const [resolver, setResolver]=useState<boolean>(false); 
    const [correctas, setCorrectas]=useState<number>(0); 

    useEffect(()=>{
        console.log(coordenadas);
    },[coordenadas])

    return(
        <>
            <div id="Div_Crucigrama">
                <h1 id="Crucigrama_Titulo">Crucigrama:</h1>
            </div>  
            <div id="Div_Crucigrama_Contenido">
                <div id="Div_Cuadricula_General">
                    <Cuadricula correctas={correctas} setCorrectas={setCorrectas} resolver={resolver} ConjuntoPalabras={conjuntoPalabras} palabra={nuevaPalabra} setCoordenadas={setCoordenadas}>
                    </Cuadricula>
                </div>
                <div id="Div_Interaccion_Crucigrama">
                    {perfil && actividad? <ResolverCrucigrama perfil={perfil} actividad={actividad} ID_Crucigrama={actividad && actividad.ID_Crucigrama? actividad.ID_Crucigrama: 0} setConjuntoPalabras={setConjuntoPalabras} setResolver={setResolver} Correctas={correctas}></ResolverCrucigrama> : 
                    <CrearCrucigrama coordenadas={coordenadas} setNuevaPalabra={setNuevaPalabra}></CrearCrucigrama>}
                </div>
            </div>
        </>
    )
}