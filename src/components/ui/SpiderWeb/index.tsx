"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Vec2 } from "./Vec2";
import { Simulation } from "./Simulation";
import { SpiderComposite } from "./Composite";
import { DistanceConstraint } from "./Constraint";

// ── Color prop types ───────────────────────────────────────────────────────

export interface SpiderColors {
	/** Head circle. Default: '#0289ab' */
	head?: string;
	/** Abdomen circle. Default: '#015878' */
	abdomen?: string;
	/** Hip-to-knee leg segment (thickest). Default: '#029bc9' */
	legSeg1?: string;
	/** Knee-to-ankle leg segment. Default: '#03aeda' */
	legSeg2?: string;
	/** Ankle-to-foot leg segment. Default: '#5acde6' */
	legSeg3?: string;
	/** Foot tether to web (hairline). Default: '#9de3f2' */
	legSeg4?: string;
}

export interface WebColors {
	/** Web strand lines. Default: '#d8dde2' */
	strands?: string;
	/** Web node dots. Default: 'rgba(120, 124, 124, 1)' */
	nodes?: string;
}

export type SpiderWebBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type SpiderWebSizes = Partial<Record<SpiderWebBreakpoint, number>>;

export interface SpiderWebCanvasProps {
	spider?: SpiderColors;
	web?: WebColors;
	/**
	 * Optional square canvas sizes in CSS pixels. When omitted, the component
	 * follows the rendered size from className/CSS.
	 */
	sizes?: SpiderWebSizes;
	/** Called when the spider crosses on/off the visible web radius. */
	onSpiderOffWeb?: (isOffWeb: boolean) => void;
	/** Extra Tailwind / CSS classes applied to the <canvas>. */
	className?: string;
}

// ── Defaults ───────────────────────────────────────────────────────────────

const DEFAULT_SPIDER: Required<SpiderColors> = {
	head: "#0289ab",
	abdomen: "#015878",
	legSeg1: "#029bc9",
	legSeg2: "#03aeda",
	legSeg3: "#5acde6",
	legSeg4: "#9de3f2",
};

const DEFAULT_WEB: Required<WebColors> = {
	strands: "rgba(120, 124, 124, 0.5)",
	nodes: "#474747",
};

const BREAKPOINTS: Record<SpiderWebBreakpoint, number> = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
};

const BREAKPOINT_ORDER: SpiderWebBreakpoint[] = ["xs", "sm", "md", "lg", "xl"];

function resolveResponsiveSize(
	sizes: SpiderWebSizes,
	viewportWidth: number,
): number {
	let resolved = sizes.xs ?? sizes.sm ?? sizes.md ?? sizes.lg ?? sizes.xl ?? 300;

	for (const breakpoint of BREAKPOINT_ORDER) {
		const value = sizes[breakpoint];
		if (value !== undefined && viewportWidth >= BREAKPOINTS[breakpoint]) {
			resolved = value;
		}
	}

	return resolved;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function SpiderWeb({
	spider: spiderColorsProp = {},
	web: webColorsProp = {},
	sizes,
	onSpiderOffWeb,
	className = "w-100 h-100",
}: SpiderWebCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const offWebRef = useRef(false);
	const lastLegMovementRef = useRef(-Infinity);
	const prevLegPositionsRef = useRef<Vec2[]>([]);
	const onSpiderOffWebRef = useRef(onSpiderOffWeb);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		onSpiderOffWebRef.current = onSpiderOffWeb;
	}, [onSpiderOffWeb]);

	// Merge caller overrides with defaults.
	const sc: Required<SpiderColors> = useMemo(
		() => ({
			...DEFAULT_SPIDER,
			...spiderColorsProp,
		}),
		[spiderColorsProp],
	);
	const wc: Required<WebColors> = useMemo(
		() => ({ ...DEFAULT_WEB, ...webColorsProp }),
		[webColorsProp],
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const updateSize = () => {
			if (sizes) {
				const size = resolveResponsiveSize(sizes, window.innerWidth);
				setCanvasSize({ width: size, height: size });
				return;
			}

			const { width, height } = canvas.getBoundingClientRect();
			setCanvasSize({
				width: Math.max(0, Math.round(width)),
				height: Math.max(0, Math.round(height)),
			});
		};

		updateSize();

		// ResizeObserver keeps Tailwind/CSS-driven sizes in sync with the physics.
		const observer = new ResizeObserver(updateSize);
		observer.observe(canvas);
		window.addEventListener("resize", updateSize);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updateSize);
		};
	}, [sizes]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		if (canvasSize.width <= 0 || canvasSize.height <= 0) return;

		// Match canvas pixels to the responsive CSS size used by the simulation.
		canvas.width = canvasSize.width;
		canvas.height = canvasSize.height;

		const ctx = canvas.getContext("2d")!;
		const sim = new Simulation(canvas.width, canvas.height, canvas, ctx);

		// ── Build scene ──────────────────────────────────────────────────────

		const center = new Vec2(canvas.width / 2, canvas.height / 2);
		const webRadius = Math.max(
			0,
			Math.min(canvas.width, canvas.height) / 2 - 20,
		);
		const spiderScale = Math.max(0.55, webRadius / 200);

		const web = sim.buildSpiderweb(center, webRadius, 20, 7);
		const spider = sim.buildSpider(
			new Vec2(canvas.width / 2, -webRadius * 1.5),
			spiderScale,
		);
		prevLegPositionsRef.current = (
			spider as SpiderComposite
		).legs.map((l) => new Vec2(l.pos.x, l.pos.y));
		lastLegMovementRef.current = Number.NEGATIVE_INFINITY;
		offWebRef.current = true;

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
			const body = {
				head: 4 * spiderScale,
				thorax: 4 * spiderScale,
				abdomen: 8 * spiderScale,
			};

			// Body shades separate the parts without drifting from the theme hue.
			for (const { pos, r, color } of [
				{ pos: sp.head.pos, r: body.head, color: sc.head },
				{ pos: sp.thorax.pos, r: body.thorax, color: sc.legSeg1 },
				{ pos: sp.abdomen.pos, r: body.abdomen, color: sc.abdomen },
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
					lineWidth = 3 * spiderScale;
				} else if (seg2.has(c)) {
					color = sc.legSeg2;
					lineWidth = 2 * spiderScale;
				} else if (seg3.has(c)) {
					color = sc.legSeg3;
					lineWidth = 1.5 * spiderScale;
				} else {
					color = sc.legSeg4;
					lineWidth = 1 * spiderScale;
				}

				ctx.strokeStyle = color;
				ctx.lineWidth = Math.max(0.75, lineWidth);
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

			const spiderComposite = spider as SpiderComposite;
			const legs = spiderComposite.legs;
			const prev = prevLegPositionsRef.current;
			let moved = false;
			if (prev.length === legs.length) {
				for (let i = 0; i < legs.length; i++) {
					if (legs[i].pos.dist2(prev[i]) > 4) {
						moved = true;
						break;
					}
				}
			}
			if (moved) {
				prevLegPositionsRef.current = legs.map(
					(l) => new Vec2(l.pos.x, l.pos.y),
				);
				lastLegMovementRef.current = performance.now();
			}
			const isOffWeb =
				performance.now() - lastLegMovementRef.current >= 3000;
			if (offWebRef.current !== isOffWeb) {
				offWebRef.current = isOffWeb;
				onSpiderOffWebRef.current?.(isOffWeb);
			}

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
		canvasSize.width,
		canvasSize.height,
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
			style={{
				display: "block",
				...(sizes
					? { width: canvasSize.width, height: canvasSize.height }
					: {}),
			}}
		/>
	);
}
