import { AnyTag } from '@/lib/types';
import React, { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';


export type CardProps<T extends AnyTag = 'div'> = {
	children: React.ReactNode;
	className?: string;
	component?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'children'>;

type CardComponent = <T extends AnyTag = 'div'>(
	props: CardProps<T> & { ref?: React.Ref<HTMLElement> },
) => React.ReactElement | null;

const CardBase = forwardRef<HTMLElement, CardProps<AnyTag>>(function Card(
	{ children, component, className = '', ...rest },
	ref,
) {
	const Tag = (component ?? 'div') as ElementType;

	return (
		<Tag
			ref={ref as React.Ref<HTMLElement>}
			className={`bg-surface/90 backdrop-blur-md border border-accent/10 rounded-2xl md:rounded-3xl transition-all duration-400 hover:bg-surface hover:border-accent/30 hover:shadow-[0_0_24px_rgba(255,153,28,0.06)] p-4 ${className}`}
			{...rest}
		>
			{children}
		</Tag>
	);
});

export const Card = CardBase as CardComponent;

export default Card;