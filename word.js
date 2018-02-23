// Creating the constructor to pull a random word from array fed into Word
function Word(array) {
    this.number = Math.floor(Math.random() * array.length);
    this.target = array[this.number];
}

module.exports = Word;