Thing.prototype.draw = function(client, context) {
	var drawables = this.componentRegistrations['draw'];
	for (var i = 0; i < drawables.length; i++) {
		var drawable = drawables[i];

		var fills = drawable.fills();
		for (var ri = 0; ri < fills.length; ri++) {
			var fill = fills[ri];
			var rect = fill[0];
			context.beginPath();
			context.moveTo(rect[0][0], rect[0][1]);
			for (var pi = 0; pi < rect.length; pi++) {
				var point = rect[pi];
				context.lineTo(point[0], point[1]);
			}
			context.lineTo(point[0], point[1]); //optional?
			context.closePath();
			context.fillStyle = this.getValue('colors').colors[fill[1]];
			context.fill();
		}

		var rectFills = drawable.rectFills();
		for (var ri = 0; ri < rectFills.length; ri++) {
			var rect = rectFills[ri];
			context.fillStyle = this.getValue('colors').colors[rect[4]];
			context.fillRect(rect[0],rect[1],rect[2],rect[3]);
		}

		var arcFills = drawable.arcFills();
		for (var ri = 0; ri < arcFills.length; ri++) {
			var arc = arcFills[ri];
			context.beginPath();
			context.fillStyle = this.getValue('colors').colors[rect[6]];
			context.arc(arc[0], arc[1], arc[2],arc[3], arc[4], arc[5]);
			context.fill();
			context.closePath();
		}


	}
};
