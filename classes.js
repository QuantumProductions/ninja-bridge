"use strict";

class Ninja extends Thing {
	spawnComponents(options) {
		return [new Mover(), new XWalker(), 
		new Colors({'colors' : options['teamColors']})];
	}
}

