// Requiring in everything needed to run the hangman game
var inquire = require("inquirer");
var Guess = require("./guess");
var Validation = require("./guessValidation");

function Inquirer(array) {
    var superThis = this;
    superThis.wordToGuessObject = new Guess(array);
    superThis.startGame = function () {
        superThis.wordToGuessObject.createGuess();
        var run = superThis.promptUser();
        if (run === "Continue") {
            superThis.promptUser(); 
        }
        else if (run === false) {
            return false;
        }
        else {
            return true;
        }
    };
    superThis.promptUser = function () {
        inquire.prompt([
            {
                name: "guess",
                message: "Guess a letter!",

            }
        ]).then(function (answer) {
            if (!/[a-zA-Z]/.test(answer.guess)) {
                console.log("Entry not valid! Please enter a letter A-Z.");
                superThis.promptUser();
            }
            else if (answer.guess.length > 1) {
                console.log("Entry not valid! Please enter only one letter value.")
                superThis.promptUser();
            }
            else {
                var checkInput = new Validation(answer.guess, superThis.wordToGuessObject);
                var inputResponse = checkInput.validateGuess();
                if (inputResponse === "Continue") {
                    superThis.promptUser(); 
                }
                else if (inputResponse === false) {
                    return false;
                }
                else {
                    return true;
                }
            }
        })
    }
}

module.exports = Inquirer;
