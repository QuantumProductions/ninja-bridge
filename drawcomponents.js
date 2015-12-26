"use strict";

class NinjaDraw extends Draw {
	registrationNames() {
		return super.registrationNames().concat(['collisionVertexes']);
	}

	strokes() {
		var swordTip = this.thing.getValue('ninja-sword-tip').ninjaSwordTip;
		//console.log("sword tip" + swordTip.x);
		return [[[this.thing.x, this.thing.y, swordTip.x, swordTip.y], 0]];
	}

	getValue(name, hash) {
		if (name == 'collisionVertexes') {
			hash.collisionVertexes = this.bodyVertexes();
		}

		return hash;
	}

	bodyVertexes() {
		 return [[this.thing.x - w(5), this.thing.y - h(7.5)], [this.thing.x + w(5), this.thing.y - h(7.5)],
								[this.thing.x + w(5), this.thing.y + h(7.5)], [this.thing.x - w(5), this.thing.y + h(7.5)]];
	}

	fills() {
		var body = this.bodyVertexes();

		var angle = this.thing.getValue('x-movement-tilt').angle;

		body = pointArrayRotated(body, angle, this.thing.position());
		return [[body, 0]];
	}

	rectFills() {
		return [];
		//return [[this.thing.x - w(5), this.thing.y, w(10), h(15), 0]]; //use size
	}

	arcFills() {
		var angle = this.thing.getValue('x-movement-tilt').angle;
		var point = rotate_point(this.thing.x, this.thing.y - h(15), this.thing.position().x, this.thing.position().y, angle);
		return [[point.x, point.y, w(6), 0, 2 * Math.PI, false, 0]];
	}

}