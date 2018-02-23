function Validation(char, goal) {
    var superThis = this;
    superThis.guess = char;
    superThis.goalWord = goal.newWord;
    superThis.maskedWord = goal.maskedWordObject.mysteryWord;
    superThis.guesses = goal.newWord.length + 5;
    superThis.guessedChars = [];
    superThis.validateGuess = function () {
        if (superThis.guessedChars.indexOf(superThis.guess) > -1) {
            console.log("You have already guessed that character! Try again.");
            return "Continue";
        }
        else {
            if (superThis.guesses > 0) {
                superThis.guesses--;
                superThis.guessedChars.push(superThis.guess);
                if (superThis.goalWord.indexOf(superThis.guess) > -1) {
                    var charIndices = [];
                    for (var i = 0; i < superThis.goalWord.length; i++) {
                        if (superThis.goalWord[i].toUpperCase() === superThis.guess || superThis.goalWord[i].toLowerCase() === superThis.guess) {
                            charIndices.push(i);
                        }
                    }
                    for (var i = 0; i < charIndices.length; i++) {
                        if (charIndices[i] == 0) {
    
                            var newMaskedWord = superThis.guess + superThis.maskedWord.substr(1);
                            superThis.maskedWord = newMaskedWord;
                            goal.maskedWordObject.mysteryWord = newMaskedWord;
    
                        } else if (charIndices[i] == superThis.maskedWord.length - 1) {
    
                            var newMaskedWord = superThis.maskedWord.substr(0, superThis.maskedWord.length - 1) + superThis.guess;
                            superThis.maskedWord = newMaskedWord;
                            goal.maskedWordObject.mysteryWord = newMaskedWord;
    
                        } else {
                            var newMaskedWord = superThis.maskedWord.substr(0, charIndices[i]) + superThis.guess + superThis.maskedWord.substr(charIndices[i] + 1);
                            superThis.maskedWord = newMaskedWord;
                            goal.maskedWordObject.mysteryWord = newMaskedWord;
                        }
                    }
                    console.log(superThis.maskedWord);
                    console.log("\nCorrect!!!!")
                    return "Continue"; 
                }
                else {
                    console.log(superThis.maskedWord);
                    console.log("\nIncorrect!!!!")
                    return "Continue"; 
                }

            }
            else {
                return false;
            }
        }
    }
}

module.exports = Validation;