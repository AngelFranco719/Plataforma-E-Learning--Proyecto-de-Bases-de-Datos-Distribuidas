import { AxiosResponse } from "axios"

export interface Perfil_BD{
    ID_Perfil: number,
    Email: string,
    Contraseña: string, 
    Tipo_Perfil: string, 
    Biografia: string,
    Foto_Perfil: string, 
    ID_Alumno:number | null,
    ID_Profesor: number | null
};

export interface Alumno{
    ID_Alumno:number,
    Nombre:string,
    Edad:number, 
    institucion:string,
    carrera:string,
    semestre: string,
    grupo: string
}

export interface Perfil_Alumno{
    ID_Perfil:number,
    Email: string,
    Contraseña: string, 
    Tipo_Perfil: string, 
    Biografia: string,
    Foto_Perfil: string, 
    Nombre:string,
    Edad:number, 
    Institucion:string,
    Carrera:string,
    Semestre: string,
    Grupo: string
}

export interface Perfil_Profesor{
    ID_Perfil: number,
    Email: string,
    Contraseña: string, 
    Tipo_Perfil: string, 
    Biografia: string,
    Foto_Perfil: string, 
    Nombre:string,
    Institucion:string,
    NivelAcademico:string,
    Licenciatura:string,
    Especializacion:string
}

export interface Publicacion{
    ID_Publicacion:number,
    Titulo: string,
    Categoria:string,
    Contenido: string,
    ID_PerfilCurso: number
}

export interface Publicacion_Autor{
    ID_Publicacion:number,
    ID_Curso: number,
    Titulo: string,
    Categoria:string,
    Contenido: string,
    Foto_Perfil: string,
    Nombre:string
}

export interface Curso{
    ID_Curso: number,
    Nombre:string,
    Descripcion:string, 
    Autor:string,
    Fecha_Creacion:string, 
    Fecha_Final:string,
    Dificultad:string,
    Semestre:string,
    Grupo:string,
    Licenciatura:string
}

export interface Perfil_Curso{
    ID_PerfilCurso:number,
    Fecha_Inscripcion:string, 
    ID_Perfil:number,
    ID_Curso:number,
    ID_Calificacion:number,
    ID_Equipo:number
}

export interface Actividad{
    ID_Actividad: number,
    ID_Curso: number,
    Titulo: string,
    Fecha_Publicacion:string,
    Fecha_limite:string,
    Descripcion: string,
    Dificultad: string,
    Tipo: string
}

export interface Profesor{
    ID_Profesor:number,
    Nombre:string,
    Institucion:string,
    NivelAcademico:string,
    Licenciatura:string,
    Especializacion:string
}

export var Perfil_Actual:Perfil_BD;
export var Alumno_Actual:Alumno; 

export function Crear_Sesion_Perfil(respuesta:AxiosResponse){
    Perfil_Actual=respuesta.data; 
}
