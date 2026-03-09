// Variables globales
let victorias = 0;
let derrotas = 0;
let empates = 0;

const jugadas = {
    piedra: { nombre: "Piedra", vence: ["tijera", "lagarto"] },
    papel: { nombre: "Papel", vence: ["piedra", "spock"] },
    tijera: { nombre: "Tijera", vence: ["papel", "lagarto"] },
    lagarto: { nombre: "Lagarto", vence: ["papel", "spock"] },
    spock: { nombre: "Spock", vence: ["piedra", "tijera"] }
};

document.addEventListener('DOMContentLoaded', function () {
    inicializarJuego();
});

/**
 * @brief Inicializa el juego configurando los elementos, estados y eventos necesarios.
 *
 * Esta función prepara todo lo necesario para que el juego pueda comenzar,
 * incluyendo la configuración de la interfaz, los valores iniciales de los
 * jugadores y la vinculación de eventos a los controles.
 *
 * @return {void} No devuelve ningún valor.
 */
function inicializarJuego() {
    try {
        const botones = document.querySelectorAll('.boton-eleccion-jugada');

        if (botones.length === 0) {
            throw new Error('No se encontraron botones de jugada');
        }

        botones.forEach(boton => {
            boton.addEventListener('click', () => {
                const jugada = boton.dataset.jugada;
                jugar(jugada);
            });
        });

        inicializarTooltips();
        document.getElementById('boton-reiniciar').addEventListener('click', resetearJuego);
        document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);
        document.getElementById('cerrar').addEventListener('click', () => {
            document.getElementById('reglas-overlay').classList.remove('activo');
        });
        document.getElementById('reglas-overlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('reglas-overlay')) {
                document.getElementById('reglas-overlay').classList.remove('activo');
            }
        });
        console.log('Juego inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
    }
}

/**
 * @brief Ejecuta una ronda del juego con la elección del usuario.
 *
 * Esta función realiza los siguientes pasos:
 * 1. Reinicia los displays del juego.
 * 2. Genera la elección de la CPU de forma aleatoria.
 * 3. Muestra la elección del usuario y de la CPU con animaciones.
 * 4. Calcula el resultado de la ronda.
 * 5. Muestra el resultado y actualiza los contadores correspondientes.
 *
 * @param {string} eleccionUsuario - La elección realizada por el usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {void} No devuelve ningún valor.
 */
function jugar(eleccionUsuario) {
    try {
        reiniciarDisplays();
        const eleccionCPU = obtenerEleccionCPU();
        const displayJugador = document.getElementById('display-jugador');
        const displayCPU = document.getElementById('display-cpu');
        mostrarEleccion(displayJugador, eleccionUsuario, 'JUGADOR');

        setTimeout(() => {
            mostrarEleccion(displayCPU, eleccionCPU, 'CPU');
            const resultado = calcularResultadoJugada(eleccionUsuario, eleccionCPU);
            mostrarResultadoJugada(resultado, eleccionUsuario, eleccionCPU);

        }, 600);

    } catch (error) {
        console.error('Error al ejecutar la jugada:', error);
    }
}

/**
 * @brief Genera aleatoriamente la elección de la CPU.
 *
 * Esta función selecciona una opción al azar entre las disponibles y la devuelve.
 *
 * @return {string} La elección de la CPU (por ejemplo: "piedra", "papel" o "tijera"...).
 */
function obtenerEleccionCPU() {
    const opciones = Object.keys(jugadas);
    const indice = Math.floor(Math.random() * opciones.length);
    return opciones[indice];
}

/**
 * @brief Muestra la elección de un jugador (jugador humano o CPU) en un display con icono y texto.
 *
 * Esta función limpia el contenido del display, aplica la clase
 * para animación/estilo y agrega los elementos que representan
 * la jugada seleccionada (emoji y texto) del jugador indicado.
 *
 * @param {HTMLElement} display - El contenedor donde se mostrará la elección.
 * @param {string} eleccion - La clave de la elección (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} jugador - Nombre del jugador que realizó la elección (por ejemplo: "JUGADOR" o "CPU").
 * @return {void} No devuelve ningún valor.
 */
