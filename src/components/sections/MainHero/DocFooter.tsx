import Image from "next/image";

interface DocFooterProps {
	onDocumentationClick?: () => void;
	label?: string;
	description?: string;
	className?: string;
}

export function DocFooter({
	onDocumentationClick,
	label = "Socials",
    description = "@colrium",
    className = ""
}: DocFooterProps) {
	return (
		<div className={`absolute bottom-0 right-0 p-4 pt-6 pl-10 sm:p-6 sm:pt-8 sm:pl-12 md:p-8 md:pt-10 md:pl-16 md:bg-surface-tint rounded-tl-2xl sm:rounded-tl-3xl md:rounded-tl-4xl flex items-center gap-4 sm:gap-6 md:gap-8 ${className}`}>
			{/* Corner Mask Top */}
			<svg
				className="absolute -top-12 right-0 h-12 w-12 hidden md:block"
				fill="none"
				viewBox="0 0 56 56"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
                    d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z"
                    
					fill="var(--color-surface-tint)"
				/>
			</svg>

			{/* Corner Mask Left */}
			<svg
				className="absolute bottom-0 -left-12 h-12 w-12 hidden md:block"
				fill="none"
				viewBox="0 0 56 56"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z"
					fill="var(--color-surface-tint)"
				/>
			</svg>

			<div
				className="flex items-center gap-6  cursor-pointer text-foreground hover:text-on-surface transition-colors"
				onClick={onDocumentationClick}
			>
				<div className="hidden md:flex md:flex-col">
					<span className="text-lg md:text-xl  transition-colors font-medium">
						{label}
					</span>
					<div className="flex items-center gap-1 group transition-colors">
						<span className="text-sm font-medium">
							{description}
						</span>
						
					</div>
				</div>
				<Image  className="w-12 h-12 bg-surface rounded-full shadow-sm" src="/media/dp.png" alt="Avatar" width={48} height={48} />
			</div>
		</div>
	);
}
