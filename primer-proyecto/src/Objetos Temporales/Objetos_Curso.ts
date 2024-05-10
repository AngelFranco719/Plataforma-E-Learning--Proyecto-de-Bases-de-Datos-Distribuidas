export interface Curso{
    name: string
    author: string
    color: string
    imagen: URL
    semestre: string
    carrera: string
  }
  const cursos:Curso[]=[]
  cursos[0]={
    name: "Bases de Datos Distribuidas",
    author: "Eduardo Cornejo",
    color: "#D7FFE1",
    imagen: new URL("https://i.pinimg.com/564x/e8/16/5d/e8165d011d57c7cca6656c1ce635c4bf.jpg"),
    semestre: "Sexto Semestre",
    carrera: "Ciencias Computacionales"
  }
  cursos[1]={
    name:"Inteligencia Artificial",
    author:"Edrein Marcela",
    color: "#FFDCD7",
    imagen:new URL("https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-260nw-1433809409.jpg"),
    semestre: "Quinto Semestre",
    carrera: "Ciencias Computacionales"
  }
  cursos[2]={
    name:"Metodología de la investigación",
    author:"Carmen Vera",
    color:"#CFA6FF",
    imagen: new URL("https://www.shutterstock.com/image-photo/pretty-indianasian-young-girl-trendy-260nw-426541432.jpg"),
    semestre: "Sexto Semestre",
    carrera: "Ciencias Computacionales"
  }
  cursos[3]={
    name:"Metodología de la investigación",
    author:"Carmen Vera",
    color:"#CFA6FF",
    imagen: new URL("https://www.shutterstock.com/image-photo/pretty-indianasian-young-girl-trendy-260nw-426541432.jpg"),
    semestre: "Sexto Semestre",
    carrera: "Ciencias Computacionales"
  }

  export default function Devolver_Cursos(){
    return(
        cursos 
    )
  }