Thing.prototype.draw = function(client, context) {
	var drawables = this.componentRegistrations['draw'];
	for (var i = 0; i < drawables.length; i++) {
		var drawable = drawables[i];
		var rects = drawable.rects();
		for (var ri = 0; ri < rects.length; ri++) {
			var rect = rects[ri];
			client.drawRect(rect[0],rect[1],rect[2],rect[3], this.getValue('colors', {}).colors[rect[4]]);
		}
	}
	
	//var registered = this.componentRegistrations[name];
	
};