function mostrarEleccion(display, eleccion, jugador) {
    try {
        display.innerHTML = '';
        display.classList.add('active');

        const icono = document.createElement('img');
        icono.src = `img/${eleccion}.png`;
        icono.alt = jugadas[eleccion].nombre;
        icono.classList.add('icono-jugada-grande');

        const texto = document.createElement('span');
        texto.textContent = jugadas[eleccion].nombre;
        texto.classList.add('texto-jugada');

        display.appendChild(icono);
        display.appendChild(texto);

    } catch (error) {
        console.error(`Error al mostrar la elección de ${jugador}:`, error);
    }
}

/**
 * @brief Reinicia los displays del juego a su estado inicial.
 *
 * Esta función restablece el contenido de los displays del usuario y de la CPU,
 * elimina cualquier clase de animación activa y restablece el mensaje de resultado
 * al texto predeterminado "¡Batalla!".
 *
 * @return {void} No devuelve ningún valor.
 */
function reiniciarDisplays() {
    const jugador = document.getElementById('display-jugador');
    const cpu = document.getElementById('display-cpu');

    jugador.innerHTML = '<span class="placeholder">?</span>';
    cpu.innerHTML = '<span class="placeholder">?</span>';
    jugador.classList.remove('active');
    cpu.classList.remove('active');

    const mensaje = document.querySelector('.mensaje-resultado');
    mensaje.textContent = '¡Batalla!';
    mensaje.classList.remove('ganador', 'perdedor', 'empate');
}

/**
 * @brief Calcula el resultado de una ronda entre el usuario y la CPU.
 *
 * Esta función compara la elección del usuario con la elección de la CPU
 * y determina si la ronda termina en victoria, derrota o empate según
 * las reglas del juego.
 *
 * @param {string} usuario - La elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} cpu - La elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {string} El resultado de la ronda: "victoria", "derrota" o "empate".
 */
function calcularResultadoJugada(usuario, cpu) {
    if (usuario === cpu) {
        return 'empate';
    } else if (jugadas[usuario].vence.includes(cpu)) {
        return 'victoria';
    } else {
        return 'derrota';
    }
}

/**
 * @brief Muestra el resultado de una ronda en la interfaz del juego.
 *
 * Esta función actualiza el mensaje de resultado según si el usuario ganó,
 * perdió o empató, aplica la clase correspondiente para estilos y
 * actualiza los contadores de victorias, derrotas o empates.
 *
 * @param {string} resultado - Resultado de la ronda: "victoria", "derrota" o "empate".
 * @param {string} usuario - Elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} cpu - Elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {void} No devuelve ningún valor.
 */
function mostrarResultadoJugada(resultado, usuario, cpu) {
    const mensaje = document.querySelector('.mensaje-resultado');
    mensaje.classList.remove('ganador', 'perdedor', 'empate');

    if (resultado === 'victoria') {
        victorias++;
        mensaje.textContent = `¡Ganaste! ${jugadas[usuario].nombre} vence a ${jugadas[cpu].nombre}`;
        mensaje.classList.add('ganador');
    } else if (resultado === 'derrota') {
        derrotas++;
        mensaje.textContent = `¡Perdiste! ${jugadas[cpu].nombre} vence a ${jugadas[usuario].nombre}`;
        mensaje.classList.add('perdedor');
    } else {
        empates++;
        mensaje.textContent = '¡Empate!';
        mensaje.classList.add('empate');
    }

    actualizarContadores();
}

/**
 * @brief Actualiza los contadores de victorias, derrotas y empates en la interfaz.
 *
 * Esta función refleja los valores actuales de las variables globales
 * `victorias`, `derrotas` y `empates` en los elementos del DOM correspondientes.
 *
 * @return {void} No devuelve ningún valor.
 */
