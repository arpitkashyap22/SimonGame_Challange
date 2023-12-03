const buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let gameStart = false;

let level = 0;

function playSound(name) {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function startOver() {
  gamePattern = [];
  level = 0;
  gameStart = false;
}

function nextSequence() {
    userClickedPattern=[];
    ++level;
    $("h1").text("level " + level);
      const randomNumber = Math.floor(Math.random() * 4);

  const randomChosenColour = buttonColor[randomNumber];
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
 
}



function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}





function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("Game Over")
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },2000);
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

$("body").keypress( function(e){
  if (!gameStart) {

      $("#level-title").text("Level " + level);
      nextSequence();
      gameStart = true;
    }
})

$(".btn").click(function (e) {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});



