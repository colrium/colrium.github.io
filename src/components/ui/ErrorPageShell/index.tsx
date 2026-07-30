import Link from "next/link";
import type { ReactNode } from "react";

interface ErrorPageShellProps {
	status: string;
	eyebrow: string;
	title: string;
	description: string;
	primaryAction?: ReactNode;
	secondaryHref?: string;
	secondaryLabel?: string;
}

export default function ErrorPageShell({
	status,
	eyebrow,
	title,
	description,
	primaryAction,
	secondaryHref = "/",
	secondaryLabel = "Back home",
}: ErrorPageShellProps) {
	return (
		<main className="relative flex min-h-lvh w-full flex-1 items-center overflow-hidden bg-surface px-6 py-32 text-on-surface sm:px-10">
			<div
				className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[34vw] font-black leading-none text-accent/[0.035] sm:text-[26vw] lg:text-[22rem]"
				aria-hidden="true"
			>
				{status}
			</div>

			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
			<div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full border border-accent/10" />
			<div className="pointer-events-none absolute left-6 top-28 h-24 w-24 rounded-full border border-primary/15 sm:left-12" />

			<section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
				<div className="max-w-3xl">
					<p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">
						{eyebrow}
					</p>
					<h1 className="text-5xl font-black leading-[0.92] tracking-normal text-on-surface sm:text-7xl lg:text-8xl">
						{title}
					</h1>
					<p className="mt-7 max-w-xl text-base leading-8 text-on-surface-mute sm:text-lg">
						{description}
					</p>

					<div className="mt-10 flex flex-col gap-3 sm:flex-row">
						{primaryAction}
						<Link
							href={secondaryHref}
							className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-on-surface/10 px-5 text-sm font-semibold text-on-surface/80 transition hover:border-primary/40 hover:text-primary"
						>
							<span className="mdi mdi-home text-base" />
							{secondaryLabel}
						</Link>
					</div>
				</div>

				<div className="hidden aspect-square rounded-[2rem] border border-accent/10 bg-accent/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-md lg:block">
					<div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-on-surface/10 bg-surface-tint/60 p-6">
						<div className="flex items-center justify-between">
							<div className="flex gap-2">
								<span className="h-2.5 w-2.5 rounded-full bg-primary" />
								<span className="h-2.5 w-2.5 rounded-full bg-secondary" />
								<span className="h-2.5 w-2.5 rounded-full bg-accent" />
							</div>
							<span className="text-xs font-semibold uppercase tracking-[0.22em] text-on-surface-mute">
								{status}
							</span>
						</div>

						<div>
							<div className="mb-5 h-2 w-24 rounded-full bg-primary/60" />
							<div className="mb-3 h-2 w-full rounded-full bg-on-surface/12" />
							<div className="mb-3 h-2 w-4/5 rounded-full bg-on-surface/12" />
							<div className="h-2 w-2/3 rounded-full bg-on-surface/12" />
						</div>

						<div className="grid grid-cols-3 gap-3">
							<span className="h-16 rounded-2xl border border-primary/20 bg-primary/10" />
							<span className="h-16 rounded-2xl border border-secondary/20 bg-secondary/10" />
							<span className="h-16 rounded-2xl border border-accent/20 bg-accent/10" />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
