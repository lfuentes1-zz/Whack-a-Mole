(function (){
"use strict";

	$("#highest-score").html(window.localStorage.counterValue);

	var score = 0;
	var randomNumber;
	var gameEnabled = false;

	var randomImageGenerator = function () {
		var maxNumber = 9;
		randomNumber = Math.floor(Math.random() * maxNumber);
		var blockNumber = "[data-block='" + randomNumber + "']";

		//if the click equals to the random number from previous round, then 
		$(blockNumber).addClass("img-class");
		//else don't add another mole because then there will be two moles on the screen
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
		randomImageGenerator();
		setTimeout(gameOver, 15000);
	});	

	//Event Listener
	$(".block").click (function () {
		if (gameEnabled) {
			var imageClicked = $(this).attr("data-block");
			var blockNumber = "[data-block='" + imageClicked + "']";

			//Remove the image
			$(blockNumber).removeClass("img-class");
			updateScore (parseInt(imageClicked));
			randomImageGenerator();
		}
	});
})();