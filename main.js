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
            elements.push(this.ball); //¿Qué es .push en JS? El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array
            return elements;
        }
    }
})();

//nueva función autoejecutable
(function(){
    //declaramos nueva clase
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this); // en el constructor de la barra llenamos el arreglo this.bars = []; con bars,push(this)
        this.kind = "rectangle"; //Para que el canvas sepa cómo dibujarlo
        console.log("Hola mundo primero");
        this.speed = 10;
    }
    //ahora vamos a modificar el prototype de esta función
    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){ //Método string
            return "x: "+ this.x + "y: " + this.y ;
        }
    }

})();

(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d"); //Este es el objeto a través del cual podemos dibujar en Js, donde getContext es el método 
    }

    self.BoardView.prototype = {
        draw: function(){
            for (var i = this.board.elements.length -1; i >= 0; i--){
                var el = this.board.elements[i];

                draw(this.ctx,el);
            };
        }
    }

    //helper methods no pertenecen al scope del objeto, 
    function draw(ctx, element){
        if(element !== null && element.hasOwnProperty("kind")){
            //hasOwnProperty nos dice si el objeto tiene una propiedad kind, para poder acceder luego a ella
            switch(element.kind){
                case "rectangle":
                    //fillReact es una función del contexto que nos permite dibujar un cuadro, que recibe como primer parámetro el .x y luego el .y
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
            }
        }
        
    }
})();

var board = new Board(800, 400);
var bar = new Bar(20,100,40,100,board);
var bar = new Bar(735,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);

//a través de document accedemos al DOM, una vez que el que Keydown suceda se va a ejecutar la función(ev)
document.addEventListener("keydown", function(ev){
    //me trae información del evento
    if(ev.keyCode == 38){
        bar.up();
    }
    else if(ev.keycode == 40){
        bar.down();
    }

    console.log(""+bar);
});


self.addEventListener("load", main);

function main() {
    console.log("Hola mundo");
    console.log(board);
    board_view.draw(); //dibuja todos los elementos
}