"use client";

import React from "react";

// ─── types ───────────────────────────────────────────────────────────────────

interface FaceProps {
	variant: "nine" | "four";
}

// ─── sub-components ──────────────────────────────────────────────────────────

const NineDotFace: React.FC = () => (
	<>
		<div className="dot p1" />
		<div className="dot p2" />
		<div className="dot p3" />
		<div className="dot p4" />
		<div className="dot p5" />
		<div className="dot p6" />
		<div className="dot p7" />
		<div className="dot p8" />
		<div className="dot p9" />
	</>
);

const FourDotFace: React.FC = () => (
	<>
		<div className="dot p10" />
		<div className="dot p11" />
		<div className="dot p12" />
		<div className="dot p13" />
	</>
);

const Face: React.FC<FaceProps & { index: number }> = ({ variant, index }) => (
	<div className={`faces f${index}`}>
		{variant === "nine" ? <NineDotFace /> : <FourDotFace />}
	</div>
);

// ─── face config ─────────────────────────────────────────────────────────────

const FACES: Array<{ variant: "nine" | "four" }> = [
	{ variant: "nine" },
	{ variant: "four" },
	{ variant: "nine" },
	{ variant: "four" },
	{ variant: "nine" },
	{ variant: "four" },
	{ variant: "nine" },
	{ variant: "four" },
	{ variant: "nine" },
	{ variant: "four" },
	{ variant: "nine" },
];

// ─── main component ──────────────────────────────────────────────────────────
interface DotCubeProps {
    className?: string;
}
const DotCube: React.FC<DotCubeProps> = ({ className }) => {
	return (
		<div className={`dot-cube ${className || ""}`}>
			<div className="cube">
				{FACES.map((face, i) => (
					<Face key={i} index={i + 1} variant={face.variant} />
				))}
			</div>

			{/* <div className="cube-text">
					<div className="l1">project-</div>
					<div className="l2">-quantum</div>
				</div> */}
		</div>
	);
};

export default DotCube;
