var inquirer = require ('inquirer');

var WordBank = require ('game.js');

var wordBank = new WordBank();

var Word = require('word.js')

var numGuessesRemaining = 10;

var randomWord = new Word(wordBank.wordBank[Math.floor(Math.random()* wordBank.length)]);

var userGuesses = [];

randomWord.getLetters();

var playHangman = function() {
	if (numGuessesRemaining > 0 && randomWord.found === false){
	console.log("welcome to hangman from hell");
	console.log("You have " + numGuessesRemaining + " guesses left.");

	inquirer.prompt([{
		type: 'text',
		name: 'letterGuessed',
		message: "Pick a letter dude.",
	}]).then(function(answers) {

		userGuesses.push(answers.letterGuessed);
		var noDuplicatesArr = noDuplicatesinUserGuess(userGuesses);

		var findHowManyofUserGuess = randomWord.checkIfLetterFound(answers.letterGuessed);
		console.log(randomWord.wordRender());

		if (findHowManyofUserGuess === 0) {
			console.log("Wrong!");
			numGuessesRemaining--;
	} else {
		console.log("Correct!");
		if (randomWord.didWeFindTheWord()) {
				console.log("Winner");
				console.log(displayWord(randomWord));
				return;
			}
		}
		console.log("You have" + numGuessesRemaining + " guesses left");
		console.log(randomWord.wordRender());
		console.log("Letters you've Guessed " + noDuplicatesArr.join(", "));
		playHangman();

	}) else {
		console.log("Invalid Input. Please pick a letter");
		playHangman();
	}

}
	} else {
		console.log("You Lost")
		console.log(displayWord(randomWord));
	}
}

//to check so that no duplicate 

function noDupsinUserGuess(userGuessArr) {
	var checkDupsArr = [];
	for (var i = 0; i <userGuessArr.length; i++){
		if (checkDupsArr.indexOf(userGuessArr[i] === -1){
			checkDupsArr.push(userGuessArr[i]);
		})
	}
	return checkDupsArr;
}
//display the answer
function displayWOrd(hangmanWord){
	var showWord = "";
	for (var i = 0; i< hangmanWord.correctLettersGuessed.length; i++){
		showWord += hangmanWord.correctLettersGuessed[i].letterGuessed;
	}
	return showWord;
}
function letterValidator(letter){
	for validLetters = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
	for (var i = 0; i < validLetters.length; i ++) {
		if (validLetters[i] === letter) {
			return true;
		}
	}
	return false;	
}
playHangman();