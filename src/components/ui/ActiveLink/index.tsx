"use client";

import usePathnameWithHash from "@/lib/hooks/usePathnameWithHash";
import Link, { LinkProps } from "next/link";
import { useRouter  } from "next/navigation";
import { AnchorHTMLAttributes, HTMLAttributeAnchorTarget, useEffect, useState } from "react";

interface ActiveLinkProps extends Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof LinkProps<unknown>
> {
	className?: string;
	activeClassName?: string;
    inactiveClassName?: string;
	children: React.ReactNode;
	// Use the React defined anchor target type to match Link props
	target?: HTMLAttributeAnchorTarget;
    rel?: string;
    href: string | URL;
    observe?: boolean
}

export default function ActiveLink({ href, children, className,  activeClassName, inactiveClassName, observe=false, ...rest  }: ActiveLinkProps) {
    const { pathname, hash } = usePathnameWithHash();
    const router = useRouter();
	const [activeHash, setActiveHash] = useState("");
    const hrefStr = typeof href === "string" ? href : href as unknown as  string || "";

	// Handle active hash sections using IntersectionObserver
    useEffect(() => {
        
		// Only track hashes if the link actually contains a hash
		if (!observe || !hrefStr.includes("#")) return;
        
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        router.replace(`${pathname}#${entry.target.id}`, {
							scroll: false,
						});
						// setActiveHash(`#${entry.target.id}`);
                    }
                    else if (hash === `#${entry.target.id}`) {
                        router.replace(`${pathname}`, {
							scroll: false,
						});
                    }
				});
			},
			{ rootMargin: "-20% 0px -60% 0px" }, // Triggers when section occupies the sweet spot of the viewport
		);

		// Observe all elements that have an ID matching our navbar links
		const targetId = hrefStr.split("#")[1];
		const element = document.getElementById(targetId);
		if (element) observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	}, [hrefStr, observe, pathname, hash]);

	// Determine if the link is active based on path OR hash
    const isPageActive = pathname === hrefStr.split("#")[0];
    const isHashActive = hash === hrefStr.substring(hrefStr.indexOf("#"));
	// const isHashActive = hash? isLocationHashActive : hrefStr.includes("#") &&  activeHash === hrefStr.substring(hrefStr.indexOf("#"));
    const isActive = hrefStr.includes("#") ? isPageActive && isHashActive : isPageActive;
    
	return (
		<Link
			href={href}
			className={`transition-all duration-200 ${className || ""} ${
				isActive
					? `${activeClassName || ""}`
					: `${inactiveClassName || ""}`
			}`}
			{...rest}
		>
			{children}
		</Link>
	);
}
