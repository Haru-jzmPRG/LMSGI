let valorActual = "0"; // Valor que se muestra actualmente en la pantalla
let valorAnterior = null; // Valor almacenado para la operación
let operadorActual = null; // Operador seleccionado para la operación
let resultadoMostrado = false; // Indica si se ha mostrado un resultado de operación

//Obtener los elementos de la web necesarios a partir del DOM
const pantalla = document.querySelector(".screen");
const botonIgual = document.querySelector(".equal");
const botonPunto = document.querySelector(".spot");

const botonesControl = document.querySelectorAll(".control");
const botonCE = botonesControl[0];
const botonC = botonesControl[1];
const botonBack = botonesControl[2];

const botonesInmediatos = document.querySelectorAll(".immediately");
const botonInversa = botonesInmediatos[0];
const botonCuadrado = botonesInmediatos[1];
const botonRaiz = botonesInmediatos[2];

const botonesNumeros = [...document.querySelectorAll(".num")];
const botonesOperacion = document.querySelectorAll(".operation");

/**
 * @brief Ejecuta la inicialización de la calculadora una vez que el DOM está completamente cargado.
 *
 * Esta función prepara todo lo necesario para que la calculadora funciones, incluyendo la configuración de la interfaz, los valores iniciales de las variables necesarias y la vinculación de eventos a los controles.
 *
 */
document.addEventListener("DOMContentLoaded", () => {
    actualizarPantalla();
    habilitarPunto();
});

/**
 * @brief Deshabilita el botón del punto decimal en la calculadora.
 *
 * Cambia el estado del botón para evitar que el usuario introduzca múltiples puntos decimales en un mismo número. 
 * Además, actualiza su clase CSS para reflejar visualmente que está deshabilitado.
 *
 */
function deshabilitarPunto() {
    botonPunto.disabled = true;
    botonPunto.classList.remove("enabled");
    botonPunto.classList.add("disabled");
}

/**
 * @brief Habilita nuevamente el botón del punto decimal en la calculadora.
 *
 * Esta función restaura la capacidad de usar el punto decimal, normalmente después de haber introducido una operación o un número válido.
 * Además, actualiza su clase CSS para reflejar visualmente que está activo.
 *
 */
function habilitarPunto() {
    botonPunto.disabled = false;
    botonPunto.classList.remove("disabled");
    botonPunto.classList.add("enabled");
}

/**
 * @brief Actualiza el contenido mostrado en la pantalla de la calculadora.
 *
 * Esta función se encarga de mostrar en la pantalla el número con el que se opera, aplicando controles para evitar desbordamientos visuales o resultados demasiado largos.
 *
 * - Si el número supera los 12 caracteres o no es finito, se redondea a 12 dígitos.
 * - Si el resultado redondeado es un número entero, elimina la parte decimal.
 * - Si tiene decimales, elimina ceros innecesarios al final.
 * - Si el número es corto y válido, se muestra tal cual.
 *
 */
function actualizarPantalla() {
    let texto = String(valorActual);
    if (texto.length > 10 || !Number.isFinite(Number(valorActual))) {
        texto = texto.slice(0, 10);
    }
    pantalla.textContent = texto;
}

/**
 * @brief Muestra un número en la pantalla gestionando correctamente la entrada.
 *
 * Esta función controla la lógica al introducir un dígito en la calculadora:
 *
 * - Si previamente se ha mostrado un resultado de una operación, se inicia una nueva entrada reemplazando el valor actual por el número pulsado.
 * - Si el valor actual es 0, se sustituye por el nuevo número pulsado para evitar acumulación de ceros a la izquierda.
 * - En cualquier otro caso permite formar números de varias cifras.
 *
 * @param {string} numero 
 *
 */
function mostrarNumeroPantalla(numero) {
    if (resultadoMostrado) {
        valorActual = numero;
        resultadoMostrado = false;
        pantallaColorNormal();
        actualizarPantalla();
        if (valorActual.includes(".")) deshabilitarPunto();
        else habilitarPunto();
        return;
    }
    if (valorActual === "0") {
        valorActual = numero;
    } else {
        valorActual = valorActual + numero;
    }
    actualizarPantalla();
    if (valorActual.includes(".")) deshabilitarPunto();
    else habilitarPunto();
}

/**
 * @brief Agrega un punto decimal a la pantalla de la calculadora.
 *
 * Comprueba si ya se ha mostrado un resultado o si el número actual no contiene un punto.
 * Si corresponde, agrega un punto y actualiza la pantalla.
 * Deshabilita el botón de punto para evitar múltiples decimales.
 */
function mostrarPuntoPantalla() {
    if (resultadoMostrado) {
        valorActual = "0.";
        resultadoMostrado = false;
        actualizarPantalla();
        deshabilitarPunto();
        return;
    }
    if (valorActual.includes(".")) {
        return;
    }
    valorActual = valorActual + ".";
    actualizarPantalla();
    deshabilitarPunto();
}

