setTimeout(1000);

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function (){
    if(!started){
        $("#level-title").text("Level "+level)
        started=true;
        
        do{
            nextSequence();

        }
        while(checkAnswer(level))

    }
})

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  makeSound(userChosenColour);

  animatePress(userChosenColour);

  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length-1);

});


function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);
  level++;
  $("#level-title").text("Level "+level);

  animatePress(randomChosenColour);
  
  makeSound(randomChosenColour);
  
  console.log(gamePattern);

}

function makeSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(name){

    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+name).addClass("pressed");
    setTimeout(() => {
        $("#"+name).removeClass("pressed");
        
    }, 50);
    

    
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      makeSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
