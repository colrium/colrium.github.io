'use client';

import Devices from '@/components/ui/Devices';
import React from 'react';

const skillsData = {
	tag: 'Skills & Stack',
	headline: 'Broad Stack, Deep Expertise',
	intro:
		'Built on strong computer science fundamentals extended through years of practical delivery across web, mobile, cloud, and AI.',
	categories: [
		{
			id: 'languages',
			label: 'Languages',
			items: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Kotlin', 'Swift', 'Java'],
		},
		{
			id: 'frontend',
			label: 'Frontend & Mobile',
			items: ['React', 'React Native', 'Next.js', 'HTML/CSS', 'Component Frameworks'],
		},
		{
			id: 'backend',
			label: 'Backend & APIs',
			items: ['Node.js', 'REST API Design', 'GraphQL', 'Multiple Database Paradigms', 'Security Auditing'],
		},
		{
			id: 'devops',
			label: 'DevOps & Infra',
			items: ['Docker', 'CI/CD Pipelines', 'Cloud Platforms', 'Build Automation'],
		},
		{
			id: 'ai',
			label: 'AI & Automation',
			items: ['ML Pipeline Integration', 'Embeddings & Vector Search', 'AI-Assisted Prototyping', 'Automated Documentation & Testing'],
		},
		{
			id: 'practices',
			label: 'Practices',
			items: ['Test Automation', 'Code Review', 'Agile Delivery', 'Technical Documentation', 'Mentorship'],
		},
	],
};

function CategoryCard({ label, items }: { label: string; items: string[] }) {
	return (
		<div className="rounded-2xl border border-accent/10 bg-surface-container p-6 shadow-sm">
			<h4 className="text-lg font-semibold text-primary-container mb-3">{label}</h4>
			<ul className="flex flex-col gap-2">
				{items.map((it) => (
					<li key={it} className="text-sm text-on-surface-variant">
						• {it}
					</li>
				))}
			</ul>
		</div>
	);
}

export default function Skills() {
	return (
		<section
			className="p-3 py-16 md:py-32 w-full min-h-[80vh] flex flex-col items-center justify-center"
			aria-labelledby="skills-heading"
		>
			<div className="mx-auto w-full max-w-7xl px-6 md:px-10 flex flex-col items-center gap-16 bg-surface rounded-3xl p-10 md:p-16">
				<div className="w-full">
					<span className="inline-flex items-center rounded-full border border-accent/20 px-4 py-2 text-sm font-semibold text-on-surface">
						{skillsData.tag}
					</span>
					<h2
						id="skills-heading"
						className="my-16 text-3xl sm:text-4xl md:text-5xl font-semibold text-on-surface tracking-tight text-center"
					>
						{skillsData.headline}
					</h2>
                    <div className="w-full my-16">
						<Devices className="text-[56px] md:text-[64px] xl:text-[72px]" />
					</div>
					<p className="mt-6 text-base mx-auto w-2/3 leading-8 text-on-surface/75 text-center">
						{skillsData.intro}
					</p>
				</div>
                
				<div className="mt-12 grid gap-6 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
					{skillsData.categories.map((cat) => (
						<CategoryCard
							key={cat.id}
							label={cat.label}
							items={cat.items}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

