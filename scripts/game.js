var canvas;  
var ctx;
var dx = 5;
var dy = 5;
var x = 240;
var y = 25;
var img = new Image();
var collision = 0;

var command = "";

var maze = {};
maze.width = 482;
maze.height = 482;



function setPosition(xPos,yPos)
{
  x= xPos;
  y = yPos;
}


function clear() {
  ctx.clearRect(0, 0, maze.width, maze.height);
  ctx.drawImage(img, 0, 0);
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  img.src = "images/maze.gif";
  return setInterval(draw, 200);
}

function doMovement(command){
console.log('doMovement');
  switch (command) {
    case 'up':  /* Up */
      if (y - dy > 0){ 
        y -= dy;
        clear();
        checkcollision();
        if (collision == 1){
          y += dy;
          collision = 0;
        } 
      }

      break;
    case 'down':  /* Down  */
      if (y + dy < maze.height ){ 
        y += dy;
        clear();
        checkcollision();
        if (collision == 1){
          y -= dy;
          collision = 0;
        }
      }

      break;
    case 'left':  /* Left  */
      if (x - dx > 0){ 
        x -= dx;
        clear();
        checkcollision();
        if (collision == 1){
          x += dx;
          collision = 0;
        }
      }
      break;
    case 'right':  /* Right  */
      if ((x + dx < maze.width)){ 
        x += dx;
        clear();
        checkcollision();
        if (collision == 1){
          x -= dx;
          collision = 0;
        }
      }
      break;
  }
}
function checkcollision() {
  var imgd = ctx.getImageData(x, y, 15, 15);
  var pix = imgd.data;
  for (var i = 0; n = pix.length, i < n; i += 4) {
  console.log(pix[i]);
  if (pix[i] != 84) {
      collision = 1;
    }
  }
}

function draw() {
  clear();          
  ctx.fillStyle = "white";

  //every time we redraw we process the user command - up , down etc...
  doMovement(command);

  rectangle(x, y, 15,15);

}

function rectangle(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

init();
//window.addEventListener('keydown',doKeyDown,true);



var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
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
      
 //     showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
      //  showInfo('info_blocked');
      } else {
       // showInfo('info_denied');
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
   // showInfo('');
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
    
        final_transcript = getCommand(event.results[i][0].transcript) + ' ' + event.results[i][0].transcript + '\n' + final_transcript;

    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);

  };
}

function getCommand(s) {
  
  var res = '**';

  var word = s.toLowerCase().replace(/\s/g, '');
  
  if (word.indexOf('up') !=-1)
  {
      $('#userCommand span').text('UP');
      command='up';
  }

  if (word.indexOf('down') !=-1)
  {
      $('#userCommand span').text('DOWN');
      command='down';

  }

  if (word.indexOf('left') !=-1)
  {
      $('#userCommand span').text('LEFT');
      command='left';
  }

  if (word.indexOf('right') !=-1)
  {
      $('#userCommand span').text('RIGHT');
            command='right';
  }

    if (word.indexOf('stop') !=-1)
  {
      $('#userCommand span').text('STOP');
            command='';
  }



  console.log("Word:>>" + word + "<<");
  
  switch(word)
  {
  case "up":
    res = 'W';
    break;
  case "down":
    res = 'S';
    break;
  case "left":    
    res = 'A';
    break;
  case "right":
  //case "rod":
    res = 'D';
    break;      
  } 
  console.log("Res" + res);
  return res;
  
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