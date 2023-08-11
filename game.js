console.log(maps);

//la seleccionamos para empezar a utilizar por su id
const canvas = document.querySelector('#game');

//creamos variable para acceder a los metodos para dibujar
const game = canvas.getContext('2d');

//evento para que apenas cargue iniciar codigo
window.addEventListener('load', startGame);

//crear una funcion para reutilizar, encapsular y organizar codigo inicial del juego
function startGame() {
    //el lugar donde iniciará nuestro trazo o area
    //game.fillRect(0,0,100,100); //x,y,w,h Propiedad de trazo
    //game.clearRect(50,50,50,50);

    game.font = '25px Verdana'
    game.fillStyle = 'Gray';
    game.textAlign = 'center';
    game.fillText('Platzi', 10, 25); //Propiedad de texto

}