/** @format */

import React, { useId, useMemo } from 'react';

const CircularParticles = () => {
    const id = useId();
    const particles = useMemo(() => Array(360).fill(0).map((v, i) => (<div className="particle" style={{'--index': i+1}} key={`${id}-particle-${i}`}></div>)), []);
	return (
		<div
			// className="center"
			style={{"--total": particles.length}}
		>
			{particles}
		</div>
	);
};

export default CircularParticles;
