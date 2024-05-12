import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Curso from './Vistas/Curso'
import Home from './Vistas/Home/Home'
import Perfil from './Vistas/Perfil'
import Header from './Componentes/Header_Perfil/Header';
import Crucigrama from './Vistas/Crucigrama/Crucigrama';
import { useEffect, useState } from 'react';
import Login from './Vistas/Login/login'
import { Perfil_Actual, Perfil_BD } from './ConexionBD/Definiciones';
function App() {
  const[sesion, setSesion]=useState<boolean>(false);
  const[perfil_iniciado, setPerfilIniciado]=useState<boolean>(false);
  const[sesionActual, setSesionActual]=useState<Perfil_BD | null>(null);
  console.log("app");
  useEffect(()=>{
    if(perfil_iniciado){
      setSesionActual(Perfil_Actual);
      console.log(Perfil_Actual)
    }
  },[perfil_iniciado]);
  return (
   <>
    <Router>
    {sesion && <Header perfil={Perfil_Actual}></Header>}
        <Routes>
        {sesion && sesionActual ? (
            <Route path="/" element={<Home {...sesionActual}/>}/>
          ) : (
            <Route path="/" element={<Login setSesion={setSesion} setPerfilIniciado={setPerfilIniciado} />} />
          )}
        <Route path='/Perfil' Component={Perfil}/>
        <Route path='/Curso' Component={Curso}/>
        <Route path='/Crucigrama' Component={Crucigrama}/>
      </Routes>
    </Router>

   </>

  )
}

export default App
