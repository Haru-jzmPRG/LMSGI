let contador = 0;

const botonClick = document.getElementById("boton");
const botonReset = document.getElementById("reset");
const salida = document.getElementById("salida");

botonClick.addEventListener("click", function () {
    contador++;
    console.log(`Salida: has hecho ${contador} click(s)`);
    salida.textContent = `Salida: Has hecho ${contador} click(s)`;
});

botonReset.addEventListener("click", function () {
    contador = 0;
    console.log("Salida: contador a 0");
    salida.textContent = "Salida: Contador a 0";
});
