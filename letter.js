// Creating the constructor to create the string of underspaces for the letters
// of the word fed into it
function Letter(word) {
    this.word = word;
    this.mysteryWord = '';
    this.createMaskedWord = function () {
        var currentWord = this.word;
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === " ") {
                this.mysteryWord += "  ";
            }
            else {
                this.mysteryWord += "_ ";
            }
        }
        this.mysteryWord += "\n";
    }
}

module.exports = Letter;