import { CSSProperties, useEffect, useRef, useState } from "react"
import "./Examen.css"
import { Examen, Opcion, Pregunta } from "../../ConexionBD/Definiciones";
import axios from "axios";
export default function CrearExamen(){
    const [id_examen, setID_Examen]=useState<{ID_Examen:number}[]>(); 
    const [preguntas, setPreguntas]=useState<Pregunta[]>(); 
    const [id_pregunta, setID_Pregunta]=useState<{ID_Pregunta:number}[]>(); 
    const[opciones, setOpciones]=useState<Opcion[]>(); 

    const InputTituloRef=useRef<HTMLInputElement>(null);
    const TextAreaDescripcionRef=useRef<HTMLTextAreaElement>(null);
    const InputPreguntaRef=useRef<HTMLInputElement>(null);
    const InputNumeroRef=useRef<HTMLInputElement>(null);
    const InputOpcionRef=useRef<HTMLInputElement>(null);
    const InputIncisoRef=useRef<HTMLInputElement>(null);
    const DetailsEvaluacionRef=useRef<HTMLDetailsElement>(null);
    useEffect(()=>{
       if(id_pregunta && preguntas) {
            preguntas[preguntas?.length-1].ID_Pregunta=id_pregunta[0].ID_Pregunta;
            console.log(preguntas);
       }
    },[id_pregunta])

    const CrearExamen=()=>{
        if(InputTituloRef.current && TextAreaDescripcionRef.current){
            const NuevoExamen:Examen={
                Titulo: InputTituloRef.current.value,
                Descripcion: TextAreaDescripcionRef.current.value
            }
            axios.post(`/api/Examen`, NuevoExamen).then(respuesta=>{
                alert("Nuevo Examen Creado"+respuesta)
                axios.get(`/api/Examen?titulo=${NuevoExamen.Titulo}`).then((resultado)=>{
                    setID_Examen(resultado.data);
                    console.log(resultado.data)
                })
            }).catch(respuesta=>{
                alert("No se pudo crear el examen"+respuesta)
            })
        }
    }

    const AgregarPregunta=()=>{
        const nuevo_arreglo= preguntas? preguntas : [];
        if(InputPreguntaRef.current && InputNumeroRef.current){
            const nuevaPregunta={
                Pregunta:InputPreguntaRef.current.value,
                Numero: parseInt(InputNumeroRef.current.value),
                ID_Examen: id_examen? id_examen[0].ID_Examen : 0
            }

            axios.post('/api/Pregunta',nuevaPregunta).then(respuesta=>{
                alert("Se creó una nueva pregunta"+respuesta);
                axios.get(`/api/Pregunta?pregunta=${nuevaPregunta.Pregunta}`).then((resultado)=>{
                    setID_Pregunta(resultado.data);
                })

            }).catch(respuesta=>{
                alert("No se pudo crear la Pregunta"+respuesta)
            })

            const pregunta:Pregunta={
                ID_Pregunta:null,
                Pregunta:InputPreguntaRef.current.value,
                Numero: parseInt(InputNumeroRef.current.value),
                ID_Examen: id_examen? id_examen[0].ID_Examen : 0
            }

            nuevo_arreglo.push(pregunta);
        }
        setPreguntas([...nuevo_arreglo]);
    }

    const CambiarDetails=(evaluacion: string)=>{
        if(DetailsEvaluacionRef.current){
            DetailsEvaluacionRef.current.textContent=evaluacion;
        }
    }

    const AgregarOpcion=()=>{
        const nuevo_arreglo=opciones? opciones : [];
        if(InputOpcionRef.current && InputIncisoRef.current && DetailsEvaluacionRef.current){
            const nuevaOpcion:Opcion={
                Contenido: InputOpcionRef.current.value,
                Evaluacion: DetailsEvaluacionRef.current.textContent? DetailsEvaluacionRef.current.textContent : "",
                Inciso: InputIncisoRef.current.value,
                ID_Pregunta: id_pregunta? id_pregunta[id_pregunta.length-1].ID_Pregunta : 0
            }
            axios.post('/api/Opcion', nuevaOpcion).then(respuesta=>{
                alert("Se ha agregado la opcion"+respuesta);
            }).catch(respuesta=>{
                alert("No se pudo agregar la opcion"+respuesta);
            })
            nuevo_arreglo.push(nuevaOpcion); 
        }
        setOpciones([...nuevo_arreglo]);
    }
    return(
        <>
        <div id="Div_CrearExamen">
            <div id="Informacion_Examen">
                <h2>Crear un Examen:</h2>
                <div className="Bloque_Informacion">
                    <h2 className="TituloInformacion">Titulo del Examen:</h2>
                    <input ref={InputTituloRef} className="Input_InformacionExamen" type="text" placeholder="Ingresa el Titulo del Examen"></input>
                </div>
                <div className="Bloque_Informacion">
                    <h2 className="TituloInformacion">Descripción:</h2>
                    <textarea ref={TextAreaDescripcionRef} className="Textarea_InformacionExamen" placeholder="Ingresa una Breve Descripción"></textarea>
                </div>
                <button onClick={()=>CrearExamen()} className="Button_Examen">Crear Examen</button>
                <div className="Bloque_Informacion">
                    <h2 className="TituloInformacion">Pregunta:</h2>
                    <input ref={InputPreguntaRef} className="Input_InformacionExamen" placeholder="Ingresa una Pregunta"></input>
                </div>
                <div className="Bloque_Informacion">
                    <h2 className="TituloInformacion">Número:</h2>
                    <input ref={InputNumeroRef} className="Input_InformacionExamen" placeholder="Número de Pregunta"></input>
                </div>
                <button className="Button_Examen" onClick={()=>AgregarPregunta()}>Agregar Pregunta.</button>
                <div className="Bloque_Informacion">
                    <h2 className="TituloInformacion">Opción:</h2>
                    <input ref={InputOpcionRef} className="Input_InformacionExamen" placeholder="Ingresa una Opción"></input>
                    <input ref={InputIncisoRef} className="Input_InformacionExamen" id="Input_Inciso" placeholder="Inciso"></input>
                </div>
                <details className="Summary_Examen">
                    <summary ref={DetailsEvaluacionRef}>Evaluación</summary>
                    <div className="Div_Summary_Evaluacion">
                        <label onClick={()=>CambiarDetails("Correcta")} style={{cursor: "pointer"} as CSSProperties}>Correcta</label>
                    </div>
                    <div className="Div_Summary_Evaluacion">
                        <label onClick={()=>CambiarDetails("Incorrecta")} style={{cursor: "pointer"} as CSSProperties}>Incorrecta</label>
                    </div>
                </details>
                <button onClick={()=>AgregarOpcion()} className="Button_Examen">Agregar Opcion</button>
            </div>
            <div id="Mostrar_Prev_Examen">
                <h2>Previsualización: </h2>
                {preguntas? preguntas.map((pregunta,index)=>{ 
                        return(
                            <>
                            <details className="Details_Prev_Preguntas">
                                <summary key={index}>{`${pregunta.Numero}.-${pregunta.Pregunta}`}</summary>
                                {opciones? opciones.map((opcion, indexe)=>{
                                    if(opcion.ID_Pregunta===pregunta.ID_Pregunta){
                                        return(
                                            <>
                                            <div key={indexe} className="Div_Details_Prev">
                                                <label>{`${opcion.Inciso} ${opcion.Contenido}`}</label>
                                            </div>
                                            </>
                                        )
                                    }
                                }) : undefined}
                            </details>
                            </>
                        )
                    }) : undefined}
            </div>
        </div>
        
        </>
    )
}