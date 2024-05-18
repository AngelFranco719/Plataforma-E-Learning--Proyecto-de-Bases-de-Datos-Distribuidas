import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Curso_Vista from './Vistas/Curso/Curso_Vista';
import Home from './Vistas/Home/Home'
import Perfil from './Vistas/Perfil/Perfil';
import Header from './Componentes/Header_Perfil/Header';
import Crucigrama from './Vistas/Crucigrama/Crucigrama';
import { useEffect, useState } from 'react';
import Login from './Vistas/Login/login'
import { Curso, Perfil_Actual, Perfil_BD } from './ConexionBD/Definiciones';
import Actividad from './Vistas/Actividad/Actividad';
function App() {
  const[sesion, setSesion]=useState<boolean>(false);
  const[perfil_iniciado, setPerfilIniciado]=useState<boolean>(false);
  const[sesionActual, setSesionActual]=useState<Perfil_BD | null>(null);
  const[cursoActual, setCurso]=useState<Curso | undefined>();
  useEffect(()=>{
    if(perfil_iniciado){
      setSesionActual(Perfil_Actual);
    }
  },[perfil_iniciado]);

  useEffect(()=>{
    console.log(cursoActual);
  },[cursoActual])
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
        {sesion && sesionActual && cursoActual &&<Route path='/Curso' element={<Curso_Vista cursoActual={cursoActual}></Curso_Vista>}/>}
        {sesion && sesionActual && cursoActual && <Route path='/Actividad' Component={Actividad}/>}
        <Route path='/Crucigrama' Component={Crucigrama}/>
      </Routes>
    </Router>

   </>

  )
}

export default App
