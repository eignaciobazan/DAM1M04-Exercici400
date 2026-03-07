"use strict"/*Medidas para mi tabla*/
const midaCasella = 100
const numFiles = 3
const numColumnes = 3

let posicioActual={
    fila: 0,
    columna: 0
}
/*Definimos el valos del tablero*/
function inici(){
    const refCSSRoot = document.documentElement
    refCSSRoot.style.setProperty("--mida",midaCasella+"px")
    refCSSRoot.style.setProperty("--files",numFiles)
    refCSSRoot.style.setProperty("--columnes",numColumnes)

    // Obtenir referència al tauler on es col·locaran les caselles
  const refTauler = document.getElementById("tauler")

  // Afegir caselles al tauler
  for (let fila = 0; fila < numFiles; fila++) {
    for (let columna = 0; columna < numColumnes; columna++) {

      const refCasella = document.createElement("div")
      refCasella.classList.add("casella")
      refCasella.addEventListener("click", () => mouFitxa(fila, columna))
      refCasella.textContent = `${fila * numColumnes + columna}`
      refCasella.style.left = `${columna * midaCasella}px`
      refCasella.style.top = `${fila * midaCasella}px`
      refTauler.appendChild(refCasella)
      
    }
  }

  // Crear la fitxa blava que es mourà pel tauler
  var refFitxa = document.createElement("div")
  refFitxa.setAttribute("id", "fitxaBlava")

  // Afegir la fitxa blava al tauler
  refTauler.appendChild(refFitxa)

  // Afegir event al botó de reset
  const refReset = document.getElementById("btnReinici")
  refReset.addEventListener("click", reinicia)

  reinicia()
}
