"use strict";

class NinjaDraw extends Draw {
	constructor(options) {
		super(options)
		this.foo = 5;
	}

	rectFills() {
		return [[this.thing.x, this.thing.y, 6, 9, 0]];
	}

}