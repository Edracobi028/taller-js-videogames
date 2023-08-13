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

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize, elementsSize * i); //insertamos un emoji + posicion-x + posicion-y
    }

}