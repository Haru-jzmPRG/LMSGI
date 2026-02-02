"use strict";
//console.log("funcionando")

//varibales:let y const
let edad = 18;
console.log("Edad", edad);
console.log(edad.constructor.name)

const centro = "CPIFP" //AL declarar una constante no se puede modificar
console.log("centro: ", centro)

//Operadores
const a = 10;
const b = 3;
const res = 10 - 3;
console.log("resta:", res)
console.log("suma" + (a + b))
console.log("Multiplica:", a * b)
console.log("Division:", a / b)

const nombre = "Compi";
console.log("Hola " + nombre + "!")
console.log(`Hola ${nombre}!`);

const firstWord = "frase";
const secondWord = "concatena";

console.log(`Una ${firstWord} mejor ${secondWord}`)

const magicalWorld = `<strong>Magical World</strong>`

/*15/01/2026*/

console.log("5" == 5);

const juegos=["Zelda", "Minecraft", "Fortnite"];

console.log("Juegos:", juegos[0]);
console.log("Cantidad: ", juegos.length + " juegos");

juegos.push("FIFA");
console.log("Juegos tras push:", juegos)

// Objeto Producto

const producto = {
    nombre: "Cesped",
    precio: 10,
    proveedor: "Alfonso",
    cantidad: 10,
}

console.log(producto);

console.log(`Producto: ${producto.nombre} - Precio: ${producto.precio} - Stock: ${producto.cantidad}`)


// Crear un array de 3 objetos productos (nombre/precio)
// y una funcion que devuelva el precio total sumado

const array = [
    {nombre: "Producto1", precio: 100},
    {nombre: "Producto2", precio: 200},
    {nombre: "Producto3", precio: 300}
];

const total = function(precio1, precio2, precio3) {
    return precio1 + precio2 + precio3;
};

console.log("El total es = ${total(array[0].precio, array[1].precio, array[2].precio)}");

const total2 = function(obj1, obj2, obj3) {
    return obj1.precio + obj2.precio + obj3.precio;
};

console.log("El total es = ${total2(array[0], array[1], array[2])}");

const sumaFlecha = (obj1, obj2, obj3) => obj1.precio + obj2.precio + obj3.precio;

console.log("El total es = ${sumaFlecha(array[0], array[1], array[2])}");