var canvas;  
var ctx;
var dx = 5;
var dy = 5;
var x = 240;
var y = 25;
var mazeImg = new Image();
var countDownFrom = 100;
var isPictureGameRunning = false;
var pictureQuestionAnswer ="";
var answerCorrect = false;

var command = "";

var maze = {};
maze.width = 482;
maze.height = 482;
maze.finishLineY = 450;


function setPosition(xPos,yPos){
  x= xPos;
  y = yPos;
}

function setCanvas(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}

function setImageSource(){
  mazeImg.src = "images/maze.gif";
}

function startGameLoop(){
  return setInterval(gameLoop, 200);
}

function clearBlock() {
  ctx.clearRect(0, 0, maze.width, maze.height);
  ctx.drawImage(mazeImg, 0, 0);
}

function drawBlock(x,y,w,h) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function loadGame() {
  console.log('loadGame');
  setCanvas();
  setImageSource();
  timer.reset(countDownFrom);
startGameLoop();

}

function startGame() {
    timer.start(1000);
}

function startPictureGame()
{
  if (isPictureGameRunning)
  {
    return;
  }

    isPictureGameRunning =true;
    pictureQuestionAnswer = StartPictureGame();
    console.log('the answer should be ' + pictureQuestionAnswer);
}

function pictureGameCorrectAnswer()
{
  //tell picture game the answer is correct 
  // add the appropiate number of milliseconds to timer and continue
  isPictureGameRunning = false;

}


function processCommand(command){
  switch (command) {
case 'help':
if (!isPictureGameRunning)
{
  console.log('help');
     if (!isPictureGameRunning)
     {
     //stop timer
    stopTheClock();
    startPictureGame();
   }
}
break;
    case 'up':
      if (y - dy > 0){ 
        y -= dy;
        if (checkcollision()){
          y += dy;
        } 
      }

      break;
    case 'down':
      if (y + dy < maze.height ){ 
        y += dy;
        if (checkcollision()){
          y -= dy;
        } 

      }

      break;
    case 'left':
      if (x - dx > 0){ 
        x -= dx;
        if (checkcollision()){
          x += dx;
        } 
      }
      break;
    case 'right': 
      if ((x + dx < maze.width)){ 
        x += dx;
        if (checkcollision()){
          x -= dx;
        } 
      }
      break;
  }
}
function checkcollision() {
  var imgd = ctx.getImageData(x, y, 15, 15);
  var pix = imgd.data;
  for (var i = 0; n = pix.length, i < n; i += 4) {
  //console.log(pix[i]);

  if (pix[i] != 83) {
      return true;
    }
  }
  return false;
}

function checkGameOver() {

   if ((y >= 400) && (x>=210))
  {
    return true;
  }
  return false;
}

function doGameOver()
{
  stopTheClock();
  tellUserGameOver();
}

function stopTheClock(){
timer.stop();

}

function addTimeToClock(bonusTime){
  var currentTime = timer.getTime();
  newTime = currentTime+bonusTime;
  timer.reset(newTime);
}

function startTheClock(){
timer.start(1000);
}

function tellUserGameOver(){
alert('Game Over');  
}  






function gameLoop() {  
 console.log('gameloop'); 
  if (isPictureGameRunning)
  {
    if (answerCorrect)
    {

      console.log('resetting adter correct ans');
      isPictureGameRunning = false;
      //start clock again
      var bonusTime = CoorectAnswer();
      Reset(); 
      addTimeToClock(bonusTime);
      answerCorrect= false;
      startTheClock();

      return;
    }

   var stillRunning = Increment();

    if (!stillRunning)
    {
      isPictureGameRunning = false;
      command = "";
      startTheClock();
    }
   return;
  }

  clearBlock();          
  processCommand(command);
  drawBlock(x, y, 15,15);
  if(checkGameOver()){
    //game over we have a winner

    doGameOver();
      }
}

function show_Info(message)
{
  console.log(message);
}


var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  //does't fire with Chrome as we have web kit speech recog..
  upgrade();
} 
else {
  
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
            ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
     
      show_Info('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
       show_Info('info_blocked');
      } else {
       show_Info('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    
    if (!final_transcript) {
    //  showInfo('info_start');
      return;
    }

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }

  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      upgrade();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
			getCommand(event.results[i][0].transcript);

      if (isPictureGameRunning)
      {
        if (IsRightAnswer(event.results[i][0].transcript))
        {
          answerCorrect = true;
        }
      }

      final_transcript = event.results[i][0].transcript + '\n' + final_transcript;

    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);

  };
}

function showFriendlyCommandName(cmd)
{
  $('#userCommand span').text(cmd);
}


function IsRightAnswer(s){

var word = s.toLowerCase().replace(/\s/g, '');
//console.log('foo :' + pictureGameCorrectAnswer);
var picName = pictureQuestionAnswer.toLowerCase().replace(/\s/g, '');
  
  if (word.indexOf(picName) !=-1){
  return true;
  }
  return false;
}

function getCommand(s) {
  
  var res = '**';

  var word = s.toLowerCase().replace(/\s/g, '');
  
  if (word.indexOf('up') !=-1)
  {
      command='up';
  }
if (word.indexOf('help') !=-1)
  {
      command='help';
  }
 
  if (word.indexOf('down') !=-1)
  {
       command='down';
  }
  if (word.indexOf('left') !=-1)
  {
      command='left';
  }
  if (word.indexOf('right') !=-1)
  {
      command='right';
  }
  if (word.indexOf('stop') !=-1)
  {
     command='';
  }

  showFriendlyCommandName(command);
  console.log("Word:>>" + word + "<<");
  
}


function upgrade() {
  start_button.style.visibility = 'hidden';

}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {

  startGame();

  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en';  
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_timestamp = event.timeStamp;
}

var current_style;