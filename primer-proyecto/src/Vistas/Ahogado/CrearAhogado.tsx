import { useEffect, useRef, useState } from "react"
import "./Ahogado.css"
import axios from "axios";
import { Ahogado, Concepto } from "../../ConexionBD/Definiciones";
export default function CrearAhogado(){
    const [ahogado, setAhogado]=useState<Ahogado>();
    const [id, setID]=useState<{ID_Ahogado:number}[]>();
    const InputTituloAhogadoRef=useRef<HTMLInputElement>(null);
    const TextAreaDescripcionAhogadoRef=useRef<HTMLTextAreaElement>(null);
    const InputConceptoRef=useRef<HTMLInputElement>(null);
    const TextAreaDescripcionRef=useRef<HTMLTextAreaElement>(null);

    useEffect(()=>{
        if(ahogado){
            axios.get(`/api/Ahogado?titulo=${ahogado.Titulo}`).then(respuesta=>{
                setID(respuesta.data);
            })
        }
    },[ahogado])
    useEffect(()=>{
        if(id) console.log(id);
    },[id])

    const crearAhogado=()=>{
        if(InputTituloAhogadoRef.current && TextAreaDescripcionAhogadoRef.current){
            const nuevoAhogado={
                Titulo: InputTituloAhogadoRef.current.value,
                Descripcion: TextAreaDescripcionAhogadoRef.current.value
            }
            axios.post('/api/Ahogado', nuevoAhogado).then(respuesta=>{
                alert("Se ha creado el Ahogado"+respuesta);
            }).catch(error =>{
                alert("Error al crear el Ahogado"+error);
            })
            const formatoAhogado:Ahogado={
                ID_Ahogado:null,
                Titulo: InputTituloAhogadoRef.current.value,
                Descripcion: TextAreaDescripcionAhogadoRef.current.value
            }
            setAhogado(formatoAhogado)
        }
    }

    const AgregarConcepto=()=>{
        if(InputConceptoRef.current && TextAreaDescripcionRef.current){
            const nuevoConcepto:Concepto={
                Concepto: InputConceptoRef.current.value,
                Descripcion: TextAreaDescripcionRef.current.value,
                ID_Ahogado: id? id[0].ID_Ahogado : 0
            }
            console.log(nuevoConcepto);
            axios.post('/api/Concepto', nuevoConcepto).then(respuesta=>{
                alert("Concepto Agregado"+respuesta);
            }).catch(respuesta=>{
                alert("Error al agregar el concepto"+respuesta);
            })
        }
    }


    return(
        <>
            <div id="Div_CrearAhogado">
                <h1 id="Titulo_CrearAhogado">Crear un Nuevo Ahogado:</h1>
                <div className="Div_Informacion_CA">
                    <h2 className="Titulo_Informacion_CA">Titulo del Ahogado:</h2>
                    <input ref={InputTituloAhogadoRef} className="Input_Informacion_CA" type="text" placeholder="Ingresa un Titulo para el Ahogado."></input>
                </div>
                <div className="Div_Informacion_CA">
                    <h2 className="Titulo_Informacion_CA">Descripción del Ahogado:</h2>
                    <textarea ref={TextAreaDescripcionAhogadoRef} className="TextArea_Informacion_CA" placeholder="Ingresa una Descripción para el Ahogado."></textarea>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
                    <button onClick={()=>crearAhogado()} className="Button_Informacion_CA">Crear Ahogado</button>
                </div>
                <div className="Div_Informacion_CA">
                    <h2 className="Titulo_Informacion_CA">Concepto:</h2>
                    <input ref={InputConceptoRef} className="Input_Informacion_CA" type="text" placeholder="Ingresa un Concepto."></input>
                </div>
                <div className="Div_Informacion_CA">
                    <h2 className="Titulo_Informacion_CA">Descripción del Concepto:</h2>
                    <textarea ref={TextAreaDescripcionRef} className="TextArea_Informacion_CA" placeholder="Ingresa una Descripción."></textarea>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
                    <button onClick={()=>AgregarConcepto()} className="Button_Informacion_CA">Agregar Concepto</button>
                </div>
            </div>
        </>
    )
}