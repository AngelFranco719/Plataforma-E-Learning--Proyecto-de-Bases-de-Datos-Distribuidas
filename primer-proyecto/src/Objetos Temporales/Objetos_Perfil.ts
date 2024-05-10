export interface Perfil{
    name: string
    institucion: string
    carrera: string
    semestre: string
    grupo: string
    email: string
    contraseña: string
    foto_perfil: string
    tipo_perfil: string 
}
const perfiles:Perfil[]=[]
perfiles[0]={
    name: "Angel David Franco Hernández",
    institucion: "Universidad Autónoma del Estado de Hidalgo",
    carrera: "Licenciatura en Ciencias Computacionales", 
    semestre: "Sexto",
    grupo: "2",
    email: "fr397783@uaeh.edu.mx",
    contraseña: "fr397783",
    foto_perfil: "https://static.guiainfantil.com/uploads/educacion/alumno-agresivo-clase-libro-p.jpg",
    tipo_perfil: "Alumno"
}

export default function Devolver_Perfiles(){
    return(
        perfiles
    )
}