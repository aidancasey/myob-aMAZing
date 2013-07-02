
var jenniferImg = [
    'images/Quiz/Jennifer Lopez/Jennifer 1.gif',    
    'images/Quiz/Jennifer Lopez/Jennifer 2.gif',    
    'images/Quiz/Jennifer Lopez/Jennifer 3.gif',    
    'images/Quiz/Jennifer Lopez/Jennifer 4.gif',
    'images/Quiz/Jennifer Lopez/Jennifer 5.gif',
    'images/Quiz/Jennifer Lopez/Jennifer 6.gif'
];
var juliaImg = [
    'images/Quiz/Julia Roberts/Julia 1.gif',    
    'images/Quiz/Julia Roberts/Julia 2.gif',    
    'images/Quiz/Julia Roberts/Julia 3.gif',    
    'images/Quiz/Julia Roberts/Julia 4.gif',
    'images/Quiz/Julia Roberts/Julia 5.gif',
    'images/Quiz/Julia Roberts/Julia 6.gif'
];

var images = [{"name":"Jennifer Lopez", "images":jenniferImg},{"name":"Julia Roberts","images":juliaImg}];

var incrementor=0;
var randPerson="";
var num=0;

function loadImage() {

  var randPerson = images[Math.floor(Math.random() * images.length)];
  var img = document.createElement("IMG");
  document.getElementById('qiuz').appendChild(img);
  img.src =randPerson.images[0];

  var timeout=0;
  for (var i=0;i<randPerson.images.length;i++)
  { 
    var temp=randPerson.images[i];
    var func=function(){img.src =temp};
    timeout=timeout+3000;
    window.setTimeout(func,timeout);
  }
}

function StartPictureGame() {
  var img = document.createElement("IMG");
  document.getElementById('qiuz').appendChild(img);
  randPerson = images[Math.floor(Math.random() * images.length)];
  img.src =randPerson.images[num];
  return randPerson.name;
}

function Increment() {
  incrementor =incrementor +1;
  if (incrementor % 50 ==0) {
    num=num+1;
    img.src =randPerson.images[num];
  };

  if (num>5) {
    Reset();
   return false;
  };
  return true;
}

function Reset() {
  num=0;
  incrementor=0;
  var element = document.getElementById("qiuz");
  while (element.firstChild) {
  element.removeChild(element.firstChild);
  }
}

function CoorectAnswer() {

}