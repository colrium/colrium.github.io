export class Vec2 {
	constructor(
		public x: number = 0,
		public y: number = 0,
	) {}

	// ── Immutable operations (return new Vec2) ──────────────────────────────

	add(v: Vec2): Vec2 {
		return new Vec2(this.x + v.x, this.y + v.y);
	}
	sub(v: Vec2): Vec2 {
		return new Vec2(this.x - v.x, this.y - v.y);
	}
	scale(c: number): Vec2 {
		return new Vec2(this.x * c, this.y * c);
	}
	normal(): Vec2 {
		const m = this.length();
		return new Vec2(this.x / m, this.y / m);
	}

	rotate(origin: Vec2, theta: number): Vec2 {
		const dx = this.x - origin.x;
		const dy = this.y - origin.y;
		return new Vec2(
			dx * Math.cos(theta) - dy * Math.sin(theta) + origin.x,
			dx * Math.sin(theta) + dy * Math.cos(theta) + origin.y,
		);
	}

	// ── Mutable operations (modify in place, return this) ──────────────────

	mutableSet(v: Vec2): this {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	mutableAdd(v: Vec2): this {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	mutableSub(v: Vec2): this {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	mutableScale(c: number): this {
		this.x *= c;
		this.y *= c;
		return this;
	}

	// ── Measurements ───────────────────────────────────────────────────────

	length(): number {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}
	length2(): number {
		return this.x ** 2 + this.y ** 2;
	}
	dist2(v: Vec2): number {
		return (v.x - this.x) ** 2 + (v.y - this.y) ** 2;
	}
	dot(v: Vec2): number {
		return this.x * v.x + this.y * v.y;
	}

	angle(v: Vec2): number {
		return Math.atan2(
			this.x * v.y - this.y * v.x,
			this.x * v.x + this.y * v.y,
		);
	}

	/** Signed angle at `this` between rays toward `vLeft` and `vRight`. */
	angle2(vLeft: Vec2, vRight: Vec2): number {
		return vLeft.sub(this).angle(vRight.sub(this));
	}
}
