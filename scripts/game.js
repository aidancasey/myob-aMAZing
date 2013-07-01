var canvas;  
var ctx;
var dx = 5;
var dy = 5;
var x = 240;
var y = 25;
var WIDTH = 482;
var HEIGHT = 482; 
var img = new Image();
var collision = 0;


 
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(img, 0, 0);
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  img.src = "images/maze.gif";
  return setInterval(draw, 10);
}

function doKeyDown(evt){
  switch (evt.keyCode) {
    case 87:  /* Up */
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
    case 83:  /* Down  */
      if (y + dy < HEIGHT ){ 
        y += dy;
        clear();
        checkcollision();
        if (collision == 1){
          y -= dy;
          collision = 0;
        }
      }

      break;
    case 65:  /* Left  */
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
    case 68:  /* Right  */
      if ((x + dx < WIDTH)){ 
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
  rectangle(x, y, 15,15);
}

function rectangle(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

init();
window.addEventListener('keydown',doKeyDown,true);

