var buttonClours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColour = [];
var level = 0;
var gameStarted = false;

// play sound
function playSound(selectedColour) {
  var audio = new Audio("./sounds/" + selectedColour + ".mp3");
  audio.play();
}

// animation for the button press
function animatePress(selectedButtonId) {
  $("#" + selectedButtonId).addClass("pressed");
  setTimeout(function () {
    $("#" + selectedButtonId).removeClass("pressed");
  }, 100);
}

// generating the colour sequence.
function nextSequence() {
  userChosenColour = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonClours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  console.log(randomChosenColour);
}

// start
function startOver() {
  gamePattern = [];
  level = 0;
  gameStarted = false;
}
// checking the input colour answer.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenColour[currentLevel]) {
    //   console.log("success");
    if (userChosenColour.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //   console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

$(".btn").on("click", function () {
  var clicked = $(this).attr("id");
  userChosenColour.push(clicked);
  animatePress(clicked);
  playSound(clicked);
  checkAnswer(userChosenColour.length - 1);
});

$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});
