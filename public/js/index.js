(function (){
"use strict";

	$("#highest-score").html(window.localStorage.counterValue);
	$("img").css("display", "none");

	var score = 0;
	var randomNumber;
	var gameEnabled = false;
	var mobOnBoard;

	var randomImageGenerator = function () {
		var maxNumber = 15;
		randomNumber = Math.floor(Math.random() * maxNumber);
		var blockNumber = "[data-block='" + randomNumber + "']";

		if (mobOnBoard == false) {
			console.log ("adding mob to block#: " + blockNumber);
			$(blockNumber).addClass("img-class");
			mobOnBoard = true;
			setTimeout(function(){
				$(blockNumber).removeClass("img-class");
				mobOnBoard = false;
			}, 3000);
			randomImageGenerator();  //Does not seem to add another mob after deleting
			//even when I am setting mob on board to false
		}
	}

	var updateHighestScore = function () {
		if (score > window.localStorage.counterValue)
		{
			window.localStorage.counterValue = score;
			$("#highest-score").html(score);
		}
	}

	var updateScore = function (imgClicked) {
		if (imgClicked == randomNumber) 
		{
			score++;
			$("#player-score").html(score);
		}
	}

	var clearScore = function (){
		score = 0;
		$("#player-score").html(score);
	}

	var resetGame = function (){
		//remove all moles currently on the page		
		$(".img-class").removeClass("img-class");

		//Re-appear the start button
		$(".start-button").css("display", "inline");
		clearScore();
		gameEnabled = false;
	}

	var gameOver = function (){
		alert("Game Over!");
		updateHighestScore();
		resetGame();
	}
		
	//Event Listener
	$(".start-button").click (function () {
		gameEnabled = true;
		clearScore();
		updateHighestScore();
		//Remove the start button
		$(this).css("display", "none");
		mobOnBoard = false;
		randomImageGenerator();
		setTimeout(gameOver, 30000);
	});	

	//Event Listener
	$(".block").click (function (event) {
		// event.stopPropogation;
		if (gameEnabled) {
			var imageClicked = $(this).attr("data-block");
			var blockNumber = "[data-block='" + imageClicked + "']";

			//Remove the image
			// debugger;
			if (mobOnBoard == true) {
				$(blockNumber).removeClass("img-class");
				// console.log ("\n" + "removing mob");
				console.log ("\nblockNumber to remove mob from:" + blockNumber);
				mobOnBoard = false;
			}
			updateScore (parseInt(imageClicked));
			randomImageGenerator();			
		}
	});
})();

//there are two remove scenarios
//player clicks on the mob and the mob goes away
//in the remove class right above, remove the class after 3 seconds even if no click on it

//disable the event listener for the board when there is a mob on a block
//try stopPropogation