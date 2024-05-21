import { CSSProperties, useEffect, useRef, useState } from "react";
import { Crucigrama_BD, Palabra } from "../../ConexionBD/Definiciones";
import axios from "axios";

interface prop{
    coordenadas: {fila:number, columna:number} | null,
    setNuevaPalabra: React.Dispatch<React.SetStateAction<Palabra | null>>
}

export default function CrearCrucigrama({coordenadas, setNuevaPalabra}: prop){
    const [crucigrama, setCrucigrama]=useState<Crucigrama_BD>(); 
    const [id_Crucigrama, setID_Crucigrama]=useState<number>(); 
    const TextAreaDescripcionRef=useRef<HTMLTextAreaElement>(null); 
    const InputPalabraRef=useRef<HTMLInputElement>(null); 
    const SummaryOrientacionRef=useRef<HTMLDetailsElement>(null); 
    const InputNumeroRef=useRef<HTMLInputElement>(null); 
    const InputTituloRef=useRef<HTMLInputElement>(null); 
    const InputDescripcionCrucigramaRef=useRef<HTMLTextAreaElement>(null); 

    const CrearCrucigrama=()=>{
        if(InputTituloRef.current && InputDescripcionCrucigramaRef.current){
            const titulo=InputTituloRef.current.value; 
            const descripcion=InputDescripcionCrucigramaRef.current.value; 
            const nuevoCrucigrama:Crucigrama_BD={
                Titulo:titulo,
                Descripcion:descripcion
            }
            axios.post('/api/Crucigrama',nuevoCrucigrama).then((respuesta)=>{
                console.log("Crucigrama creado"+respuesta);
                setCrucigrama(nuevoCrucigrama); 
            }).catch(resultado=>{
                console.log("No se pudo crear el crucigrama"+resultado)
            })
            alert("Nuevo Crucigrama Creado.");
        }
    }
    useEffect(()=>{
        if(crucigrama)
        axios.get(`/api/Crucigrama?titulo=${crucigrama.Titulo}`).then((respuesta)=>{
            setID_Crucigrama(respuesta.data); 
        })
    },[crucigrama])

    useEffect(()=>{
        console.log(id_Crucigrama); 
    },[id_Crucigrama])

    const CrearPalabra=()=>{
        if(InputPalabraRef.current && TextAreaDescripcionRef.current && SummaryOrientacionRef.current &&InputNumeroRef.current){
            const orientacion:string= SummaryOrientacionRef.current.textContent != null? SummaryOrientacionRef.current.textContent : "";
            const numero=parseInt(InputNumeroRef.current.value);
            const fila= coordenadas? coordenadas.fila : 0; 
            const columna=coordenadas? coordenadas.columna : 0
            const id=Array.isArray(id_Crucigrama)? id_Crucigrama[0] : id_Crucigrama; 

            const nuevaPalabra:Palabra={
                Palabra: InputPalabraRef.current.value,
                Descripcion: TextAreaDescripcionRef.current.value,
                Orientacion: orientacion,
                Fila: fila,
                Columna: columna,
                Numero: numero,
                ID_Crucigrama: id.ID_Crucigrama
            }
            setNuevaPalabra(nuevaPalabra);
            console.log(nuevaPalabra); 

            axios.post('/api/Palabra', nuevaPalabra).then(respuesta=>{
                console.log("Se agregó la palabra"+respuesta);
            }).catch(respuesta=>{
                console.log("No se pudo agregar la palabra"+respuesta); 
            })
            alert("Nueva Palabra Agregada.");
        }
    }

    const elegirOrientacion=(orientacion:string)=>{
        if(SummaryOrientacionRef.current){
            SummaryOrientacionRef.current.textContent=orientacion;
        }
    }

    return(
        <>
            <div style={{display: "block"} as CSSProperties}>
                <h2>Crear Nuevo Crucigrama:</h2>
                <div className="Div_Agregar_Informacion">
                    <h2 className="Titulo_Informacion">Nombre:</h2>
                    <input ref={InputTituloRef} className="Input_Informacion" placeholder="Ingresa el Nombre del Crucigrama"></input>
                </div>
                <div className="Div_Agregar_Informacion">
                    <h2 className="Titulo_Informacion">Descripción:</h2>
                    <textarea ref={InputDescripcionCrucigramaRef} className="Textarea_Informacion" placeholder="Ingresa una Descripción del Crucigrama"></textarea>
                </div>
                <button onClick={()=>CrearCrucigrama()} className="Boton_Informacion">Crear Crucigrama</button>
                <div className="Div_Agregar_Informacion">
                    <h2 className="Titulo_Informacion">Palabra:</h2>
                    <input ref={InputPalabraRef} className="Input_Informacion" placeholder="Ingresa una nueva Palabra"></input>
                </div>
                <div className="Div_Agregar_Informacion">
                    <h2 className="Titulo_Informacion">Coordenadas:</h2>
                    <input readOnly={true} className="Input_Informacion" placeholder={coordenadas? `Fila: ${coordenadas.fila}, Columna: ${coordenadas.columna}`: "Selecciona una Celda"}>
                    </input>
                </div>
                <div className="Div_Agregar_Informacion">
                    <h2 className="Titulo_Informacion">Descripción:</h2>
                    <textarea ref={TextAreaDescripcionRef} className="Textarea_Informacion" id="Descripcion_Palabra" placeholder="Ingresa una Descripción de la Palabra"></textarea>
                </div>
                <div className="Div_Agregar_Informacion">
                    <h2 className="Titulo_Informacion">Número:</h2>
                    <input ref={InputNumeroRef} className="Input_Informacion" placeholder="Ingresa el Número de Palabra">
                    </input>
                </div>
                <div className="Div_Agregar_Informacion">
                    <details className="Expander-Informacion">
                        <summary ref={SummaryOrientacionRef}>Orientación</summary>
                        <div style={{marginBottom: "5px"} as CSSProperties}>
                            <label onClick={()=>elegirOrientacion("Vertical")} className="Label_Details">Vertical</label>
                        </div>
                        <div>
                            <label onClick={()=>elegirOrientacion("Horizontal")} className="Label_Details">Horizontal</label>
                        </div>
                    </details>
                </div>
                <button onClick={()=>CrearPalabra()} className="Boton_Informacion">Agregar Palabra</button>
            </div>
        </>
    )
}