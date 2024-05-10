import { Tablero } from "./Celda";
import { Palabra } from "../Definiciones";
let tablero:Tablero[]=[]; 

export function Inicializar_Array(){
    let elemento=0; 
    let columna=1; 
    let fila=1; 
    while(fila<16){
        columna=1; 
        while(columna<16){
            tablero[elemento]={
                id:elemento,
                fila: fila,
                columna:columna,
                color: "#E6E4E4",
                letra: "",
                inicio: false,
                celda_seleccionada() {}
            }
            columna++;
            elemento++;
        }
        fila++; 
    }
    return tablero;
}

export function Logica_cambiar_color(tablero_array: Tablero[], fila:number, columna:number){
    var index=0; 
        var tamaño:number=tablero_array.length;
        for(let i=0; i<tamaño; i++){
            if(tablero_array[i].fila==fila && tablero_array[i].columna==columna){
                index=tablero_array[i].id; 
            }
        }
        const nuevo_tablero=tablero_array.map(celda=>{
            if(celda.id==index && celda.color=="#E6E4E4"){
                return{
                    ...celda,
                    color: "#6EFD27",
                };
            }
            else if(celda.id==index && celda.color=="#6EFD27"){
                return{
                    ...celda, 
                    color: "#E6E4E4",
                };
            }
            else if(celda.id!=index && celda.color=="#6EFD27"){
                return{
                    ...celda,
                    color:"#E6E4E4"
                };
            }
            else{
                return(celda);
            }
        });
        return(nuevo_tablero); 
}

export function crearPalabra(id:number, palabra:string, descripcion:string, orientacion:string ,celda_inicio:number[]){
    const nuevaPalabra:Palabra={
        id:id, 
        palabra:palabra,
        tamaño:palabra.length,
        descripcion: descripcion, 
        orientacion: orientacion,
        celda_inicio:celda_inicio
    }
    return(nuevaPalabra); 
}

export function dibujarPalabra(fila:number, columna:number, palabra:Palabra, tablero_array: Tablero[], cantidad:number){
    let index:number=0
    let fila_nueva=fila; 
    let columna_nueva=columna;
    if(palabra.orientacion=="Vertical"){
        const nuevo_tablero=tablero_array.map(celda=>{
            if(celda.fila==fila_nueva && celda.columna==columna_nueva && index<palabra.tamaño){
                console.log(`Nueva Letra: ${palabra.palabra[index]} en la celda (${celda.fila},${celda.columna})`);
                index++; 
                fila_nueva++; 
                if(index-1==0){
                    console.log(`La primera letra es ${palabra.palabra[index-1]}`);
                    return{
                        ...celda,
                        numero: cantidad,
                        color:"white",
                        letra:palabra.palabra[index-1]
                    }
                }
                else{
                    return{
                        ...celda,
                        color: "white",
                        letra: palabra.palabra[index-1]
                    }
                }
            }
            else{
                return{...celda}
            }
            
        });
        return(nuevo_tablero);
    }
    else if(palabra.orientacion=="Horizontal"){
        const nuevo_tablero=tablero_array.map(celda=>{
            if(celda.fila==fila_nueva && celda.columna == columna_nueva && index<palabra.tamaño){
                index++;
                columna_nueva++;
                if(index-1==0){
                    console.log(`La primera letra es ${palabra.palabra[index-1]}`);
                    return{
                        ...celda,
                        numero: cantidad,
                        color:"white",
                        letra:palabra.palabra[index-1]
                    }
                }
                else{
                    return{
                        ...celda,
                        color:"white",
                        letra:palabra.palabra[index-1]
                    }
                }
            }
            else{
                return{...celda};
            }
        });
        return nuevo_tablero;
    }
    else{
        return tablero_array;
    }
}