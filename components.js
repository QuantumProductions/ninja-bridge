"use strict";

class Colors extends Component {
	registrationNames() {
		return ['colors'];
	}

	constructor(options) {
		super(options);
		this.colors = options['colors'];
	}

	getValue(name, hash) {
		if (name == 'colors') {
			hash.colors = this.colors;
		}

		return hash;
	}	
}

class AcceleratingMovement extends Component {
	constructor(options) {
		super(options);
		this.xDirection = 0;
	}

	registrationNames() {
		return ['velocity', 'input']; //this could be modified to be 'go left', and 'go right'
	}

	getValue(name, hash) {
		hash.vx = hash.vx + (0.1 * this.charge * this.xDirection);
		return hash;
	}

	processEvent(name, eventer, hash) {
		if (name == 'input') {
			if (hash.left) {
				if (this.xDirection != -1) {
					this.charge = 0;
				}
				this.xDirection = -1;
				this.charge++;
			} else if (hash.right) {
				if (this.xDirection != 1) {
					this.charge = 0;
				}
				this.xDirection = 1;
				this.charge++; //another component: max speed
			} else {
				this.xDirection = 0;
				this.charge = 0; //another component: listen to input event.. stopped input, now decelerating
			}

			if (this.charge > this.maxCharge) {
				this.charge = this.maxCharge; //extract to limit function
			}
		}
	}
}