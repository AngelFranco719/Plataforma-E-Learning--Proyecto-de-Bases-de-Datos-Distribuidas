import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Curso from './Vistas/Curso'
import Home from './Vistas/Home/Home'
import Perfil from './Vistas/Perfil'
import Header from './Componentes/Header_Perfil/Header';
import Crucigrama from './Vistas/Crucigrama/Crucigrama';
import { useState } from 'react';
import Login from './Vistas/Login/login'
function App() {
  const[sesion, setSesion]=useState<boolean>(false);
  console.log("App reiniciada");
  return (
   <>
    <Router>
    {sesion && <Header></Header>}
      <Routes>
        <Route path='/' element={sesion ? <Home></Home> : <Navigate to="/login" replace/>}/>
        <Route path='/Perfil' Component={Perfil}/>
        <Route path='/Curso' Component={Curso}/>
        <Route path='/Crucigrama' Component={Crucigrama}/>
        <Route path='/login' element={sesion ? <Navigate to={"/"}/> : <Login setSesion={setSesion}/> }/>
      </Routes>
    </Router>

   </>

  )
}

export default App
