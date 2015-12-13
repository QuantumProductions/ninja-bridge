Thing.prototype.draw = function(client, context) {
	var drawables = this.componentRegistrations['draw'];
	for (var i = 0; i < drawables.length; i++) {
		var drawable = drawables[i];

		var rectFills = drawable.rectFills();

		for (var ri = 0; ri < rectFills.length; ri++) {
			var rect = rectFills[ri];
			context.fillStyle = this.getValue('colors', {}).colors[rect[4]];
			context.fillRect(rect[0],rect[1],rect[2],rect[3]);
		}

		var arcFills = drawable.arcFills();
		for (var ri = 0; ri < arcFills.length; ri++) {
			var arc = arcFills[ri];
			context.beginPath();
			context.fillStyle = this.getValue('colors', {}).colors[rect[6]];
			context.arc(arc[0], arc[1], arc[2],arc[3], arc[4], arc[5]);
			context.fill();
			context.closePath();
		}


	}
};
