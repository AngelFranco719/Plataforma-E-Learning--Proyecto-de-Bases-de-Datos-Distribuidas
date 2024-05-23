import { CSSProperties } from "react"

interface prop{
    error:number
}

export default function Muñeco({error}:prop){
    return(
        <>
            <div id="Cabeza">
                <div id="Horca"></div>
                <div id="Cabeza_IMG" style={{visibility: error>=1? "visible": "hidden"} as CSSProperties}>
                </div>
                <div style={{display: "flex"}}>
                    <div id="Brazo1" style={{visibility: error>=2? "visible": "hidden"} as CSSProperties}></div>
                    <div id="Cuerpo_IMG" style={{visibility: error>=4? "visible": "hidden"} as CSSProperties}>
                    </div>
                    <div id="Brazo2" style={{visibility: error>=3? "visible": "hidden"} as CSSProperties}>
                    </div>
                </div>
                <div style={{display: "flex"}}>
                    <div id="Pierna1" style={{visibility: error>=6? "visible": "hidden"} as CSSProperties}></div>
                    <div id="Pierna" style={{visibility: error>=5? "visible": "hidden"} as CSSProperties}></div>
                </div>
            </div>
        </>
    )
}