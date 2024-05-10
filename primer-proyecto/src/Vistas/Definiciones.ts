export interface Palabra{
    id: number, 
    palabra:string,
    tamaño: number, 
    descripcion:string,
    orientacion:string,
    celda_inicio: number[]
}

export interface Crucigrama{
    id:number, 
    titulo: string, 
    tematica: string, 
    palabras: Palabra[],
    materia: string; 
}