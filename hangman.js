// Requiring in everything needed to run the hangman game
var inquire = require("inquirer");
var Inquirer = require("./inquirer")

// Global arrays containing words to be guessed
var mascots = ["Eagles", "Tigers", "Seminoles", "Cardinals", "Wolfpack", "Panthers", "Orange", "Cavaliers", "Hokies", "Volunteers", "Bulldogs", "Commodores", "Aggies", "Razorbacks", "Gamecocks", "Rebels", "Gators", "Wildcats", "Longhorns", "Trojans", "Ducks", "Buckeyes", "Wolverines", "Sooners", "Huskers"];
var schools = ["Boston College", "Clemson", "Florida State", "Louisville", "North Carolina State", "Pittsburgh", "Syracuse", "Virginia", "Virginia Tech", "Tennessee", "Georgia", "Vanderbilt", "Texas A&M", "Arkansas", "South Carolina", "Ole Miss", "Florida", "Kentucky", "Texas", "USC", "Oregon", "THE Ohio State", "Michigan", "Oklahoma", "Nebraska"];

function chooseDifficulty() {
    inquire.prompt([
        {
            type: "list",
            name: "difficulty",
            message: "What difficulty do you choose?",
            choices: ["Normal", "Hard"],
        }

    ]).then(function (answer) {
        if (answer.difficulty === 'Hard') {
            var game = new Inquirer(mascots);
            var run = game.startGame();
            if (run === false) {
                console.log("Oh no! You lost!\n")
                inquire.prompt([
                    {
                        type: "confirm",
                        name: "continue",
                        message: "Would you like to play again?",
                    }
            
                ]).then(function(answer2){
                    if (answer2.continue) {
                        chooseDifficulty();
                    }
                    else {
                        return;
                    }
                })
            }
            else {
                console.log("You got it right! Next word!");
                chooseDifficulty();
            }
        }
        else {
            var game = new Inquirer(schools);
            game.startGame();
        }
    })
}

chooseDifficulty();
