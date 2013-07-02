
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
var img ="";

// function loadImage() {

//   var randPerson = images[Math.floor(Math.random() * images.length)];
//   var img = document.createElement("IMG");
//   document.getElementById('qiuz').appendChild(img);
//   img.src =randPerson.images[0];

//   var timeout=0;
//   for (var i=0;i<randPerson.images.length;i++)
//   { 
//     var temp=randPerson.images[i];
//     var func=function(){img.src =temp};
//     timeout=timeout+3000;
//     window.setTimeout(func,timeout);
//   }
// }

function StartPictureGame() {
  img = document.createElement("IMG");
  document.getElementById('qiuz').appendChild(img);
  randPerson = images[Math.floor(Math.random() * images.length)];
  img.src =randPerson.images[num];
  return randPerson.name;
}

function Increment() {
 console.log('increment');
  incrementor =incrementor +1;
  if (incrementor % 5 ==0) {
    console.log('changing picture');
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
if (num==5) {return 60;};
if (num==4) {return 50;};
if (num==3) {return 40;};
if (num==2) {return 30;};
if (num==1) {return 20;};
if (num==0) {return 10;};
return 6000;
}
