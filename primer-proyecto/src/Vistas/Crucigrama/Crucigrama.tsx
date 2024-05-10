import "./Crucigrama.css"
import { Tablero } from "./Celda";
import { Inicializar_Array, Logica_cambiar_color, crearPalabra,dibujarPalabra} from "./Script"
import Celda from "./Celda";
import {useEffect, useRef, useState} from "react";
import { Palabra } from "../Definiciones";

const tablero_inicial=Inicializar_Array(); 

export default function Crucigrama(){
    /// Variables que controlan el contenido de los HTMLElements.
    const input_fila_ref=useRef<HTMLInputElement>(null);
    const input_columna_ref=useRef<HTMLInputElement>(null);
    const input_palabra_ref=useRef<HTMLInputElement>(null); 
    const textarea_descripcion_ref=useRef<HTMLTextAreaElement>(null);
    const details_orientacion_ref=useRef<HTMLDetailsElement>(null);
    /// Estados.
    const [tablero_array, setTablero_Array]=useState<Tablero[]>(tablero_inicial);
    const [palabras, setPalabras]=useState<Palabra[]>(); 
    const [orientacion, setOrientacion]=useState<string>("Orientación");
    
    ///Funciones: Manejar la lógica de selección de celdas.
    function Cambiar_Color_Celda(fila:number, columna:number){
        setTablero_Array(Logica_cambiar_color(tablero_array, fila, columna));
    }
    const obtener_celda=()=>{
        const nueva_fila=parseInt(input_fila_ref.current?.value || '');  
        const nueva_columna=parseInt(input_columna_ref.current?.value || '');
        Cambiar_Color_Celda(nueva_fila, nueva_columna)
    }
    

    ///Funciones para dibujar las palabras.

    useEffect(()=>{
        if(palabras!=undefined && palabras.length!=0){
            var index=palabras.length;
            index--; 
            const fila=palabras[index].celda_inicio[0];
            const columna=palabras[index].celda_inicio[1];
            console.log(`Coordenada de inicio: (${fila}, ${columna})`);
            const nuevo_tablero=dibujarPalabra(fila, columna, palabras[index],tablero_array, palabras.length);
            setTablero_Array(nuevo_tablero); 
        }
    },[palabras])


    function nuevaPalabra(){
        const nueva_fila=parseInt(input_fila_ref.current?.value || '');  
        const nueva_columna=parseInt(input_columna_ref.current?.value || '');
        const nueva_coordenada:number[]=[nueva_fila, nueva_columna];
        let palabra=input_palabra_ref.current?.value || ""; 
        let descripcion=textarea_descripcion_ref.current?.value || "";
        const id=palabras?.length || 0; 
        const palabra_resultado:Palabra=crearPalabra(id+1,palabra, descripcion, orientacion, nueva_coordenada);
        const nuevas_palabras=[...(palabras || []), palabra_resultado];
        setPalabras([...nuevas_palabras]);
    }
    function actualizar_details_vertical(){
        if(details_orientacion_ref.current!=undefined) details_orientacion_ref.current.open=false; 
        setOrientacion("Vertical");
    }
    function actualizar_details_horizontal(){
        if(details_orientacion_ref.current!=undefined) details_orientacion_ref.current.open=false; 
        setOrientacion("Horizontal");
    }


    /// Retornar el componente Crucigrama.
    return(
        <>
        {console.log("Mapeado.")};
        <div className="div_vista">
            <div className="div_crucigrama">
                {
                    tablero_array.map((tablero, index)=>(
                        <Celda  key={index} 
                        id={index} 
                        fila={tablero.fila} 
                        columna={tablero.columna} 
                        color={tablero.color}
                        letra={tablero.letra}
                        inicio={tablero.inicio}
                        numero={tablero.numero}
                        celda_seleccionada={(coordenadas)=>{
                            console.log(`Coordenadas: (${coordenadas[0]},${coordenadas[1]})`); 
                            if(input_fila_ref.current!=null && input_columna_ref.current!=null){
                                input_fila_ref.current.value=coordenadas[0].toString();
                                input_columna_ref.current.value=coordenadas[1].toString();
                                Cambiar_Color_Celda(coordenadas[0], coordenadas[1]);
                            }
                        }}
                        />
                    ))
                }
            </div>
            <div className="agregar_crucigrama">
                <h1 className="Titulo_crucigrama">Nuevo Crucigrama:</h1>
                <h2 className="Subtitulo">Agregar Palabra:</h2>
                <div className="div_subcontenido">
                    <p className="p_subcontenido">Fila:</p>
                    <input id="input_fila" ref={input_fila_ref} className="input_subcontenido" 
                    type="Text" defaultValue={""}></input>
                    <p className="p_subcontenido">Columna:</p>
                    <input id="input_columna" ref={input_columna_ref} className="input_subcontenido" 
                    type="Text" defaultValue={""}></input>
                    <button id="Button_Buscar" onClick={()=>obtener_celda()}> Buscar Celda</button>
                </div>
                <div className="div_subcontenido">
                    <p className="p_subcontenido">Palabra:</p>
                    <input type="text" className="input_subcontenido" 
                    id="Input_Palabra" ref={input_palabra_ref}></input>
                </div>
                <div className="div_subcontenido">
                    <p className="p_subcontenido">Descripción:</p>
                    <textarea className="input_subcontenido" 
                    id="Input_Descripcion" ref={textarea_descripcion_ref}></textarea>
                </div>
                <div className="div_subcontenido" id="div_details">
                    <details id="details_orientacion" ref={details_orientacion_ref}>
                        <summary>{orientacion}</summary>
                        <p onClick={actualizar_details_horizontal} className="p_options">Horizontal</p>
                        <p onClick={actualizar_details_vertical} className="p_options">Vertical</p>
                    </details>
                </div>
                <div className="div_subcontenido">
                    <button id="Button_Agregar" onClick={nuevaPalabra}>Agregar Palabra</button>
                </div>
            </div>
        </div>
        </>
    )
}