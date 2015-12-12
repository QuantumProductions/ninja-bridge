"use strict";

class GameClient extends Client {
	installGame() {
		this.game = new NinjaBridge({canvas: this.canvas});
		Thing.prototype.scale = this.scale();
	}
}