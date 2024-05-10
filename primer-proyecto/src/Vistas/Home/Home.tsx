import Devolver_Cursos from "../../Objetos Temporales/Objetos_Curso"
import {Curso} from "../../Objetos Temporales/Objetos_Curso"
import Tarjeta from "../../Componentes/Tarjetas/Tarjetas"
import { Perfil } from "../../Objetos Temporales/Objetos_Perfil"
import Devolver_Perfiles from "../../Objetos Temporales/Objetos_Perfil"
import "./Home.css"
var cursos:Curso[]=Devolver_Cursos(); 
const Perfiles:Perfil[]=Devolver_Perfiles(); 
export default function Home(){
    return(
        <>
        <div className="div_global">
        <div className="div_titulo">
            <h1 className="h1_bienvenida">Bienvenid@ {Perfiles[0].name}:</h1>
        </div>
        
        <div className="div_tarjetas">
            {
                cursos.map(function(curso,index){
                    return <Tarjeta key={index} curso={curso}/>
                })
            }
        </div>
        </div>
        </> 
    )  
}