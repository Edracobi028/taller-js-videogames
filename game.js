console.log(maps);


const canvas = document.querySelector("#game"); //la seleccionamos para empezar a utilizar por su id
const game = canvas.getContext("2d"); //creamos variable para acceder a los metodos para dibujar

//Definir variables
let canvasSize;
let elementsSize; //en base al ancho que toma, calcular los elemntos 10 x 10

window.addEventListener("load", setCanvasSize); //evento ''load'' para que apenas cargue iniciar codigo
window.addEventListener('resize', setCanvasSize); //evento ''resize'' para saber cuando cambian las medidas de nuestro navegador

//crear una funcion para reutilizar, encapsular y organizar codigo inicial del juego


function setCanvasSize() {

    //calculo para que nunca sobrepase las medidas y pierda la forma cuadrada
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8; //tome la medida del ancho
    } else {
        canvasSize = window.innerHeight * 0.8; //tome la medida del alto
    }

    //ancho responsivo
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {

    console.log({
        canvasSize,
        elementsSize
    });

    game.font = elementsSize + 'px Verdana'; //Le damos tamaño de manera dinamica e indicamos tipo fuente
    game.textAlign = 'end'; //posicionarlo al inicio de la 1ra linea

    const map = maps[0]; //Cargar el arreglo de los mapas
    //array para crear los strings que forman las columnas osea en cada salto d elinea
    const mapRows = map.trim().split('\n'); //conseguir las filas del mapa
    const mapRowCols = mapRows.map(row => row.trim().split('')); //para conseguir filas y cada elemento es un elemento de un arreglo
    console.log({
        map,
        mapRows,
        mapRowCols
    });

    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row); //insertamos un emoji + posicion-x + posicion-y
        }
    }

}