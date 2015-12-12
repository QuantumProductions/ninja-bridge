"use strict";

class Ninja extends Thing {
	spawnComponents(options) {
		return [new Mover(), new XWalker(), 
		new AcceleratingMovement(),
		new Colors({'colors' : options['teamColors']})];
	}
}

