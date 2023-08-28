console.log(maps);

//DECLARAR
const canvas = document.querySelector("#game"); //la seleccionamos para empezar a utilizar por su id
const game = canvas.getContext("2d"); //creamos variable para acceder a los metodos para dibujar

//Botones variables ligados por id de los botones de pantalla
const btnUp = document.querySelector('#up'); //identificarlo por su id
const btnLeft = document.querySelector('#left'); //identificarlo por su id
const btnRight = document.querySelector('#right'); //identificarlo por su id
const btnDown = document.querySelector('#down'); //identificarlo por su id

//Vidas
const spanLives = document.querySelector('#lives');

//Tiempo
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');


//Definir variables
let canvasSize;
let elementsSize; //en base al ancho que toma, calcular los elemntos 10 x 10
let level = 0; //posicion del array del nivel del juego
let lives = 3; //variable para las vidas para en caso de perderlas inicar en el nivel cero

let timeStart; //variable de tiempo
let timePlayer;
let timeInterval; //variable donde guardamos la ejecución

//Coordenadas del jugador, un objeto GLOBAL con las coordenadas sin definir
const playerPosition = {
    x: undefined,
    y: undefined,
};
//coordenadas para elementos fijos como el regalo
const giftPosition = {
    x: undefined,
    y: undefined,
};
//coordenadas de enemigos
let enemyPositions = [];


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

    game.font = elementsSize + 'px Verdana'; //Le damos tamaño de manera dinamica e indicamos tipo fuente
    game.textAlign = 'end'; //posicionarlo al inicio de la 1ra linea

    const map = maps[level]; //Cargar el arreglo de los mapas

    if (!map) {
        gameWin();
        return; //Return para parar la ejecución del juego
    }

    //Activar el tiempo si la variable esta vacia
    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100) //repetir la accion cada 100 ms e imprimir el tiempo con la funcion creada
        showRecord();
    }

    //Si ya no hay mapas terminar el juego
    const mapRows = map.trim().split('\n'); //array para crear los strings que forman las columnas osea en cada salto de linea y asi conseguir las filas del mapa
    const mapRowCols = mapRows.map(row => row.trim().split('')); //para conseguir filas y cada elemento es un elemento de un arreglo (Array bidimensional del string de nuestro mapa)

    showLives(); //Mostrar vidas

    //Borrar todo desde la posicion cero a lo que mide el canvas
    game.clearRect(0, 0, canvasSize, canvasSize);
    enemyPositions = [];

    //Renderizado del mapa
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            //Posicionar al jughador en la puerta o posicion inicial donde el emoji es la puerta
            if (col == 'O') {
                //si es undefined dar posicion inicial
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX; //llamamos a la prodiedad x del objeto player Position
                    playerPosition.y = posY; //llamamos a la prodiedad y del objeto player Position
                    console.log({
                        playerPosition
                    });
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                //Entrar a el array e insertar un objeto de la posicion
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer(); //Renderizar al jugador

}

//renderizar al mover el jugador
function movePlayer() {

    //verificar si las coordenadas en x coinciden
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY; //obtener una variable true si ambas coordenadas son true

    //Si se cumple cambiamos de nivel
    if (giftCollision) {
        console.log('Subiste de nivel!');
        levelWin();
    }

    //validar si la posicion del jugador colisiona con un enemigo
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);

        return enemyCollisionX && enemyCollisionY; //devolver true si coinciden estas dos variables

    });
    if (enemyCollision) {
        levelFail();
    }

    //renderizar al jugador ya con la posicion inicial llamando al array con emojis + posicion
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('Subiste de nivel!');
    level++;
    startGame();
}

function levelFail() {
    console.log('Chocaste con el enemigo!');
    lives--; //reste uno



    console.log('Vidas = ' + lives)
    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined; //Resetear el tiempo con undefined
    }
    //resetear las posiciones del jugador como undefined para que al renderizar lo coloque a posicion inciial
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame(); //llama para renderizar el juego
}

function gameWin() {
    console.log('Terminaste el juego !!!!');
    clearInterval(timeInterval); //detener el ciclo
    const recordTime = localStorage.getItem('record_time'); //verificar si tenemos guardado en variable de record
    const playerTime = Date.now() - timeStart; //guardar tiempo del jugador

    if (recordTime) { //si record existe guardar en variable el tiempo actual

        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime); //guardamos en local el tiempo del jugador
            pResult.innerHTML = 'superaste el record!';
        } else {
            pResult.innerHTML = 'no superaste el record';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Primera Vez?';
    }
    console.log({
        recordTime,
        playerTime
    });
}

function showLives() {
    const hearstsArray = Array(lives).fill(emojis['HEART']); //crear un array con el numero de elementos que tenga la variable y llenar con emojis
    //console.log(hearstsArray);

    spanLives.innerHTML = ""; //limpiar para que no acumule sin control
    hearstsArray.forEach(heart => spanLives.append(heart)); //insertar corazon al array utilizando append para que sume por cada ciclo
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart; //poner el tiempo en el span
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

//Detectar el evento de los botones de la plantalla que relaciona las funciones tecla + funcion (que quiero hacer?)
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

//Escuchar a window cuando se presiona una tecla y llamar una función
window.addEventListener('keydown', moveByKeys);

//Detectamos que tecla se esta presionando recibiendo un evento
function moveByKeys(event) {

    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowDown') moveDown();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();

}
//Diferentes movimientos
function moveUp() {
    console.log('Me quiero mover hacia arriba');
    //validar si es negativo o superior a la medida del canvas
    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.y -= elementsSize; //Sumar o restar el elementSize (px rendondeados)
        startGame();
    }

}

function moveLeft() {
    console.log('Me quiero mover hacia izquierda');
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize; //Sumar o restar el elementSize (px rendondeados)
        startGame();
    }
}

function moveRight() {
    console.log('Me quiero mover hacia derecha');
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize; //Sumar o restar el elementSize (px rendondeados)
        startGame();
    }
}

function moveDown() {
    console.log('Me quiero mover hacia abajo');
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize; //Sumar o restar el elementSize (px rendondeados)
        startGame();
    }
}