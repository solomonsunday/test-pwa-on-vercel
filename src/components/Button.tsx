import { ArrowPathIcon } from "@heroicons/react/24/solid";
import classnames from "classnames";
import Link from "next/link";

export interface IButtonProps {
	type?: "button" | "submit" | "reset";
	text?: any;
	size?: "large" | "normal" | "small";
	className?: string;
	isDisabled?: boolean;
	isBusy?: boolean;
	url?: string;
	onClick?: () => void;
}

export default function CoventiButton({
	type = "button",
	text = "Button",
	size = "normal",
	className,
	isDisabled = false,
	isBusy = false,
	url,
	onClick,
}: IButtonProps) {
	let initialStyle =
		"rounded-full bg-coventi-500 py-2 hover:bg-blue-600 active:bg-blue-700 text-white disabled:shadow-none disabled:bg-blue-300 ";

	function renderButton(): JSX.Element {
		return (
			<button
				onClick={() => (!isDisabled && onClick) && onClick()}
				type={type}
				disabled={isDisabled || isBusy}
				className={classnames(initialStyle + className, {
					// "text-base py-3": size === "normal",
					// "py-2": size === "small",
				})}
			>
				<div className="flex items-center justify-center gap-3">
					{isBusy && (
						<ArrowPathIcon
							className={classnames("animate-spin", {
								"h-6 w-6": size === "normal",
								"h-4 w-4": size === "small",
							})}
						/>
					)}
					{!isBusy && text}
				</div>
			</button>
		);
	}

	return url ? <Link href={url}>{renderButton()}</Link> : renderButton();
}
