import "./Calificaciones.css"

export default function Calificaciones(){
    return(
        <>
        <div id="Columna2">
            <div id="Div_Calificacion_Principal">
                    <h1 id="Titulo_Calificacion">Calificación:</h1>
                    <h2 id="Status">No Entregado</h2>
                    <div className="Div_horizontal">
                        <h2 className="Asignacion">Fecha de Evaluación: 10/02/2024</h2>
                    </div>
                    <div id="Calificacion">
                        10
                    </div>
                    <h2 id="Retroalimentacion_Titulo">Retroalimentacion:</h2>
                    <p id="Retroalimentacion">Hiciste un excelente trabajo identificando los temas principales del poema. Tus observaciones sobre el simbolismo utilizado por el autor fueron muy perspicaces.</p>
            </div>
        </div>
            
        </>
    )
}