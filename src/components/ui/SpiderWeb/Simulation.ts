import { Vec2 } from "./Vec2";
import { Particle } from "./Particle";
import { Composite, SpiderComposite, LegSegmentSets } from "./Composite";
import {
	Constraint,
	DistanceConstraint,
	PinConstraint,
	AngleConstraint,
} from "./Constraint";

// ── Physics constants ──────────────────────────────────────────────────────

const GRAVITY = new Vec2(0, 0.2);
const FRICTION = 0.99;
const GROUND_FRICTION = 0.8;
const BASE_SELECTION_RADIUS = 20;

// ── Draggable interface ────────────────────────────────────────────────────
// Both Particle and PinConstraint expose a mutable `.pos` and can be dragged.

interface Draggable {
	pos: Vec2;
}

// ── Simulation ─────────────────────────────────────────────────────────────

export class Simulation {
	composites: Composite[] = [];
	mouse = new Vec2(0, 0);
	spiderScale = 1;

	private draggedEntity: Draggable | null = null;
	private handlers: { type: string; fn: EventListener }[] = [];

	constructor(
		public width: number,
		public height: number,
		private canvas: HTMLCanvasElement,
		private ctx: CanvasRenderingContext2D,
	) {
		this.attachMouseHandlers();
	}

	// ── Mouse interaction ──────────────────────────────────────────────────

	private attachMouseHandlers(): void {
		const on = (type: string, fn: EventListener) => {
			this.canvas.addEventListener(type, fn);
			this.handlers.push({ type, fn });
		};

		on("contextmenu", (e) => e.preventDefault());

		on("mousedown", () => {
			const nearest = this.nearestEntity();
			if (nearest) this.draggedEntity = nearest;
		});

		on("mouseup", () => {
			this.draggedEntity = null;
		});

		on("mousemove", (e) => {
			const rect = this.canvas.getBoundingClientRect();
			this.mouse.x = (e as MouseEvent).clientX - rect.left;
			this.mouse.y = (e as MouseEvent).clientY - rect.top;
		});
	}

	/** Remove all canvas event listeners (call on React unmount). */
	destroy(): void {
		for (const { type, fn } of this.handlers) {
			this.canvas.removeEventListener(type, fn);
		}
	}

	// ── Physics step ───────────────────────────────────────────────────────

	frame(steps: number): void {
		// Verlet integration — velocity is implicit: pos - lastPos
		for (const composite of this.composites) {
			for (const p of composite.particles) {
				const velocity = p.pos.sub(p.lastPos).scale(FRICTION);

				if (p.pos.y >= this.height - 1 && velocity.length2() > 1e-6) {
					const m = velocity.length();
					velocity.x /= m;
					velocity.y /= m;
					velocity.mutableScale(m * GROUND_FRICTION);
				}

				p.lastPos.mutableSet(p.pos);
				p.pos.mutableAdd(GRAVITY);
				p.pos.mutableAdd(velocity);
			}
		}

		// Mouse drag
		if (this.draggedEntity) this.draggedEntity.pos.mutableSet(this.mouse);

		// Constraint relaxation (iterated `steps` times for stability)
		const stepCoef = 1 / steps;
		for (const composite of this.composites) {
			for (let i = 0; i < steps; i++) {
				for (const c of composite.constraints) c.relax(stepCoef);
			}
		}

		// Clamp particles to canvas bounds
		for (const composite of this.composites) {
			for (const p of composite.particles) this.clampToBounds(p);
		}
	}

	private clampToBounds(p: Particle): void {
		if (p.pos.y > this.height - 1) p.pos.y = this.height - 1;
		if (p.pos.x < 0) p.pos.x = 0;
		if (p.pos.x > this.width - 1) p.pos.x = this.width - 1;
	}

	// ── Rendering ──────────────────────────────────────────────────────────

	draw(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);

