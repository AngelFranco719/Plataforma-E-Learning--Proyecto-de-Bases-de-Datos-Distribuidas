import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Curso from './Vistas/Curso'
import Home from './Vistas/Home/Home'
import Perfil from './Vistas/Perfil'
import Header from './Componentes/Header_Perfil/Header';
import Crucigrama from './Vistas/Crucigrama/Crucigrama';

function App() {
  return (
   <>
    <Router>
    <Header></Header>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/Perfil' Component={Perfil}/>
        <Route path='/Curso' Component={Curso}/>
        <Route path='/Crucigrama' Component={Crucigrama}/>
      </Routes>
    </Router>

   </>

  )
}

export default App
