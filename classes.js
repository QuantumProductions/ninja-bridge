"use strict";

class Ninja extends Thing {
	spawnComponents(options) {
		return [new Mover(), new XWalker(), 
		new AcceleratingMovement({'maxCharge' : 50}),
		new Colors({'colors' : options['teamColors']})];
	}
}

