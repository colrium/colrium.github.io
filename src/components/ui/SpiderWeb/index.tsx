"use client";

import { useEffect, useRef } from "react";
import { Vec2 } from "./Vec2";
import { Simulation } from "./Simulation";
import { SpiderComposite } from "./Composite";
import { DistanceConstraint } from "./Constraint";

// ── Color prop types ───────────────────────────────────────────────────────

export interface SpiderColors {
	/** Head and thorax circles. Default: '#029bc9' */
	head?: string;
	/** Abdomen circle. Default: '#029bc9' */
	abdomen?: string;
	/** Hip-to-knee leg segment (thickest). Default: '#029bc9' */
	legSeg1?: string;
	/** Knee-to-ankle leg segment. Default: '#029bc9' */
	legSeg2?: string;
	/** Ankle-to-foot leg segment. Default: '#029bc9' */
	legSeg3?: string;
	/** Foot tether to web (hairline). Default: '#029bc9' */
	legSeg4?: string;
}

export interface WebColors {
	/** Web strand lines. Default: '#d8dde2' */
	strands?: string;
	/** Web node dots. Default: 'rgba(120, 124, 124, 1)' */
	nodes?: string;
}

export interface SpiderWebCanvasProps {
	spider?: SpiderColors;
	web?: WebColors;
	/** Extra Tailwind / CSS classes applied to the <canvas>. */
	className?: string;
}

// ── Defaults ───────────────────────────────────────────────────────────────

const DEFAULT_SPIDER: Required<SpiderColors> = {
	head: "#029bc9",
	abdomen: "#029bc9",
	legSeg1: "#029bc9",
	legSeg2: "#029bc9",
	legSeg3: "#029bc9",
	legSeg4: "#029bc9",
};

const DEFAULT_WEB: Required<WebColors> = {
	strands: "#474747",
	nodes: "#474747",
};

// ── Component ──────────────────────────────────────────────────────────────

export default function SpiderWeb({
	spider: spiderColorsProp = {},
	web: webColorsProp = {},
	className = "w-100 h-100",
}: SpiderWebCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Merge caller overrides with defaults
	const sc: Required<SpiderColors> = {
		...DEFAULT_SPIDER,
		...spiderColorsProp,
	};
	const wc: Required<WebColors> = { ...DEFAULT_WEB, ...webColorsProp };

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		// Match canvas pixel size to its CSS layout size
		const { width, height } = canvas.getBoundingClientRect();
		canvas.width = width - 50;
		canvas.height = height - 50;

		const ctx = canvas.getContext("2d")!;
		const sim = new Simulation(canvas.width, canvas.height, canvas, ctx);

		// ── Build scene ──────────────────────────────────────────────────────

		const center = new Vec2(canvas.width / 2, canvas.height / 2);
		const webRadius = Math.min(canvas.width, canvas.height) / 2;

		const web = sim.buildSpiderweb(center, webRadius, 20, 7);
		const spider = sim.buildSpider(new Vec2(canvas.width / 2, -300));

		const { seg1, seg2, seg3 } = (spider as SpiderComposite).legSegmentSets;

		// ── Web renderer ─────────────────────────────────────────────────────

		web.drawParticles = (ctx, composite) => {
			ctx.fillStyle = wc.nodes;
			for (const p of composite.particles) {
				ctx.beginPath();
				ctx.arc(p.pos.x, p.pos.y, 1.3, 0, 2 * Math.PI);
				ctx.fill();
			}
		};

		web.drawConstraints = (ctx, composite) => {
			ctx.strokeStyle = wc.strands;
			ctx.lineWidth = 1;
			for (const c of composite.constraints) {
				if (c instanceof DistanceConstraint) {
					ctx.beginPath();
					ctx.moveTo(c.a.pos.x, c.a.pos.y);
					ctx.lineTo(c.b.pos.x, c.b.pos.y);
					ctx.stroke();
				}
			}
		};

		// ── Spider renderer ───────────────────────────────────────────────────

		(spider as SpiderComposite).drawConstraints = (ctx, composite) => {
			const sp = spider as SpiderComposite;

			// Body parts — each can be a different color
			for (const { pos, r, color } of [
				{ pos: sp.head.pos, r: 4, color: sc.head },
				{ pos: sp.thorax.pos, r: 4, color: sc.head },
				{ pos: sp.abdomen.pos, r: 8, color: sc.abdomen },
			]) {
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
				ctx.fill();
			}

			// Leg segments — color and thickness taper from hip to foot
			for (let i = 3; i < composite.constraints.length; i++) {
				const c = composite.constraints[i];
				if (!(c instanceof DistanceConstraint)) continue;

				let color: string;
				let lineWidth: number;

				if (seg1.has(c)) {
					color = sc.legSeg1;
					lineWidth = 3;
				} else if (seg2.has(c)) {
					color = sc.legSeg2;
					lineWidth = 2;
				} else if (seg3.has(c)) {
					color = sc.legSeg3;
					lineWidth = 1.5;
				} else {
					color = sc.legSeg4;
					lineWidth = 1;
				}

				ctx.strokeStyle = color;
				ctx.lineWidth = lineWidth;
				ctx.beginPath();
				ctx.moveTo(c.a.pos.x, c.a.pos.y);
				ctx.lineTo(c.b.pos.x, c.b.pos.y);
				ctx.stroke();
			}
		};

		(spider as SpiderComposite).drawParticles = () => {};

		// ── Animation loop ────────────────────────────────────────────────────

		let legIndex = 0;
		let rafId: number;

		const loop = () => {
			if (Math.random() < 0.25) sim.crawl((legIndex++ * 3) % 8);
			sim.frame(16);
			sim.draw();
			rafId = requestAnimationFrame(loop);
		};

		rafId = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(rafId);
			sim.destroy();
		};
		// Re-initialise the scene whenever colors change
	}, [
		sc.head,
		sc.abdomen,
		sc.legSeg1,
		sc.legSeg2,
		sc.legSeg3,
		sc.legSeg4,
		wc.strands,
		wc.nodes,
	]);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{ display: "block" }}
		/>
	);
}
