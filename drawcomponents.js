"use strict";

class NinjaDraw extends Draw {
	constructor(options) {
		super(options)
		this.foo = 5;
	}

	rectFills() {
		return [[this.thing.x - w(5), this.thing.y, w(10), h(15), 0]]; //use size
	}

	arcFills() {
		return [[this.thing.x, this.thing.y - h(15), w(6), 0, 2 * Math.PI, false, 0]];
	}

}