var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;
var started=false;

// play sounds
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
// press animation
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
//start Over
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
// check if the user sequence matches the game sequence
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){//checks the latest one
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        newSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
// generates new sequence
function newSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);

  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
// start when key is pressed
$(document).keydown(function(){
  if(started===false){
    $("h1").text("Level"+level);
    newSequence();
  }
  started=true;
});
// user click section
$(".btn").click(function(){
  var userChosenColor=this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})
