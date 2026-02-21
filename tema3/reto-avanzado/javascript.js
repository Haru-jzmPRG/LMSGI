const mensajes = [
    "Si llegas aquí, podrías ser de IDAW.",
    "No vas mal, estás alcanzando cierto nivel. Pareces Arbeloa.",
    "Uff! Esto ya es otra cosa. Flick estaría orgulloso.",
    "Te has subido al gran FUNESBUQUE."
];

let indice = 0;

const boton = document.getElementById("boton");
const botonReset = document.getElementById("reset");
const salida = document.getElementById("salida");

boton.addEventListener("click", () => {
    salida.textContent = mensajes[indice];
    indice++;

    if (indice === mensajes.length) {
        indice = 0;
    }
});

botonReset.addEventListener("click", () => {
    indice = 0;
    salida.textContent = "";
});
