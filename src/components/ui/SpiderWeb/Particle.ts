import { Vec2 } from "./Vec2";

/**
 * A point mass whose velocity is implicit: (pos - lastPos).
 * Gravity and friction are applied externally by the Simulation.
 */
export class Particle {
	pos: Vec2;
	lastPos: Vec2;

	constructor(pos: Vec2) {
		this.pos = new Vec2(pos.x, pos.y);
		this.lastPos = new Vec2(pos.x, pos.y);
	}

	/** Default draw — small dot. Override via Composite.drawParticles. */
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
		// ctx.fillStyle = "#9fa7a5";
		ctx.fill();
	}
}
