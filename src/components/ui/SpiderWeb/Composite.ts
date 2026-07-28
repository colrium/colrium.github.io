import { Particle } from "./Particle";
import { Constraint, PinConstraint, DistanceConstraint } from "./Constraint";
import { Vec2 } from "./Vec2";

export class Composite {
	particles: Particle[] = [];
	constraints: Constraint[] = [];

	/** Override to replace the default particle renderer. */
	drawParticles?: (
		ctx: CanvasRenderingContext2D,
		composite: Composite,
	) => void;
	/** Override to replace the default constraint renderer. */
	drawConstraints?: (
		ctx: CanvasRenderingContext2D,
		composite: Composite,
	) => void;

	/** Pin particle at `index` to its current position (or an explicit `pos`). */
	pin(index: number, pos?: Vec2): PinConstraint {
		const target = pos ?? this.particles[index].pos;
		const pc = new PinConstraint(this.particles[index], target);
		this.constraints.push(pc);
		return pc;
	}
}

// ── Spider-specific composite ──────────────────────────────────────────────
// Returned by Simulation.buildSpider(); carries semantic body-part references
// and pre-classified leg-segment constraint sets for clean rendering.

export interface LegSegmentSets {
	seg1: Set<DistanceConstraint>; // hip → knee    (thickest)
	seg2: Set<DistanceConstraint>; // knee → shin
	seg3: Set<DistanceConstraint>; // shin → ankle  (thinnest body segment)
	// seg4 = foot tether to web - rendered as hairlines, not stored separately
}

export class SpiderComposite extends Composite {
	legs: Particle[] = [];
	thorax!: Particle;
	head!: Particle;
	abdomen!: Particle;
	legSegmentSets!: LegSegmentSets;
}
