/* class BoardSquare {
    constructor(color, row, file, startingPiece) {
        this.color = color;
        this.row = row;
        this.file = file;
        this.piece = startingPiece;
    }
    occupySquare(piece) {
        this.piece = piece;
    }
    clearSquare() {
        this.piece = null;
    }
}
class BoardSquarePrototype {
    constructor(prototype) {
        this.prototype = prototype;
    }
    clone() {
        return Object.assign(new BoardSquare(), this.prototype);
    }
}

const whiteSquare = new BoardSquare('White');

const whiteSquareProto = new BoardSquarePrototype(whiteSquare);

const whiteSquareTwo = whiteSquareProto.clone();
// ...
const whiteSquareLast = whiteSquareProto.clone();
console.log(
    whiteSquare.color === whiteSquareTwo.color &&
    whiteSquareTwo.color === whiteSquareLast.color,
    `Prototype.clone()-ed instances have the same color (${whiteSquare.color}) as the prototype`
);
console.log(whiteSquare !== whiteSquareTwo &&
    whiteSquare !== whiteSquareLast &&
    whiteSquareTwo !== whiteSquareLast)

const blackQuare = new BoardSquare('Black', 3);
const blackSquareProto = new BoardSquarePrototype(blackQuare);

 */
/* const square = {
    color : 'white',
    occupySquare(piece){
        this.piece = piece;
    },
    clearSquare(){
        this.piece = null;
    }
}
var otherSquare = Object.create(square);
otherSquare.occupySquare.test = "deneme bik bik";
console.log(otherSquare.__proto__.occupySquare === square.occupySquare)
console.log(square.occupySquare.test) */
class Square{
    constructor(){
        
    }
    occupySquare(piece){

    }
}
class BlackSquare extends Square{
    constructor(){
        super();
        this.color = 'color';
    }
}
var blackOne = new BlackSquare();

console.log(BlackSquare.prototype.__proto__ === Square.prototype)