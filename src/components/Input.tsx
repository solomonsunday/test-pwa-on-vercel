import classnames from 'classnames';
import React from 'react'
import { RegisterOptions } from 'react-hook-form';

export interface IInputProps {
	id?: string;
	key?: React.Key;
	type: React.HTMLInputTypeAttribute;
	name?: string;
	label?: string;
	value?: string | boolean | number;
	style?: { removeDefault: boolean; };
	isChecked?: boolean;
	isReadOnly?: boolean;
	className?: string;
	isRequired?: boolean;
	isDisabled?: boolean;
	placeholder?: string;
	autoComplete?: boolean;
	onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
	onClick?: () => void;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	register?: (callback: (field: string, option: RegisterOptions) => any) => void;
}

// https://www.becomebetterprogrammer.com/typescript-pass-function-as-a-parameter/

export default function Input({
	id, name, type, label, className = ' ', isReadOnly,
	isChecked = false, autoComplete = false,
	placeholder, value, isDisabled = false, isRequired = true,
	style = { removeDefault: false },
	onBlur, onClick, onChange
}: IInputProps) {
	let initialStyle = 'p-3 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 ';

	return (
		<>
			{label && <label htmlFor={id} className="mb-1 text-sm text-gray-400">{label}</label>}
			<input
				// {...register && register((name, option) => {

				// })
				// // "surName", {
				// // 		required: "Surname is required",
				// // 		minLength: 3,
				// // 	})

				// }
				onClick={() => onClick && onClick()}
				type={type}
				autoComplete={autoComplete as unknown as string}
				id={id}
				name={name}
				readOnly={isReadOnly}
				required={isRequired}
				disabled={isDisabled}
				checked={isChecked}
				value={value as any}
				onBlur={(event => onBlur && onBlur(event))}
				onChange={event => onChange && onChange(event)}
				className={classnames(!style?.removeDefault ? initialStyle + className : className)}
				placeholder={placeholder}
			/>
		</>
	)
}
