export default function PageItemContainer({ children, className = ' ' }: {
	children: JSX.Element;
	className?: string;
}) {
	const initialStyle = 'container mx-auto ';
	return <div className={initialStyle + className}>
		{children}
	</div>
}