/**
 * @brief Gestiona de forma correcta la operación matemática que hemos seleccionado (suma, resta, multiplicación, división).
 * 
 * Esta función gestiona la operación matemática seleccionada asegurando que:
 *
 * - Se guarda la operación matemática seleccionada para luego aplicarla.
 * - Se guarda el número que había escrito en la pantalla.
 * - Se resetea la pantalla volviendo a poner el número a 0.
 *
 */
function manejarOperador(operador) {
    if (operadorActual !== null && valorAnterior !== null && !resultadoMostrado && valorActual !== "0") {
        calcularOperacion();
        valorAnterior = valorActual;
    } else {
        valorAnterior = valorActual;
    }
    operadorActual = operador;
    valorActual = "0";
    resultadoMostrado = false;
    actualizarPantalla();
    habilitarPunto();
}

/**
 * @brief Realiza la operación matemática indicada por el operador almacenado.
 *
 * Esta función toma los valores de los números seleccionados por el usuario, aplica el operador seleccionado y muestra el resultado en pantalla.
 * Gestiona también el caso especial de división entre cero, mostrando "Error".
 *
 */
function calcularOperacion() {
    if (operadorActual === null || valorAnterior === null) {
        return;
    }
    const operadorUsado = operadorActual;
    const numA = Number(valorAnterior);
    const numB = Number(valorActual);
    let resultado;

    if (Number.isNaN(numA) || Number.isNaN(numB)) {
        resultado = "Error";
    } else if (operadorUsado === "+") {
        resultado = String(numA + numB);
    } else if (operadorUsado === "-") {
        resultado = String(numA - numB);
    } else if (operadorUsado === "x") {
        resultado = String(numA * numB);
    } else if (operadorUsado === "/") {
        resultado = (numB === 0) ? "Error" : String(numA / numB);
    } else {
        resultado = "Error";
    }

    valorActual = resultado;
    valorAnterior = null;
    operadorActual = null;
    resultadoMostrado = true;
    actualizarPantalla();

    if (resultado === "Error") aplicarColorResultado("error");
    else aplicarColorResultado(operadorUsado);

    if (String(valorActual).includes(".")) deshabilitarPunto();
    else habilitarPunto();
}

/**
 * @brief Restaura el color por defecto de la pantalla de la calculadora.
 *
 * Establece la clase CSS correspondiente al estado visual normal de la pantalla.
 *
 */
function pantallaColorNormal() {
    pantalla.classList.remove(
        "clr-error",
        "clr-suma", "clr-resta", "clr-multiplicar", "clr-division",
        "clr-inverso", "clr-cuadrado", "clr-raiz"
    );
    pantalla.classList.add("clr-normal");
}

/**
 * @brief Borra el número introducido actualmente en la pantalla.
 *
 * Restablece la entrada actual a 0.
 *
 */
function borrarEntrada() {
    valorActual = "0";
    resultadoMostrado = false;
    actualizarPantalla();
    habilitarPunto();
}

/**
 * @brief Restablece completamente la calculadora a su estado inicial.
 *
 * Reinicia todos los valores almacenados, incluidos el número actual, el número anterior, el operador activo y el indicador de resultado mostrado.
 * También actualiza la pantalla, restaura el color normal y habilita el punto decimal.
 *
 */
function borrarTodo() {
    valorActual = "0";
    valorAnterior = null;
    operadorActual = null;
    resultadoMostrado = false;
    actualizarPantalla();
    pantallaColorNormal();
    habilitarPunto();
}

/**
 * @brief Elimina el último carácter del número mostrado en pantalla.
 *
 * Gestiona el borrado dígito a dígito. Si se había mostrado un resultado previo reinicia la pantalla a 0. Si se elimina un punto decimal, vuelve a habilitarse que se pueda seleccionar.
 * Cuando solo queda un carácter, la pantalla vuelve a mostrar 0.
 *
 */
function retroceder() {
    if (resultadoMostrado) {
        valorActual = "0";
        resultadoMostrado = false;
        actualizarPantalla();
        habilitarPunto();
        return;
    }
    if (valorActual.length <= 1) {
        valorActual = "0";
    } else {
        valorActual = valorActual.slice(0, -1);
        if (valorActual === "-" || valorActual === "") valorActual = "0";
    }
    actualizarPantalla();
    if (valorActual.includes(".")) deshabilitarPunto();
    else habilitarPunto();
}

/**
 * @brief Realiza operaciones inmediatas sobre el número mostrado.
 *
 * Soporta las siguientes operaciones:
 * - Inverso (1/x)
 * - Cuadrado (x²)
 * - Raíz cuadrada (√x)
 *
 * Gestiona errores como división entre cero o raíz cuadrada de un número negativo, mostrando "Error" en pantalla y cambiando el color de la misma.
 *
 * @param {string} operacion 
 *
 */
