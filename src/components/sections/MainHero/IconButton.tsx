import Link from "next/link";
import React from "react";

interface IconButtonProps {
	icon: string;
	label?: string;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "accent";
	className?: string;
	href?: string;
}

export function IconButton({
	icon,
	label,
	onClick,
	variant = "primary",
	className = "",
	href,
}: IconButtonProps) {
	const baseClasses =
		"flex items-center rounded-full gap-2 transition-all active:scale-95";

	const variantClasses = {
		primary:
			"bg-primary text-on-surface pl-2 pr-4 md:pr-6 py-1.5 md:py-2 hover:bg-primary-dark",
		secondary:
			"bg-secondary text-on-surface pl-1.5 pr-5 py-1.5 hover:bg-secondary-dark",
        accent:
			"bg-accent text-on-surface pl-1.5 pr-5 py-1.5 hover:bg-accent-dark",
	};

	return href? (
		<Link
			href={href}
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
		>
			<div className="bg-surface/20 p-2 md:p-1 rounded-full flex items-center justify-center">
				<span className="material-symbols-outlined text-xs">
					{icon}
				</span>
			</div>
			{label && <span className="text-sm font-medium">{label}</span>}
		</Link>
	) : (
		<button
			onClick={onClick}
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
		>
			<div className="bg-surface/20 p-2 md:p-1 rounded-full flex items-center justify-center">
				<span className="material-symbols-outlined text-sm md:text-sm">
					{icon}
				</span>
			</div>
			{label && <span className="text-sm font-medium">{label}</span>}
		</button>
	);
}
