import React, { useRef, useState } from "react";
import "./login.css"
import axios from "axios";

export default function login({setSesion}:{setSesion: React.Dispatch<React.SetStateAction<boolean>>}){
const [iniciado,setIniciado]=useState<boolean>(false);
const email_ref=useRef<HTMLInputElement>(null);
const contraseña_ref=useRef<HTMLInputElement>(null);
const iniciar_sesion=()=>{
    const email=email_ref.current?.value; 
    const contraseña=contraseña_ref.current?.value;
    console.log(`Email: ${email} Contraseña: ${contraseña}`);
    axios.get(`/api/Perfiles?email=${email}&contraseña=${contraseña}`).then((respuesta)=>{
        console.log(respuesta.data);
    })
    setSesion(true);
    setIniciado(true);
};

if(iniciado){
    return(<></>);
}
else{
    return(
        <>
        <div id="div_login">
            <div id="div_login_content">
                <h1 id="h1_titulo_login">Curseando</h1>
                <h2 id="h2_login_sesion">Iniciar Sesión:</h2>
                <input className="input_login" type="text" placeholder="Ingresa tu Email" ref={email_ref}></input>
                <input className="input_login" type="password" placeholder="Ingresa tu Contraseña" ref={contraseña_ref}></input>
                <button id="Button_ingresar" onClick={iniciar_sesion}>Ingresar</button>
            </div>
        </div>
        </>
    );
}
}