//function está dentro de una función anónima, que se va a ejecutar así misma.
//para no contaminar el scope general del proyecto
//Declaración de la clase, en js las clases son funciones especiales
(function(){
    //El function es como si estuviera declarando una clase
    //Los parámetros del constructor son el ancho y el alto del tablero
    self.Board = function(width, height){
        //Los parámetros se asignan a variables de la clase
        //Las variables width y height que son propiedades del objeto se iguala a lo que pasa como parámetro la persona (width, height)
        this.width = width;
        this.height = height;
        //Variables booleanas: el juego se está jugando, el juego se terminó
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }
    self.Board.prototype = {
        //Esto es un json que puede contener diferentes funciones y métodos para mi prototipo
        get elements (){
            var elements = this.bars;
            elements.push(ball); //¿Qué es .push en JS? El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array
            return elements;
        }
    }
})();

(funtion(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d"); //Este es el objeto a través del cual podemos dibujar en Js, donde getContext es el método 
    }  
})();

window.addEventListener("load", main);
function main() {
    var board = new Board(800, 400);
    var canvas = document.getElementById("canvas", board);
    var board_view = new BoardView();
}