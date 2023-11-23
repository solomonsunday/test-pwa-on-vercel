import { useKeyUpEvent } from "@/hooks/useKeyUpEvent";
import React from "react";

interface IMenuProps {
	parameters: { isOpened: boolean; title?: string };
	action: () => void;
	children: JSX.Element;
}

export default function MenuLayout({
	parameters,
	action,
	children,
}: IMenuProps): JSX.Element {
	useKeyUpEvent({
		keys: ["escape"],
		returnedAction: () => {
			action();
		},
	});

	// https://github.com/Ibaslogic/react-multilevel-dropdown-menu/blob/main/src/components/Dropdown.js
	return (
		<>
			{/* {parameters.isOpened && <div onClick={() => action()} className='fixed z-[2] w-full h-full bg-black/50'></div>} */}
			<div className="absolute">
				<div className="absolute w-56">{children}</div>
			</div>
		</>
	);
}
