var Letter = require("./letter");
var Word = require("./word");

function Guess(array) {
    this.newWord = new Word(array).target;
    this.maskedWordObject = new Letter(this.newWord);
    this.createGuess = function () {
        this.maskedWordObject.createMaskedWord();
        console.log(this.maskedWord);
    }
}

module.exports = Guess;