import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames';

export interface IRadioProps {
	id: string;
	value: string | number | boolean;
	label: "button" | "submit" | "reset";
	isSelected?: boolean;
	onClick: (value: string | number | boolean) => void;
}

export default function RadioButton({ id, value, label, isSelected, onClick }: IRadioProps) {
	return <>
		<input onClick={() => onClick(value)}
			type="radio"
			id={id}
			value={value as any}
			className="w-5 h-5"
			hidden
		/>
		<label
			htmlFor={id}
			className={classnames(
				"block w-full px-4 py-1 rounded-full focus:outline-none border",
				{
					"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white": !isSelected,
					"text-coventi-500 border-white ring-2 ring-coventi-500": isSelected
				}
			)}
		>
			<div className="flex items-center justify-between">
				<p>{label}</p>
				{isSelected && <p><CheckBadgeIcon className="w-4 h-4" /></p>}
			</div>
		</label>
	</>
}
