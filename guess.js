// Requires in the constructors that will be used to pull the mystery word and mask it
var Letter = require("./letter");
var Word = require("./word");

function Guess(array) {

    // Variable to ensure that the "this" being used is always the "this" for the Guess constructor
    var superThis = this;

    // Pulls a random word from the array fed in
    superThis.goalWord = new Word(array).target;

    // Creates the letter constructor that will be used to mask the word chosen from previous variable
    superThis.maskedWordObject = new Letter(superThis.goalWord);

    // Place holder for target word with added spaces from maskedWord
    superThis.goalWordWithSpaces = '';

    // Place holder for masked word
    superThis.maskedWord = '';

    // Creates number of guesses. Always 5 more than the length of the word
    superThis.guesses = superThis.goalWord.length + 5;

    // Array to hold all of the guessed characters
    superThis.guessedChars = [];

    // Function to replace the characters at a certain index in the string fed in
    superThis.replaceAt = function (str, index, char) {
        var a = str.split("");
        a[index] = char;
        return a.join("");
    }

    // Creates the masked word
    superThis.createGuess = function () {
        superThis.maskedWordObject.createMaskedWord();
        superThis.maskedWord = superThis.maskedWordObject.mysteryWord;
        superThis.goalWordWithSpaces = superThis.maskedWordObject.wordWithSpaces;
    }

    // Logic to validate the guesses the user will feed in
    superThis.validateGuess = function () {

        // Checks to see if the letter fed in has already been guessed
        if (superThis.guessedChars.indexOf(superThis.guess.toLowerCase()) > -1 || superThis.guessedChars.indexOf(superThis.guess.toUpperCase()) > -1) {
            console.log("You have already guessed that character! Try again.\n");
            return "Continue";
        }
        else {
            // Pushes current guess to charater array to ensure it can't be guessed again
            superThis.guessedChars.push(superThis.guess);

            // If the current guess is in target word, proceed with this line of code
            if (superThis.goalWordWithSpaces.indexOf(superThis.guess.toLowerCase()) > -1 || superThis.goalWordWithSpaces.indexOf(superThis.guess.toUpperCase()) > -1) {

                // Creates array of character indices just in case there are multiple instances of the same character
                var charIndices = [];

                // Loops through the target word to pull all of the instances of the character guessed
                for (var i = 0; i < superThis.goalWordWithSpaces.length; i++) {
                    if (superThis.goalWordWithSpaces[i].toUpperCase() === superThis.guess || superThis.goalWordWithSpaces[i].toLowerCase() === superThis.guess) {

                        // Pushes index to character index array
                        charIndices.push(i);
                    }
                }

                // Loops thorugh character index array to replace all of the instances of the guess in the masked word
                for (var i = 0; i < charIndices.length; i++) {

                    // Code to capitilize the first letter of the masked Word
                    if (charIndices[i] === 0) {
                        superThis.maskedWord = superThis.replaceAt(superThis.maskedWord, charIndices[i], superThis.guess.toUpperCase());
                    }
                    else { superThis.maskedWord = superThis.replaceAt(superThis.maskedWord, charIndices[i], superThis.guess); }
                }

                // Outputs updated masked word, tells user they were correct, decrements guesses, and checks to see if user has won
                console.log(superThis.maskedWord);
                console.log("Correct!!!!\n");
                superThis.guesses--;
                console.log(superThis.guesses + " guesses remaining!!!\n");
                if (superThis.maskedWord.toLowerCase().replace(/\s/g, '') === superThis.goalWordWithSpaces.toLowerCase().replace(/\s/g, '')) {
                    return "Won"
                }
                else if (superThis.guesses === 0) {
                    return "Lost"
                }
                else { return "Continue" }
            }

            // If guess isn't in the word
            else {

                // Outputs masked word, tells user they were wrong, decrements guesses, and checks to see if user has lost
                console.log(superThis.maskedWord);
                console.log("Incorrect!!!!\n");
                superThis.guesses--;
                console.log(superThis.guesses + " guesses remaining!!!\n");
                if (superThis.guesses === 0) {
                    return "Lost"
                }
                else { return "Continue" }
            }
        }
    }
}

module.exports = Guess;