function actualizarContadores() {
    document.getElementById('contador-victorias').textContent = victorias;
    document.getElementById('contador-derrotas').textContent = derrotas;
    document.getElementById('contador-empates').textContent = empates;
}

/**
 * @brief Inicializa los tooltips de los botones de elección.
 *
 * Esta función recorre todos los botones de elección, obtiene la jugada
 * asociada a cada uno y configura el atributo `title` para mostrar
 * un tooltip indicando qué opciones vence esa jugada.
 *
 * @return {void} No devuelve ningún valor.
 */
function inicializarTooltips() {
    try {
        const botones = document.querySelectorAll('.boton-eleccion-jugada');
        if (botones.length === 0) {
            throw new Error('No se encontraron botones para los tooltips');
        }

        botones.forEach(boton => {
            const jugada = boton.dataset.jugada;
            const vencidos = jugadas[jugada].vence.map(j => jugadas[j].nombre);
            boton.title = `${jugadas[jugada].nombre} vence a: ${vencidos.join(' y ')}`;
        });

    } catch (error) {
        console.error('Error al inicializar los tooltips:', error);
    }
}

/**
 * @brief Muestra las reglas completas del juego en la consola.
 *
 * Esta función imprime un resumen de todas las reglas del juego,
 * indicando qué jugada vence a cuáles otras.
 *
 * @return {void} No devuelve ningún valor.
 */
function mostrarReglas() {
    console.log('REGLAS DEL JUEGO');
    console.log('Piedra, Papel, Tijera, Lagarto, Spock\n');

    Object.keys(jugadas).forEach(jugada => {
        const vencidos = jugadas[jugada].vence.map(j => jugadas[j].nombre);
        console.log(`${jugadas[jugada].nombre} vence a: ${vencidos.join(' y ')}`);
    });
    const modal = document.getElementById('reglas-overlay');
    modal.classList.add('activo');
}

/**
 * @brief Reinicia el juego a su estado inicial.
 *
 * Esta función realiza las siguientes acciones:
 * - Restablece los contadores de victorias, derrotas y empates a cero.
 * - Reinicia los displays del juego.
 * - Actualiza los contadores en la interfaz.
 * - Muestra un mensaje temporal indicando que el juego ha sido reiniciado.
 *
 * @return {void} No devuelve ningún valor.
 */
function resetearJuego() {
    try {
        victorias = 0;
        derrotas = 0;
        empates = 0;
        reiniciarDisplays();
        actualizarContadores();
        const mensaje = document.querySelector('.mensaje-resultado');
        mensaje.textContent = '¡Juego reiniciado!';

        setTimeout(() => {
            mensaje.textContent = '¡Batalla!';
        }, 1500);
        console.log('Juego reiniciado correctamente');
    } catch (error) {
        console.error('Error al reiniciar el juego:', error);
    }
}

/**
 * @brief Maneja las pulsaciones de teclas para jugar o reiniciar el juego.
 *
 * Este listener escucha los eventos de teclado (`keydown`) y realiza las siguientes acciones:
 * - Asocia las teclas numéricas '1' a '5' a las elecciones del juego: "piedra", "papel", "tijera", "lagarto" o "spock".
 * - La tecla 'r' reinicia el juego.
 * - La tecla 's' muestra las reglas del juego.
 *
 * @param {KeyboardEvent} event - El evento de pulsación de tecla.
 */
document.addEventListener('keydown', (event) => {
    try {
        switch (event.key) {
            case '1':
                jugar('piedra');
                break;
            case '2':
                jugar('papel');
                break;
            case '3':
                jugar('tijera');
                break;
            case '4':
                jugar('lagarto');
                break;
            case '5':
                jugar('spock');
                break;
            case 'r':
                resetearJuego();
                break;
            case 's':
                mostrarReglas();
                break;
        }
    } catch (error) {
        console.error('Error al procesar la tecla:', error);
    }
});

// Efecto de carga inicial suave
setTimeout(() => {
    const contenedor = document.querySelector('main');
    if (contenedor) contenedor.style.opacity = '1';
}, 100);