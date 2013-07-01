
var ANIMATION = (function () {
	
	var me = {};
	var _canvas = null;

	me.setCanvas = function (canvas){
	_canvas = canvas;
    }


me.rectangle = function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

	return me;
}());