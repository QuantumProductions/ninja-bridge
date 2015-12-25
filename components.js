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
		return [30];
	}

	registrationNames() {
		return ['x-movement-tilt'];
	}

	getValue(name, hash) {
		var velocity = this.thing.getValue('velocity')
		var maxRunSpeed = this.thing.getValue('max-run-speed')['maxRunSpeed'];
		var percentage = 0;
		if (velocity.vx > 0 && velocity.vx > maxRunSpeed) {
			percentage = 1;
		} else if (velocity.vx < 0 && velocity.vx < -maxRunSpeed) {
			percentage = -1;
		} else {
			percentage = velocity.vx / maxRunSpeed;
		}
		hash.angle = percentage * this.maxCharge[0];

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
			hash.vx = hash.vx + (0.1 * this.charge[0] * this.xDirection);
			return hash;
		} else if (name == 'max-run-speed') {
			hash.maxRunSpeed = this.maxCharge[0] * 0.1;
		}
		
		return hash;
	}

	processEvent(name, eventer, hash) {
		if (name == 'input') {
			if (hash.left) {
				if (this.xDirection != -1) {
					this.charge[0] = 0;
				}
				this.xDirection = -1;
				this.charge[0]++;
			} else if (hash.right) {
				if (this.xDirection != 1) {
					this.charge[0] = 0;
				}
				this.xDirection = 1;
				this.charge[0]++; //another component: max speed
			} else {
				this.xDirection = 0;
				this.charge[0] = 0; //another component: listen to input event.. stopped input, now decelerating
			}

			if (this.charge[0] > this.maxCharge[0]) {
				this.charge[0] = this.maxCharge[0]; //extract to limit function
			}
		}
	}
}

class SwordTip extends Component {
	registrationNames() {
		return [];
	}

	collisionGroups() {
		return ['players'];
	}	
}

class NinjaSwordWeapon extends Component {
	constructor(options) {
		super(options);
		this.relativeX = w(6);
		this.relativeY = 0;
	}

	defaultMaxCharge() {
		return [10];
	}

	registrationNames() {
		return ['input'];
	}

	processEvent(name, eventer, hash) {
		if (name == 'input') {
			if (hash.firing) {
				if (this.charge[0] == 0 ) {
					this.resetCharge(0);
					var combinedX = this.thing.x  + this.relativeX;
					console.log("combined" + combinedX);
					var combinedY = this.thing.y;
					var hitbox = new SwordHitbox({'position' : {'x' : combinedX, 'y' : combinedY}});
					console.log("hx" + hitbox.x);
					this.thing.game.add('hitboxes', hitbox);					
				}
			}
		}
	}

	loop() {
		this.charge[0]--;
		if (this.charge[0] < 0) {
			this.charge[0] = 0;
		}
	}
}