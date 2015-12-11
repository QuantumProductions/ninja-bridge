"use strict";

class GameClient extends Client {
	installGame() {
		this.game = new NinjaBridge({canvas: this.canvas});
		console.log(this.game.p1);
		Thing.prototype.scale = this.scale();
	}
}