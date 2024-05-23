import { useEffect, useState } from "react"
import "./Ahogado.css"
import Muñeco from "./Muñeco"
import { Actividad, Ahogado, Calificacion, Concepto, Perfil_BD, Perfil_Curso} from "../../ConexionBD/Definiciones"
import axios from "axios"
import InputAhogado from "./InputAhogado"

interface prop{
    ID_Ahogado:number,
    actividad:Actividad, 
    perfil:Perfil_BD | undefined
}

export default function ResolverAhogado({ID_Ahogado, actividad, perfil}:prop){
    const [error, setError]=useState<number>(0);
    const [acierto, setAcierto]=useState<number>(0);
    const [ahogado, setAhogado]=useState<Ahogado[]>();
    const [concepto, setConcepto]=useState<Concepto[]>(); 
    const [caracteres, setCaracteres]=useState<string[]>(); 
    const [status, setStatus]=useState<string>(); 
    const [pc, setPC]=useState<Perfil_Curso>(); 
    const primer_actividad=Array.isArray(actividad)? actividad[0] : actividad;
    const primer_perfil=Array.isArray(perfil)? perfil[0] : perfil;

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

    useEffect(()=>{
        if(status){
            axios.get(`/api/Perfil-Curso?id_curso=${primer_actividad.ID_Curso}&&id_perfil=${primer_perfil.ID_Perfil}`).then(respuesta=>{
                setPC(respuesta.data[0]);
            })
        }
    },[status])
    useEffect(()=>{
        if(pc){
            const fechaDeHoy=new Date(); 
            const año: number = fechaDeHoy.getFullYear();
            const mes: number = fechaDeHoy.getMonth() + 1;
            const día: number = fechaDeHoy.getDate();
            let calificacion; 
            if(status=="Ganaste") calificacion=10;
            else calificacion=6;
            let retroalimentacion; 
            if(calificacion<7){
                retroalimentacion="Debes estudiar un poco más";
            }
            else{
                retroalimentacion="Muy Bien! Sigue así."
            }

            const nueva_calificacion:Calificacion={
                Fecha_Asignacion: `${año}-${mes}-${día}`,
                Resultado: calificacion,
                Retroalimentación: retroalimentacion,
                ID_Actividad:primer_actividad.ID_Actividad,
                ID_PerfilCurso: primer_perfil.ID_Perfil
            }
            axios.post('/api/Calificacion',nueva_calificacion).then(respuesta=>{
                alert("Se registró la calificación"+respuesta);
            }).catch(resultado=>{
                alert("No se pudo registrar la calificación"+resultado);
            })
        }
    },[pc])

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