		for (const composite of this.composites) {
			if (composite.drawConstraints) {
				composite.drawConstraints(this.ctx, composite);
			} else {
				for (const c of composite.constraints) c.draw(this.ctx);
			}

			if (composite.drawParticles) {
				composite.drawParticles(this.ctx, composite);
			} else {
				for (const p of composite.particles) p.draw(this.ctx);
			}
		}

		// Hover highlight
		const highlighted = this.draggedEntity ?? this.nearestEntity();
		if (highlighted) {
			this.ctx.beginPath();
			this.ctx.arc(
				highlighted.pos.x,
				highlighted.pos.y,
				8 * this.spiderScale,
				0,
				2 * Math.PI,
			);
			this.ctx.strokeStyle = "#4f545c";
			this.ctx.stroke();
		}
	}

	// ── Entity picking ─────────────────────────────────────────────────────

	nearestEntity(): Draggable | null {
		let nearest: Particle | null = null;
		let nearestD2 = 0;
		let nearestConstraints: Constraint[] | null = null;
		const selectionRadius = BASE_SELECTION_RADIUS * this.spiderScale;

		for (const composite of this.composites) {
			for (const p of composite.particles) {
				const d2 = p.pos.dist2(this.mouse);
				if (
					d2 <= selectionRadius ** 2 &&
					(nearest === null || d2 < nearestD2)
				) {
					nearest = p;
					nearestD2 = d2;
					nearestConstraints = composite.constraints;
				}
			}
		}

		// Prefer the PinConstraint if the nearest particle is pinned
		if (nearest && nearestConstraints) {
			for (const c of nearestConstraints) {
				if (c instanceof PinConstraint && c.a === nearest) return c;
			}
		}
		return nearest;
	}

	// ── Spiderweb builder ──────────────────────────────────────────────────

	buildSpiderweb(
		origin: Vec2,
		radius: number,
		segments: number,
		depth: number,
	): Composite {
		const STIFFNESS = 0.6;
		const TENSION = 0.3; // shrinks rest distances → taut web
		const stride = (2 * Math.PI) / segments;
		const n = segments * depth;
		const radiusStride = radius / n;

		const composite = new Composite();

		// Spiral particle layout with organic jitter
		for (let i = 0; i < n; i++) {
			const theta =
				i * stride +
				Math.cos(i * 0.4) * 0.05 +
				Math.cos(i * 0.05) * 0.2;
			const r = radius - radiusStride * i + Math.cos(i * 0.1) * 20;
			const offy = Math.cos(theta * 2.1) * (radius / depth) * 0.2;
			composite.particles.push(
				new Particle(
					new Vec2(
						origin.x + Math.cos(theta) * r,
						origin.y + Math.sin(theta) * r + offy,
					),
				),
			);
		}

		// Pin every 4th anchor point of the outermost ring
		for (let i = 0; i < segments; i += 4) composite.pin(i);

		// Neighbor links + radial (ring-spanning) links
		for (let i = 0; i < n - 1; i++) {
			composite.constraints.push(
				new DistanceConstraint(
					composite.particles[i],
					composite.particles[i + 1],
					STIFFNESS,
				),
			);
			const radialTarget =
				i + segments < n - 1
					? composite.particles[i + segments]
					: composite.particles[n - 1];
			composite.constraints.push(
				new DistanceConstraint(
					composite.particles[i],
					radialTarget,
					STIFFNESS,
				),
			);
		}

		// Close first ring
		composite.constraints.push(
			new DistanceConstraint(
				composite.particles[0],
				composite.particles[segments - 1],
				STIFFNESS,
			),
		);

		// Apply tension (shrink rest distances so the web is taut)
		for (const c of composite.constraints) {
			if (c instanceof DistanceConstraint) c.distance *= TENSION;
		}

		this.composites.push(composite);
		return composite;
	}

	// ── Spider builder ─────────────────────────────────────────────────────

	buildSpider(origin: Vec2, scale = 1): SpiderComposite {
		const spider = new SpiderComposite();
		this.spiderScale = scale;
		const s = scale;

		// Body
		spider.thorax = new Particle(origin);
		spider.head = new Particle(origin.add(new Vec2(0, -5 * s)));
		spider.abdomen = new Particle(origin.add(new Vec2(0, 10 * s)));

		spider.particles.push(spider.thorax, spider.head, spider.abdomen);
		spider.constraints.push(
			new DistanceConstraint(spider.head, spider.thorax, 1),
			new DistanceConstraint(spider.abdomen, spider.thorax, 1),
			new AngleConstraint(
				spider.abdomen,
				spider.thorax,
				spider.head,
				0.4,
			),
		);

		// Leg segment sets (for rendering thickness per segment)
		const legSegmentSets: LegSegmentSets = {
			seg1: new Set(),
			seg2: new Set(),
			seg3: new Set(),
		};

		// Build 4 pairs of legs (8 legs total — right + left per pair)
		for (let i = 0; i < 4; i++) {
			const lateral = (i - 1.5) * 3 * s;

			// ── Leg root joints (attached to thorax) ──────────────────────────
			const rootR = new Particle(
				spider.thorax.pos.add(new Vec2(3 * s, lateral)),
			);
			const rootL = new Particle(
				spider.thorax.pos.add(new Vec2(-3 * s, lateral)),
			);
			spider.particles.push(rootR, rootL);

			const rootToThoraxR = new DistanceConstraint(
				rootR,
				spider.thorax,
				0.99,
			);
			const rootToThoraxL = new DistanceConstraint(
				rootL,
				spider.thorax,
				0.99,
			);
			spider.constraints.push(rootToThoraxR, rootToThoraxL);
			legSegmentSets.seg1.add(rootToThoraxR);
			legSegmentSets.seg1.add(rootToThoraxL);

			// Length modifier per leg pair (middle legs are shorter)
			const lenCoef = i === 1 || i === 2 ? 0.7 : i === 3 ? 0.9 : 1;

			// ── Knee joints ────────────────────────────────────────────────────
			const kneeR = new Particle(
				rootR.pos.add(
					new Vec2(20 * s, (i - 1.5) * 30 * s)
						.normal()
						.mutableScale(20 * s * lenCoef),
				),
			);
			const kneeL = new Particle(
				rootL.pos.add(
					new Vec2(-20 * s, (i - 1.5) * 30 * s)
						.normal()
						.mutableScale(20 * s * lenCoef),
				),
			);
			spider.particles.push(kneeR, kneeL);

			const rootToKneeR = new DistanceConstraint(rootR, kneeR, 0.99);
			const rootToKneeL = new DistanceConstraint(rootL, kneeL, 0.99);
			spider.constraints.push(rootToKneeR, rootToKneeL);
			legSegmentSets.seg2.add(rootToKneeR);
			legSegmentSets.seg2.add(rootToKneeL);

			// ── Ankle joints ───────────────────────────────────────────────────
			const ankleR = new Particle(
				kneeR.pos.add(
					new Vec2(20 * s, (i - 1.5) * 50 * s)
						.normal()
						.mutableScale(20 * s * lenCoef),
				),
			);
			const ankleL = new Particle(
				kneeL.pos.add(
					new Vec2(-20 * s, (i - 1.5) * 50 * s)
						.normal()
						.mutableScale(20 * s * lenCoef),
				),
			);
			spider.particles.push(ankleR, ankleL);

			const kneeToAnkleR = new DistanceConstraint(kneeR, ankleR, 0.99);
			const kneeToAnkleL = new DistanceConstraint(kneeL, ankleL, 0.99);
			spider.constraints.push(kneeToAnkleR, kneeToAnkleL);
			legSegmentSets.seg3.add(kneeToAnkleR);
			legSegmentSets.seg3.add(kneeToAnkleL);

			// ── Feet (tip of each leg, anchors to web) ─────────────────────────
			const footR = new Particle(
				ankleR.pos.add(
					new Vec2(20 * s, (i - 1.5) * 100 * s)
						.normal()
						.mutableScale(12 * s * lenCoef),
				),
			);
			const footL = new Particle(
				ankleL.pos.add(
					new Vec2(-20 * s, (i - 1.5) * 100 * s)
						.normal()
						.mutableScale(12 * s * lenCoef),
				),
			);
			spider.particles.push(footR, footL);
			spider.legs.push(footR, footL);

			spider.constraints.push(
				new DistanceConstraint(ankleR, footR, 0.99),
				new DistanceConstraint(ankleL, footL, 0.99),
			);

			// ── Joint angle constraints (stiffness increases toward body) ──────
			spider.constraints.push(
				new AngleConstraint(kneeR, ankleR, footR, 0.9), // ankle joint R
				new AngleConstraint(kneeL, ankleL, footL, 0.9), // ankle joint L
				new AngleConstraint(rootR, kneeR, ankleR, 0.4), // knee  joint R
				new AngleConstraint(rootL, kneeL, ankleL, 0.4), // knee  joint L
				new AngleConstraint(spider.thorax, rootR, kneeR, 1), // hip joint R
				new AngleConstraint(spider.thorax, rootL, kneeL, 1), // hip joint L
				new AngleConstraint(spider.head, spider.thorax, rootR, 1), // body → hip R
				new AngleConstraint(spider.head, spider.thorax, rootL, 1), // body → hip L
			);
		}

		spider.legSegmentSets = legSegmentSets;
		this.composites.push(spider);
		return spider;
	}

	// ── Crawl — move one foot to a new web node ────────────────────────────

	crawl(legIndex: number): void {
		const STEP_RADIUS_MIN = 35 * this.spiderScale;
		const STEP_RADIUS_MAX = 100 * this.spiderScale;

		const web = this.composites[0] as Composite;
		const spider = this.composites[1] as SpiderComposite;

		// Determine which quadrant the leg should step into
		const bodyAngle = spider.thorax.pos.angle2(
			spider.thorax.pos.add(new Vec2(1, 0)),
			spider.head.pos,
		);
		const forward = new Vec2(Math.cos(bodyAngle), Math.sin(bodyAngle));
		const lateral = new Vec2(
			Math.cos(bodyAngle + Math.PI / 2),
			Math.sin(bodyAngle + Math.PI / 2),
		);

		const sideSign = legIndex < 4 ? 1 : -1;
		const lateralMin = legIndex % 2 === 0 ? 1 : 0; // 0 = ignore lateral check

		// Collect reachable, unoccupied web nodes in the correct quadrant
		const candidates = web.particles.filter((wp) => {
			const rel = wp.pos.sub(spider.thorax.pos);
			if (rel.dot(forward) * sideSign < 0) return false;
			if (rel.dot(lateral) * lateralMin < 0) return false;
			const d2 = wp.pos.dist2(spider.thorax.pos);
			if (d2 < STEP_RADIUS_MIN ** 2 || d2 > STEP_RADIUS_MAX ** 2)
				return false;

			// Exclude nodes already occupied by this leg
			return !spider.constraints.some(
				(c) =>
					c instanceof DistanceConstraint &&
					c.a === spider.legs[legIndex] &&
					c.b === wp,
			);
		});

		// Detach current foot tether
		const oldIdx = spider.constraints.findIndex(
			(c) =>
				c instanceof DistanceConstraint &&
				c.a === spider.legs[legIndex],
		);
		if (oldIdx !== -1) spider.constraints.splice(oldIdx, 1);

		// Attach to a random candidate node (distance = 0 → pulls foot to node)
		if (candidates.length > 0) {
			const target =
				candidates[Math.floor(Math.random() * candidates.length)];
			spider.constraints.push(
				new DistanceConstraint(spider.legs[legIndex], target, 1, 0),
			);
		}
	}
}
