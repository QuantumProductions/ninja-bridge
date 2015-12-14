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

class XWalkingTilt extends Component {
	defaultMaxCharge() {
		return 30;
	}

	registrationNames() {
		return ['x-movement-tilt'];
	}

	getValue(name, hash) {
		var velocity = this.thing.getValue('velocity')
		//console.log("velocity" + velocity.vx);
		var maxRunSpeed = this.thing.getValue('max-run-speed')['maxRunSpeed'];
		// console.log("maxRunSpeed" + maxRunSpeed);
		var percentage = 0;
		if (velocity.vx > 0 && velocity.vx > maxRunSpeed) {
			percentage = 1;
		} else if (velocity.vx < 0 && velocity.vx < -maxRunSpeed) {
			percentage = -1;
		} else {
			percentage = velocity.vx / maxRunSpeed;
		}
		// console.log("percentage" + percentage);
		// console.log("max charge" + this.maxCharge * percentage);
		hash.angle = percentage * this.maxCharge;

		return hash;
	}
}

class AcceleratingMovement extends Component {
	constructor(options) {
		super(options);
		this.xDirection = 0;
	}

	registrationNames() {
		return ['velocity', 'input', 'max-run-speed']; //this could be modified to be 'go left', and 'go right'
	}

	getValue(name, hash) {
		if (name == 'velocity') {
			hash.vx = hash.vx + (0.1 * this.charge * this.xDirection);
			return hash;
		} else if (name == 'max-run-speed') {
			hash.maxRunSpeed = this.maxCharge * 0.1;
		}
		
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