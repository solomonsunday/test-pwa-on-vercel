import React from 'react'

export default function PageItemsLayout({ children, className = ' ' }: {
	children: JSX.Element;
	className?: string;
}) {
	const initialStyle = 'xs:px-4 xs:pt-24 sm:pt-20 md:pt-28 lg:pt-24 ';
	return <div className={initialStyle + className}>
		{children}
	</div>

}
