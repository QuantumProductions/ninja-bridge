"use strict";

class Client {
	styleCanvas(canvas) {
		var context = canvas.getContext('2d');
		context.textAlign = 'center';
		context.font = '30pt Courier New';
	}

	scale() {
		return 1.0;
	}

	generateCanvas() {
		var canvas = document.createElement("canvas");
		canvas.width = 600 * this.scale();
		canvas.height = 600 * this.scale();
		//canvas = 
		this.styleCanvas(canvas);	
		return canvas;
	}

	installRendering() {
		this.installCanvas();
		this.installBuffer();
	}

	installCanvas() {
		this.canvas = this.generateCanvas();
		document.getElementById("game_container").appendChild(this.canvas); 
	}

	installBuffer() {
//		this.buffer = this.generateCanvas();
	}

	installInput() {
		this.installMouseInput();
		this.installKeyboardInput();
	}

	installMouseInput() {
		this.canvas.addEventListener("click", this.onMouseDown.bind(this), false);
	}

	installKeyboardInput() {
		window.addEventListener("keydown", this.onKeyDown.bind(this), true);
		window.addEventListener("keyup", this.onKeyUp.bind(this), true);

		this.key_pressed_map = [];

		this.key_map = {
			37: 'L1',
			38: 'U1',
			39: 'R1',
			40: 'D1',
			16: 'A1',
			82: 'L2',
			70: 'U2',
			83: 'D2',
			84: 'R2',
			90: 'A2',

			49: 'DEBUG1',
			50: 'DEBUG2',
			51: 'DEBUG3',
			52: 'DEBUG4'
			

		}
	}

	installTime() {
		this.now, this.dt, this.last = Date.now();
		this.dt = 0.00;

		this.rate = 10;
	}


	installLoops() {
		window.requestAnimationFrame(this.loop.bind(this));
	}

	constructor(options) {
		this.installRendering();
		this.installInput();
		this.installGame()
		this.installTime();
		this.installLoops();
	}

	loop() {
		this.now = Date.now();
		var delta  = this.now - this.last;
		this.last = this.now;

		this.dt = this.dt + delta;

		if (this.dt < this.rate) {
			window.requestAnimationFrame(this.loop.bind(this));
			return;
		} else {
			this.game.loop();
			this.draw();
			this.dt = this.dt - this.rate;
		}

		this.game.loopKeyboardInput(this.key_pressed_map);
		
		window.requestAnimationFrame(this.loop.bind(this));
	}

	draw() {
		this.setBackground();

		var group_names = this.game.groupNames();

		for (var group_index = 0; group_index < group_names.length; group_index++) {
			var group = this.game.things[group_names[group_index]];

			for (var i = 0; i < group.length; i++) {
				var thing = group[i];
				if (thing.active) {
					thing.draw(this, this.context());
				}
			}

		}

		
	}

	context() {
		return this.canvas.getContext('2d');
	}

	drawRect(x,y,w,h, colour) {
		this.context().fillStyle = colour;
		this.context().fillRect(x,y,w,h)
	}

	setBackground() {
		this.context().clearRect(0, 0, this.canvas.width, this.canvas.height); //500
		this.context().fillStyle = "black";
		this.context().fillRect(0,0, this.canvas.width, this.canvas.height);
	}


	installGame() {

	}

	onKeyUp(event) {
		this.key_pressed_map[this.key_map[event.keyCode]] = false;
	}

	onKeyDown(event) {
		event.preventDefault();
		this.key_pressed_map[this.key_map[event.keyCode]] = true;
	}

	onMouseUp(event) {
		var x = event.layerX;
		var y = event.layerY;
		this.game.onMouseUp(x, y);
	}

	onMouseDown(event) {
		var x = event.layerX;
		var y = event.layerY;
		this.game.onMouseDown(x, y);
	}
}
