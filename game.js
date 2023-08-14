console.log(maps);

//DECLARAR
const canvas = document.querySelector("#game"); //la seleccionamos para empezar a utilizar por su id
const game = canvas.getContext("2d"); //creamos variable para acceder a los metodos para dibujar

//Botones variables ligados por id de los botones de pantalla
const btnUp = document.querySelector('#up'); //identificarlo por su id
const btnLeft = document.querySelector('#left'); //identificarlo por su id
const btnRight = document.querySelector('#right'); //identificarlo por su id
const btnDown = document.querySelector('#down'); //identificarlo por su id

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
    const mapRows = map.trim().split('\n'); //array para crear los strings que forman las columnas osea en cada salto de linea y asi conseguir las filas del mapa
    const mapRowCols = mapRows.map(row => row.trim().split('')); //para conseguir filas y cada elemento es un elemento de un arreglo (Array bidimensional del string de nuestro mapa)
    console.log({
        map,
        mapRows,
        mapRowCols
    });

    mapRowCols.forEach((row, rowI) => {
        row.forEach( (col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            game.fillText(emoji, posX, posY);
        });
    });

    /* for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row); //insertamos un emoji + posicion-x + posicion-y
        }
    } */

}

//Detectar el evento de los botones de la plantalla que relaciona las funciones tecla + funcion (que quiero hacer?)
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

//Escuchar a window cuando se presiona una tecla y llamar una función
window.addEventListener('keydown', moveByKeys);

//Detectamos que tecla se esta presionando recibiendo un evento
function moveByKeys(event){
    
    if(event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowDown') moveDown();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight')moveRight();
    
}

//Diferentes movimientos
function moveUp(){
    console.log('Me quiero mover hacia arriba');
}
function moveLeft(){
    console.log('Me quiero mover hacia izquierda');
}
function moveRight(){
    console.log('Me quiero mover hacia derecha');
}
function moveDown(){
    console.log('Me quiero mover hacia abajo');
}