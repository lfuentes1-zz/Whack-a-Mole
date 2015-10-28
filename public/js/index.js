(function (){
"use strict";

	var score = 0;
	var randomNumber;

	var randomImageGenerator = function () {
		var maxNumber = 9;
		randomNumber = Math.floor(Math.random() * maxNumber);
		var blockNumber = "[data-block='" + randomNumber + "']";

		$(blockNumber).addClass("img-class");
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
			console.log ("inside the funciton");
			score++;
			$("#player-score").html(score);
		}
	}

	var clearScore = function (){
		score = 0;
		$("#player-score").html(score);
	}

	var gameOver = function (){
		alert("Game Over!");
		updateHighestScore();
		$(".start-button").css("display", "inline");
		//remove all moles currently on the page
		$(".img-class").css("display", "none");
	}
		
	//Event Listener
	$(".start-button").click (function () {
		clearScore();
		//Remove the start button
		$(this).css("display", "none");
		randomImageGenerator();
		setTimeout(gameOver, 5000);
	});	

	//Event Listener
	$(".block").click (function () {

		var imageClicked = $(this).attr("data-block");
		var blockNumber = "[data-block='" + imageClicked + "']";

		//Remove the image
		$(blockNumber).removeClass("img-class");
		updateScore (parseInt(imageClicked));
		randomImageGenerator();

	});

})();