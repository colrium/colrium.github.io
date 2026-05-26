import { PropsWithChildren } from 'react';
interface PanelProps  extends React.HTMLAttributes<HTMLElement>{
    bgText?: string;
    className?: string;
    innerClassName?: string;
    bgTextClassName?: string;
    copyClassName?: string;
}

const  Panel = ({ bgText, children, className, innerClassName, bgTextClassName, copyClassName, ...props }: PropsWithChildren<PanelProps>) => {
	return (
		<section className={`panel ${className || ""}`} {...props}>
			<div className={`panel-inner ${innerClassName || ""}`}>
				{bgText && (
					<span className={`layer-bg ${bgTextClassName || ""}`} aria-hidden="true">
						{bgText}
					</span>
				)}
				<div className={`panel-copy ${copyClassName || ""}`}>
					{children}
				</div>
			</div>
		</section>
	);
}
export default Panel;