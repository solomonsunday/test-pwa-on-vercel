import React from 'react'

type IProps = {
	message: string;
	children: JSX.Element;
}

export default function Tooltip({ children, message }: IProps) {
	// https://ahmadrosid.com/blog/react-tailwind-tooltip
	return (
		<div className="group relative">
			<span className="absolute w-auto bottom-10 scale-0 transition-all rounded-lg bg-gray-500 p-2 text-xs text-white group-hover:scale-100">{message}</span>
			{children}
		</div>
	)
}