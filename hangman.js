// Requiring in everything needed to run the hangman game
var inquire = require("inquirer");
var Guess = require("./guess");

// Global arrays containing words to be guessed. Mascots are hard, schools are easy
var mascots = ["Eagles", "Tigers", "Seminoles", "Cardinals", "Wolfpack", "Panthers", "Orange", "Cavaliers", "Hokies", "Volunteers", "Bulldogs", "Commodores", "Razorbacks", "Gamecocks", "Rebels", "Gators", "Wildcats", "Longhorns", "Trojans", "Ducks", "Buckeyes", "Wolverines", "Sooners", "Huskers"];
var schools = ["Boston College", "Clemson", "Florida State", "Louisville", "North Carolina State", "Pittsburgh", "Syracuse", "Virginia", "Virginia Tech", "Tennessee", "Georgia", "Vanderbilt", "Arkansas", "South Carolina", "Ole Miss", "Florida", "Kentucky", "Texas", "USC", "Oregon", "THE Ohio State", "Michigan", "Oklahoma", "Nebraska"];

// Creating Inquirer constructor
function Inquirer(array) {

    // Variable to ensure that the "this" being used is always the "this" for the Guess constructor
    var superThis = this;

    // Creating Guess constructor using array fed into Inquirer constructor
    superThis.wordToGuessObject = new Guess(array);

    // Place holder for the result of the game
    superThis.run = "";

    // Method to start the game
    superThis.startGame = function () {
        superThis.wordToGuessObject.createGuess();
        return superThis.promptUser();
    };

    // Method to prompt the user to enter a guess
    superThis.promptUser = function () {
        inquire.prompt([
            {
                name: "guess",
                message: "Guess a letter!",

            }
        ]).then(function (answer) {

            // Validates that the user entered a letter
            if (!/[a-zA-Z]/.test(answer.guess)) {
                console.log("Entry not valid! Please enter a letter A-Z.\n");
                superThis.promptUser();
            }

            // Validates that the user entered only one letter
            else if (answer.guess.length > 1) {
                console.log("Entry not valid! Please enter only one letter value.\n")
                superThis.promptUser();
            }
            else {
                // Extends Guess constructor to contain the user's guess
                Guess.prototype.guess = answer.guess;

                // Saves the result of validating the user's input
                var inputResponse = superThis.wordToGuessObject.validateGuess();

                // If the response is to continue, the function calls itself again
                if (inputResponse === "Continue") {
                    superThis.promptUser();
                }

                // If the response is that the user lost, then the user is told to they lost and the continue function is run
                else if (inputResponse === "Lost") {
                    console.log("Oh no! You lost. The word you were looking for was " + superThis.wordToGuessObject.goalWord + "\n");
                    superThis.run = "Lost";
                    superThis.continue();
                }

                // If the response is that the user won, then the user is told they won and the continue function is run
                else if (inputResponse === "Won") {
                    console.log("You won!");
                    superThis.run = "Won";
                    superThis.continue();
                }
            }
        })
    }

    // Method to check if the user would like to play again
    superThis.continue = function() {

        // If the result of the last game was lost, then the user is asked if they want to play again.
        if (superThis.run === "Lost") {
            inquire.prompt([
                {
                    type: "confirm",
                    name: "continue",
                    message: "Would you like to play again?",
                }
    
            ]).then(function (answer2) {

                // If the user wants to play again, the overall function is called again
                if (answer2.continue) {
                    chooseDifficulty();
                }
                else {
                    console.log("Giving up huh?\n");
                    return;
                }
            })
        }

        // If the result of the last game was won, then the user immediately starts a new game
        else if (superThis.run === "Won") {
            console.log("\nNext word!\n");
            chooseDifficulty();
        }
    }
}

// Creating overall function to run (Initially choosing the difficulty you want to play)
var chooseDifficulty = function() {
    inquire.prompt([
        {
            type: "list",
            name: "difficulty",
            message: "What difficulty do you choose?",
            choices: ["Normal", "Hard"],
        }

    ]).then(function (answer) {

        // If the user wants a challenge, they can guess a mascot for a college team
        if (answer.difficulty === 'Hard') {
            initializeGame(mascots);
        }

        // If the user doesn't want a challenge, then they can guess the name of a college
        else if (answer.difficulty === "Normal") {
            initializeGame(schools);
        }
    })
}

// Funcation that will initialize the game with the difficulty chosen
var initializeGame = function(array) {
    var game = new Inquirer(array);
    game.startGame();   
}

chooseDifficulty();
