"use client";

import {
	useEffect,
	useRef,
    useState,
	ElementType,
	ComponentPropsWithoutRef,
} from "react";
import TextShuffler from "@/components/ui/ShuffleText/TextShuffler";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AnyTag = ElementType;

/**
 * Infer the HTML/component props for the chosen `component`, then merge in
 * the component-specific props, omitting `children` (we control rendering).
 */
type ShuffleTextProps<T extends AnyTag = "span"> = {
	/** Text to shuffle. Prefer this over children for predictable behaviour. */
	text?: string;
	/** Children can also supply the text; must resolve to a plain string. */
	children?: string;
	/** The wrapper element or component. Defaults to "span". */
	component?: T;
	/** Random character pool (default: uppercase alpha + digits). */
	sourceRandomCharacter?: string;
	/** Placeholder character shown before a slot resolves (default: "-"). */
	emptyCharacter?: string;
	/** Animation duration in ms (default: 600). */
	duration?: number;
	/** Play on mount (default: true). */
	autoPlay?: boolean;
	/**
	 * How much of the element must be visible before playback starts.
	 * Passed directly to IntersectionObserver as `threshold` (default: 0.1).
	 */
	viewportThreshold?: number;
	/** Replay the effect on mouseenter (default: false). */
	replayOnHover?: boolean;
	/** Replay the effect on click (default: false). */
	replayOnClick?: boolean;
	/** Play / replay whenever this value changes. */
	trigger?: unknown;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `ShuffleText` wraps any HTML tag or React component and applies
 * the ShuffleText scramble-reveal effect to its text content.
 *
 * @example
 * // Plain span (default)
 * <ShuffleText text="Hello World" />
 *
 * @example
 * // h1 with custom duration
 * <ShuffleText component="h1" text="Welcome" duration={1000} className="hero" />
 *
 * @example
 * // Re-trigger on state change
 * <ShuffleText text={label} trigger={label} component="button" />
 */
export default function ShuffleText<T extends AnyTag = "span">({
	text,
	children,
	component,
	sourceRandomCharacter = "░▒▓█",
	emptyCharacter,
	duration,
	autoPlay = true,
	trigger,
	replayOnHover = false,
	replayOnClick = false,
	viewportThreshold = 0.1,
	...rest
}: ShuffleTextProps<T>) {
	const Tag = (component ?? "span") as ElementType;
	const ref = useRef<HTMLElement | null>(null);
	const shuffleRef = useRef<TextShuffler | null>(null);
	const [isMounted, setIsMounted] = useState(false);
	const hasPlayedRef = useRef(false);

	const resolvedText: string =
		typeof text === "string"
			? text
			: typeof children === "string"
				? children
				: "";

	// ── 1. Mark mounted after first client render ──────────────────────────
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsMounted(true);
	}, []);

	// ── 2. Initialise ShuffleText instance whenever key props change ───────
	useEffect(() => {
		if (!isMounted || !ref.current) return;

		// Reset so a new instance always starts with the original text visible
		ref.current.textContent = resolvedText;
		hasPlayedRef.current = false;

		const instance = new TextShuffler(ref.current);

		if (sourceRandomCharacter !== undefined) {
			instance.sourceRandomCharacter = sourceRandomCharacter;
		}
		if (emptyCharacter !== undefined) {
			instance.emptyCharacter = emptyCharacter;
		}
		if (duration !== undefined) {
			instance.duration = duration;
		}

		shuffleRef.current = instance;

		// Autoplay deferred to IntersectionObserver (effect 3)

		return () => {
			instance.dispose();
			shuffleRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		isMounted,
		resolvedText,
		sourceRandomCharacter,
		emptyCharacter,
		duration,
	]);

	// ── 3. IntersectionObserver — start only when element enters viewport ──
	useEffect(() => {
		if (!isMounted || !autoPlay || !ref.current) return;

		const el = ref.current;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && !hasPlayedRef.current) {
					hasPlayedRef.current = true;
					shuffleRef.current?.start();
					// Stop observing after first play — remove if you want
					// the effect to replay every time it re-enters the viewport.
					observer.unobserve(el);
				}
			},
			{ threshold: viewportThreshold },
		);

		observer.observe(el);

		return () => {
			observer.disconnect();
		};
	}, [isMounted, autoPlay, viewportThreshold]);

	// ── 4. Manual trigger ──────────────────────────────────────────────────
	useEffect(() => {
		if (!isMounted || trigger === undefined) return;
		shuffleRef.current?.start();
	}, [isMounted, trigger]);

	// ── 5. Hover / click replay ────────────────────────────────────────────
	useEffect(() => {
		if (!isMounted || (!replayOnHover && !replayOnClick) || !ref.current)
			return;

		const el = ref.current;
		const play = () => shuffleRef.current?.start();

		if (replayOnHover) el.addEventListener("mouseenter", play);
		if (replayOnClick) el.addEventListener("click", play);

		return () => {
			if (replayOnHover) el.removeEventListener("mouseenter", play);
			if (replayOnClick) el.removeEventListener("click", play);
		};
	}, [isMounted, replayOnHover, replayOnClick]);

	// ── Render ─────────────────────────────────────────────────────────────
	if (!isMounted) {
		return (
			<Tag
				aria-hidden="true"
				style={{ visibility: "hidden" }}
				{...(rest as ComponentPropsWithoutRef<typeof Tag>)}
			/>
		);
	}

	return (
		<Tag
			ref={ref}
			suppressHydrationWarning
			{...(rest as ComponentPropsWithoutRef<typeof Tag>)}
		/>
	);
}