import { useEffect, useState } from "react"
import "./Crucigrama.css"
import { Actividad, Calificacion, Crucigrama_BD, Palabra, Perfil_BD, Perfil_Curso } from "../../ConexionBD/Definiciones"
import axios from "axios";

interface prop{
    setConjuntoPalabras: React.Dispatch<React.SetStateAction<Palabra [] | null>>,
    setResolver: React.Dispatch<React.SetStateAction<boolean>>,
    Correctas: number,
    ID_Crucigrama: number,
    actividad: Actividad,
    perfil: Perfil_BD
}

export default function ResolverCrucigrama({setConjuntoPalabras, setResolver, Correctas, ID_Crucigrama, actividad,perfil}:prop){
    const [id, setID]=useState<{ID_Crucigrama: number}[]>(); 
    const [crucigrama, setCrucigrama]=useState<Crucigrama_BD[]>();
    const [palabras, setPalabra]=useState<Palabra[]>();
    const [aciertosTotal, setAciertosTotal]=useState<number>(0);
    const [pc, setPC]=useState<Perfil_Curso>(); 
    const primer_perfil=Array.isArray(perfil)? perfil[0] : perfil;
    const primer_actividad=Array.isArray(actividad)? actividad[0] : actividad;

    useEffect(()=>{
        axios.get(`/api/Crucigrama?id_crucigrama=${ID_Crucigrama}`).then((respuesta)=>{
            setCrucigrama(respuesta.data); 
        })
        setResolver(true); 
    },[])

    useEffect(()=>{
        if(crucigrama) {
            axios.get(`/api/Crucigrama?titulo=${crucigrama[0].Titulo}`).then((respuesta)=>{
                setID(respuesta.data)
            });
        }   
    },[crucigrama])

    useEffect(()=>{
        if(id){
            axios.get(`/api/Palabra?id_crucigrama=${id[0].ID_Crucigrama}`).then((respuesta)=>{
                setPalabra(respuesta.data); 
            })
        }
    },[id])

    useEffect(()=>{
        if(palabras){
            setConjuntoPalabras(palabras); 
            let aciertos_actual=aciertosTotal; 
            palabras.forEach((palabra)=>{
                aciertos_actual+=palabra.Palabra.length;
                setAciertosTotal(aciertos_actual); 
            })
        }
    },[palabras])

    useEffect(()=>{
        if(pc){
        const fechaDeHoy=new Date(); 
        const año: number = fechaDeHoy.getFullYear();
        const mes: number = fechaDeHoy.getMonth() + 1;
        const día: number = fechaDeHoy.getDate();

        let retroalimentacion; 
        const res=(10/aciertosTotal)* Correctas;
        if(res<7){
            retroalimentacion="Debes estudiar un poco más";
        }
        else{
            retroalimentacion="Muy Bien! Sigue así."
        }
        const calificacion:Calificacion={
            Fecha_Asignacion: `${año}-${mes}-${día}`,
            Resultado: res,
            Retroalimentación: retroalimentacion,
            ID_Actividad: primer_actividad.ID_Actividad,
            ID_PerfilCurso : pc.ID_PerfilCurso
        }
        console.log(calificacion);
        axios.post('/api/Calificacion', calificacion).then(respuesta=>{
            alert("Se calificó la actividad"+respuesta);
        }).catch(respuesta=>{
            alert("Error al registrar la calificación"+respuesta)
        })
        }
    },[pc])

    const nuevaCalificacion=()=>{
        axios.get(`/api/Perfil-Curso?id_curso=${primer_actividad.ID_Curso}&&id_perfil=${primer_perfil.ID_Perfil}`).then((respuesta)=>{
            setPC(respuesta.data[0]);
        })
    }

    return(
        <>
            <div id="Resolver_Div">
                <h2>{crucigrama? crucigrama[0].Titulo : "Not Found"}</h2>
                <p id="Descripcion_Crucigrama">{crucigrama? crucigrama[0].Descripcion : "Not Found"}</p>
                <div id="Palabras_Crucigrama">
                    <div id="Palabras_Verticales">
                        <h2>Vertical:</h2>
                        {palabras?.map((palabra, index)=>{
                            if(palabra.Orientacion=="Vertical"){
                                return(
                                    <p key={index} className="Descripcion_Palabra">{`${palabra.Numero}.-${palabra.Descripcion}`}</p>
                                )
                            }
                            else{
                                return;
                            }
                        })}
                    </div>
                    <div id="Palabras_Horizontales">
                        <h2>Horizontal:</h2>
                        {palabras?.map((palabra, index)=>{
                            if(palabra.Orientacion=="Horizontal"){
                                return(
                                    <p key={index} className="Descripcion_Palabra">{`${palabra.Numero}.-${palabra.Descripcion}`}</p>
                                )
                            }
                        })}
                    </div>
                </div>
                <div>
                    <h2>{`Aciertos: ${Correctas}/${aciertosTotal}`}</h2>
                    <button onClick={()=>nuevaCalificacion()}>Enviar Calificación</button>
                </div>
            </div>
        </>
    )
}