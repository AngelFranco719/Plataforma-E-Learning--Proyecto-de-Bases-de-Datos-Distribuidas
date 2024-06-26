import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Curso_Vista from './Vistas/Curso/Curso_Vista';
import Home from './Vistas/Home/Home'
import Perfil from './Vistas/Perfil/Perfil';
import Header from './Componentes/Header_Perfil/Header';
import Crucigrama from './Vistas/Crucigrama/Crucigrama';
import { useEffect, useState } from 'react';
import Login from './Vistas/Login/login'
import { Actividad, Curso, Perfil_Actual, Perfil_BD } from './ConexionBD/Definiciones';
import ActividadActual from './Vistas/Actividad/ActividadActual';
import Examen from './Vistas/Examen/Examen';
import Ahogado from './Vistas/Ahogado/Ahogado';
import CrearActividad from './Vistas/CrearActividad/CrearActividad';
function App() {
  const[sesion, setSesion]=useState<boolean>(false);
  const[perfil_iniciado, setPerfilIniciado]=useState<boolean>(false);
  const[sesionActual, setSesionActual]=useState<Perfil_BD | null>(null);
  const[cursoActual, setCurso]=useState<Curso | undefined>();
  const[actividadActual, setActividad]=useState<Actividad | undefined>(); 

  useEffect(()=>{
    if(perfil_iniciado){
      setSesionActual(Perfil_Actual);
    }
  },[perfil_iniciado]);

  useEffect(()=>{
    console.log(actividadActual);
  },[actividadActual])

  return (
   <>
    <Router>
    {sesion && sesionActual && <Header perfil={sesionActual}></Header>}
        <Routes>
        {sesion && sesionActual ? (
            <Route path="/" element={<Home perfilActual={sesionActual} setCurso={setCurso}/>}/>
          ) : (
            <Route path="/" element={<Login setSesion={setSesion} setPerfilIniciado={setPerfilIniciado} />} />
          )}
        {sesion && sesionActual && <Route path='/Perfil' element={<Perfil perfil={sesionActual}></Perfil>}/> }
        {sesion && sesionActual && cursoActual &&<Route path='/Curso' element={<Curso_Vista perfilActual={sesionActual} cursoActual={cursoActual} setActividad={setActividad}></Curso_Vista>}/>}
        {sesion && sesionActual && cursoActual && actividadActual && <Route path='/Actividad' element={<ActividadActual perfil={sesionActual} actividad={actividadActual}></ActividadActual>}/>}
        {sesion && sesionActual && cursoActual && actividadActual && <Route path='/ResolverCrucigrama' element={<Crucigrama perfil={sesionActual} actividad={actividadActual}></Crucigrama>}></Route>}
        {sesion && sesionActual && cursoActual && actividadActual && <Route path='/Examen' element={<Examen perfil={sesionActual} actividad={actividadActual}></Examen>}></Route>}
        {sesion && sesionActual && cursoActual && actividadActual && <Route path='/Ahogado' element={<Ahogado perfil={sesionActual} actividad={actividadActual}></Ahogado>}></Route>}
        {sesion && sesionActual && cursoActual && <Route path='/CrearActividad' element={<CrearActividad curso={cursoActual}></CrearActividad>}></Route>}
        <Route path='/Crucigrama' element={<Crucigrama perfil={undefined} actividad={undefined}></Crucigrama>}></Route>
        <Route path='/CrearExamen' element={<Examen perfil={undefined} actividad={undefined}></Examen>}></Route>
        <Route path='/CrearAhogado' element={<Ahogado perfil={undefined} actividad={undefined}></Ahogado>}></Route>
      </Routes>
    </Router>

   </>

  )
}

export default App
