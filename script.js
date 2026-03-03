"use strict"/*Medidas para mi tabla*/
const midaCasella = 100
const numFiles = 3
const numColumnes = 3

let posicioActual={
    fila: 0,
    columna: 0
}

function inici(){
    const refCSSRoot = document.documentElement
    refCSSRoot.style.setProperty("--mida",midaCasella+"px")
    refCSSRoot.style.setProperty("--files",numFiles)
    refCSSRoot.style.setProperty("--columnes",numColumnes)
}
