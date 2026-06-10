import { Vec2 } from "./Vec2";
import { Particle } from "./Particle";

export interface Constraint {
	relax(stepCoef: number): void;
	draw(ctx: CanvasRenderingContext2D): void;
}

// ── Distance Constraint ────────────────────────────────────────────────────
// Pulls two particles toward a target separation distance.

export class DistanceConstraint implements Constraint {
	distance: number;

	constructor(
		public a: Particle,
		public b: Particle,
		public stiffness: number,
		distance?: number,
	) {
		this.distance =
			distance !== undefined ? distance : a.pos.sub(b.pos).length();
	}

	relax(stepCoef: number): void {
		const normal = this.a.pos.sub(this.b.pos);
		const m = normal.length2();
		const correction =
			((this.distance ** 2 - m) / m) * this.stiffness * stepCoef;
		normal.mutableScale(correction);
		this.a.pos.mutableAdd(normal);
		this.b.pos.mutableSub(normal);
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.moveTo(this.a.pos.x, this.a.pos.y);
		ctx.lineTo(this.b.pos.x, this.b.pos.y);
		// ctx.strokeStyle = "#d8dde2";
		ctx.stroke();
	}
}

// ── Pin Constraint ─────────────────────────────────────────────────────────
// Locks a particle to a fixed world position (can be dragged interactively).

export class PinConstraint implements Constraint {
	pos: Vec2;

	constructor(
		public a: Particle,
		pos: Vec2,
	) {
		this.pos = new Vec2(pos.x, pos.y);
	}

	relax(_stepCoef: number): void {
		void _stepCoef;
		this.a.pos.mutableSet(this.pos);
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, 6, 0, 2 * Math.PI);
		// ctx.fillStyle = "rgba(57, 85, 99, 1)";
		ctx.fill();
	}
}

// ── Angle Constraint ───────────────────────────────────────────────────────
// Resists changes to the angle at particle `b` between particles `a` and `c`.

export class AngleConstraint implements Constraint {
	private restAngle: number;

	constructor(
		public a: Particle,
		public b: Particle,
		public c: Particle,
		public stiffness: number,
	) {
		this.restAngle = b.pos.angle2(a.pos, c.pos);
	}

	relax(stepCoef: number): void {
		let diff = this.b.pos.angle2(this.a.pos, this.c.pos) - this.restAngle;

		// Wrap to [-π, π]
		if (diff <= -Math.PI) diff += 2 * Math.PI;
		else if (diff >= Math.PI) diff -= 2 * Math.PI;

		diff *= stepCoef * this.stiffness;

		this.a.pos = this.a.pos.rotate(this.b.pos, diff);
		this.c.pos = this.c.pos.rotate(this.b.pos, -diff);
		this.b.pos = this.b.pos.rotate(this.a.pos, diff);
		this.b.pos = this.b.pos.rotate(this.c.pos, -diff);
	}

	draw(ctx: CanvasRenderingContext2D): void {
		const tmp = ctx.lineWidth;
		ctx.beginPath();
		ctx.moveTo(this.a.pos.x, this.a.pos.y);
		ctx.lineTo(this.b.pos.x, this.b.pos.y);
		ctx.lineTo(this.c.pos.x, this.c.pos.y);
		ctx.lineWidth = 5;
		// ctx.strokeStyle = "rgba(255,255,0,0.2)";
		ctx.stroke();
		ctx.lineWidth = tmp;
	}
}