function operacionInmediata(operacion) {
    const num = Number(valorActual);
    if (Number.isNaN(num)) {
        valorActual = "ERROR";
        resultadoMostrado = true;
        actualizarPantalla();
        aplicarColorResultado("error");
        return;
    }
    let resultado = null;
    if (operacion === "inverso") {
        resultado = (num === 0) ? "Error" : String(1 / num);
    }
    if (operacion === "cuadrado") {
        resultado = String(num * num);
    }
    if (operacion === "raiz") {
        resultado = (num < 0) ? "Error" : String(Math.sqrt(num));
    }
    valorActual = resultado;
    resultadoMostrado = true;
    actualizarPantalla();
    if (resultado === "Error") aplicarColorResultado("error");
    else aplicarColorResultado(operacion);
    if (String(valorActual).includes(".")) deshabilitarPunto();
    else habilitarPunto();
}

/**
 * @brief Aplica un color específico a la pantalla según la operación realizada.
 *
 * Cambia la clase CSS de la pantalla para reflejar visualmente el tipo de operación que se acaba de ejecutar, tanto para operaciones binarias (+, -, ×, /) como operaciones inmediatas (inverso, cuadrado, raíz).
 *
 * @param {string} operador
 *
 */
function aplicarColorResultado(tipo) {
    pantalla.classList.remove(
        "clr-normal", "clr-error",
        "clr-suma", "clr-resta", "clr-multiplicar", "clr-division",
        "clr-inverso", "clr-cuadrado", "clr-raiz"
    );
    if (tipo === "+") pantalla.classList.add("clr-suma");
    else if (tipo === "-") pantalla.classList.add("clr-resta");
    else if (tipo === "x") pantalla.classList.add("clr-multiplicar");
    else if (tipo === "/") pantalla.classList.add("clr-division");
    else if (tipo === "inverso") pantalla.classList.add("clr-inverso");
    else if (tipo === "cuadrado") pantalla.classList.add("clr-cuadrado");
    else if (tipo === "raiz") pantalla.classList.add("clr-raiz");
    else if (tipo === "error") pantalla.classList.add("clr-error");
    else pantalla.classList.add("clr-normal");
}

for (let i = 0; i < botonesNumeros.length; i++) {
    botonesNumeros[i].addEventListener("click", () => {
        mostrarNumeroPantalla(botonesNumeros[i].textContent);
    });
}

for (let i = 0; i < botonesOperacion.length; i++) {
    botonesOperacion[i].addEventListener("click", () => {
        manejarOperador(botonesOperacion[i].textContent.trim());
    });
}

botonPunto.addEventListener("click", () => mostrarPuntoPantalla());
botonIgual.addEventListener("click", () => calcularOperacion());
botonCE.addEventListener("click", () => borrarEntrada());
botonC.addEventListener("click", () => borrarTodo());
botonBack.addEventListener("click", () => retroceder());
botonInversa.addEventListener("click", () => operacionInmediata("inverso"));
botonCuadrado.addEventListener("click", () => operacionInmediata("cuadrado"));
botonRaiz.addEventListener("click", () => operacionInmediata("raiz"));

/**
 * @brief Gestiona la entrada de teclado para la calculadora.
 *
 * Permite controlar la calculadora mediante teclas:
 * - Números 0-9: Números del 0 al 9.
 * - Punto decimal: Tecla punto.
 * - Operadores: Teclas +, -, *, /.
 * - Calcular resultado: Enter o =.
 * - Backspace: Retrocede un carácter.
 * - Tecla 'C' o 'c': Ejecuta la funcionalidad de borrar todo.
 * - Tecla 'i': Calcula el inverso.
 * - Tecla 's': Calcula el cuadrado.
 * - Tecla 'r': Calcula la raíz cuadrada
 *
 * @param {KeyboardEvent} teclaevento 
 *
 */
window.addEventListener("keydown", (teclaevento) => {
    const k = teclaevento.key;

    if (k === "Enter" || k === "=") {
        teclaevento.preventDefault();
        calcularOperacion();
        return;
    }
    if (k >= "0" && k <= "9") {
        mostrarNumeroPantalla(k);
        return;
    }
    if (k === "." || k === ",") {
        mostrarPuntoPantalla();
        return;
    }
    if (k === "+") manejarOperador("+");
    else if (k === "-") manejarOperador("-");
    else if (k === "*") manejarOperador("x");
    else if (k === "/") {
        teclaevento.preventDefault();
        manejarOperador("/");
    }
    else if (k === "Backspace") retroceder();
    else if (k === "Delete") borrarEntrada();
    else if (k === "C" || k === "c") borrarTodo();
    else if (k === "i") operacionInmediata("inverso");
    else if (k === "s") operacionInmediata("cuadrado");
    else if (k === "r") operacionInmediata("raiz");
});