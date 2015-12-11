"use strict";

class NinjaBridge extends Game {
	installSounds() {
	}

	handleSoundsLoaded() {
	}

	installGroupLoops() {
		super.installGroupLoops();

	}

	handleOutOfBounds(group_name, thing) {
	}

	
	setupPlayers() {
		this.p1 = new Ninja();
		this.add('p1', this.p1);
	}

	resetGame() {
		super.resetGame();
	}

	onMouseDown(x, y) {
	}

	loop() {
		super.loop();
	}
}

class Ninja extends Thing {
	spawnComponents() {
		return [Mover, XWalker, TurboMover];
	}
}

