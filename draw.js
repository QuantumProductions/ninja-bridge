Thing.prototype.draw = function(client, context) {
	client.drawRect(this.x,this.y,6,9, this.getValue('colors', {}).colors[0]);
};
