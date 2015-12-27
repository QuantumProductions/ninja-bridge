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
		this.r = 10;
		this.x = 0;
		this.y = 0;
		this.length = w(60);
		this.sheathe();
		this.resetR = 140;
		this.slashR = 210;
	 	this.hitbox = new SwordHitbox(); //these could all be dictionaries... this.atr[resetR]
	 	                                 //ninja-sword-tip.. this.atr['ninja-sword-tip']
    this.swordtip = {'x' : 0, 'y' : 0};
	}

	postRegistration() {
		this.calculateSwordTip();
	}

	calculateSwordTip() {
		var yPoint = this.thing.y - this.length;
		var lastX = this.thing.getValue('lastx').lastx;
		var tilt = this.r * -lastX;
		this.swordtip = rotate_point(this.thing.x, yPoint, this.thing.x, this.thing.y, tilt);
	}

	defaultMaxCharge() {
		return [10];
	}

	registrationNames() {
		return ['input', 'ninja-sword-tip', 'ninja-sword-hitbox'];
	}

	sheathe() {
		this.sheathed = true;
	}

	slash() {
		this.r = this.slashR;
		this.sheathed = false;
		this.resetCharge(0);
	}

	getValue(name, hash) {
		if (name == 'ninja-sword-tip') {
			this.calculateSwordTip();
			hash.ninjaSwordTip = this.swordtip;
		} else if (name == 'ninja-sword-hitbox') {
			hash.ninjaSwordHitbox = this.hitbox;
		}

		return hash;
	}

	canSlash() {
		return this.r == this.resetR;
	}

	processEvent(name, eventer, hash) {
		if (name == 'input') {
			if (hash.firing == true && this.sheathed && this.canSlash()) {
				this.slash();
			}
		}
	}

	rotateBladeTowardsReset() {
		this.r+= 7;
		if (this.r > 360) {
			this.r-= 360;
		}
	}

	loop() {
		if (this.sheathed) {
			if (!this.canSlash()) {
				this.rotateBladeTowardsReset();
				
				if (this.r > this.resetR) {
					this.r = this.resetR;
				}
			}
		} else {
			this.r+= 14;
			this.charge[0]--;
			if (this.charge < 0) {
				this.sheathe();
			}
		}

		this.calculateSwordTip();
		this.hitbox.x = this.swordtip.x;
		this.hitbox.y = this.swordtip.y;
	}
}