import React from 'react'

export default function UserLayout({ children, className = ' ' }: {
	children: JSX.Element;
	className?: string;
}): JSX.Element {
	const initialStyle = 'xs:px-2 xs:pt-24 sm:pt-20 md:pt-28 lg:pt-24 ';
	return (
		<div className={initialStyle + className}>
			{children}
		</div>
	)
}
