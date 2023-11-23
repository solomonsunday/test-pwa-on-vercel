import classnames from 'classnames';

export default function Capsule({ textContent, isClickable = true, isSelected = false, onClick }: {
	textContent: string;
	isClickable?: boolean;
	isSelected?: boolean;
	onClick?: (content?: string) => void;
}) {
	return <div onClick={() => (isClickable && onClick) && onClick(textContent.toLowerCase())} className={classnames("rounded-full text-xs border border-slate-400 py-1 px-4", {
		"cursor-pointer hover:border-coventi-500 hover:text-coventi-500 hover:bg-blue-100/50 active:bg-blue-100": isClickable,
		'bg-blue-100/50 text-coventi-500 !border-coventi-500': isSelected
	})}>{textContent}</div>
}
