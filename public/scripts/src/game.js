var canvas = $("#game")[0].getContext('2d');

draw();
canvas.moveTo(100, 100);
canvas.lineTo(200, 200);
canvas.stroke();

function draw(){
	drawHexagon(50, 50);

	function drawHexagon(x, y){
		var length = 25;

		canvas.fillStyle="#FF0000";
		canvas.moveTo(x, y);
		canvas.lineTo(x+length, y);
		canvas.lineTo(x+length+length/2, y+ length/(Math.sqrt(2)));
		canvas.lineTo(x+length, y+2*length/Math.sqrt(2));
		canvas.lineTo(x, y+2*length/Math.sqrt(2));
		canvas.lineTo(x - length/2, y + length/(Math.sqrt(2)));
		canvas.lineTo(x, y);
		canvas.stroke();
	}
}