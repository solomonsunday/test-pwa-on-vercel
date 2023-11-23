import { toTitleCase } from '@/common/utility';
import { useKeyUpEvent } from '@/hooks/useKeyUpEvent';
import { XMarkIcon } from "@heroicons/react/24/solid";
import classnames from 'classnames';

interface IDialogProps {
	parameters: {
		isOpened: boolean;
		title: string;
		subTitle?: string;
		size?: 'large' | 'medium' | 'small';
		position?: "right" | "left" | "center";
	};
	modalResult?: (data?: string) => void;
	children: JSX.Element;
}

export default function ModalLayout({
	parameters,
	modalResult,
	children,
}: IDialogProps) {
	parameters.position = parameters?.position || "center";
	parameters.size = parameters?.size || "small";

	useKeyUpEvent({
		keys: ["escape"],
		returnedAction: () => { modalResult && modalResult(); }
	});


	function renderHeader(): JSX.Element {
		return <div className="sticky bg-white top-0 shadow-sm px-6 py-3 border-b">
			<div className="flex items-center justify-between">
				<p className="text-lg mb-1 text-coventi">{toTitleCase(parameters.title)}</p>
				<p onClick={() => modalResult && modalResult()} className="pl-4 cursor-pointer text-red-600">
					<XMarkIcon className="w-6 h-6" />
				</p>
			</div>
			{parameters?.subTitle && <p className="text-xs text-slate-500">{parameters?.subTitle}</p>}
		</div>
	}

	function renderRightModal() {
		return (
			<>
				{parameters.isOpened && (
					<div className="flex justify-center items-center fixed ml-auto z-50 max-w-md inset-0">
						<div className="overflow-auto relative w-full h-full bg-white shadow-lg animate__animated animate__slideInRight ">
							{renderHeader()}
							<div className="px-6 py-3">{children}</div>
						</div>
					</div>
				)}
			</>
		);
	}

	function renderLeftModal() {
		return (
			<>
				{parameters.isOpened && (
					<div className="flex justify-center items-center fixed mr-auto z-50 max-w-md inset-0">
						<div className="overflow-auto relative w-full h-full bg-white shadow-lg animate__animated animate__slideInLeft">
							{renderHeader()}
							<div className="px-6 py-3">{children}</div>
						</div>
					</div>
				)}
			</>
		);
	}

	function renderCenterModal(): JSX.Element {
		return (
			<>
				{parameters.isOpened && (
					<div className={classnames('flex justify-center items-center fixed mx-auto z-50 inset-0 py-6 xs:px-2', {
						"max-w-lg": parameters.size === "small",
						"max-w-3xl": parameters.size === "medium",
						"max-w-6xl": parameters.size === "large"
					})} >
						<div className="overflow-auto relative w-full h-auto max-h-full bg-white rounded-lg shadow-lg animate__animated animate__zoomIn animate__faster ">
							{/* overflow needs to be controlled */}
							{renderHeader()}
							<div className="px-6 py-3">{children}</div>
						</div>
					</div>
				)}
			</>
		);
	}

	return (
		<>
			{parameters.isOpened && (
				<div onClick={() => modalResult && modalResult()} className="fixed z-30 left-0 top-0 w-full h-full bg-black/50"></div>
			)}
			{parameters.position === "center" && renderCenterModal()}
			{parameters.position === "left" && renderLeftModal()}
			{parameters.position === "right" && renderRightModal()}
		</>
	);
}
