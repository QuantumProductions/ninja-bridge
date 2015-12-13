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
		this.p2 = new Ninja({'position' : {'x' : 0.1, 'y' : 0.8},
													'teamColors' : ['white']});
		this.add('p2', this.p2);

		this.p1 = new Ninja({'position' : {'x' : 0.9, 'y' : 0.8},
			'teamColors' : ['red']});
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