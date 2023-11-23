import { useKeyUpEvent } from "@/hooks/useKeyUpEvent";
import { XMarkIcon } from "@heroicons/react/24/solid";
import classnames from "classnames";

interface IDialogProps {
	parameters: {
		isOpened: boolean;
		// title: string;
		buttons?: {
			cancel?: { text?: string; color?: "danger" | "normal" };
			confirm?: { text?: string; color?: "danger" | "normal" | "success" };
		};
	};
	dialogResult: (result: {
		isConfirmed: boolean;
		isDenied: boolean;
		isDismissed: boolean;
		value?: string;
	}) => void;
	children: JSX.Element;
}

export default function DialogLayout({
	parameters,
	dialogResult,
	children,
}: IDialogProps): JSX.Element {
	useKeyUpEvent({
		keys: ["escape"],
		returnedAction: () => {
			dialogResult({ isConfirmed: false, isDenied: false, isDismissed: true });
		},
	});

	return (
		<>
			{parameters.isOpened && (
				<div
					onClick={() =>
						dialogResult({
							isConfirmed: false,
							isDenied: false,
							isDismissed: true, // bg-black/40
						})
					}
					className="fixed z-[3] w-full h-full bg-black/50"
				></div>
			)}
			{parameters.isOpened && (
				<div className="flex justify-center items-center fixed mx-auto xs:px-2 z-[3] max-w-lg inset-0">
					<div className="relative bg-white rounded-lg shadow-lg animate__animated  animate__zoomIn animate__faster">
						<div className="flex items-center justify-end px-6 pt-4">
							{/* <p className='text-base font-semibold'>{parameters.title}</p> */}
							<p
								onClick={() =>
									dialogResult({
										isConfirmed: false,
										isDenied: false,
										isDismissed: true,
									})
								}
								className="pl-4 cursor-pointer"
							>
								<XMarkIcon className="w-6 h-6" />
							</p>
						</div>
						<div className="px-6 py-2">{children}</div>
						<div className="flex justify-end w-full gap-4 px-6 py-2 border-t">
							<button
								onClick={() =>
									dialogResult({
										isConfirmed: false,
										isDenied: true,
										isDismissed: false,
									})
								}
								className="w-1/2 px-6 py-2 capitalize border rounded-lg hover:bg-gray-100 hover:border-gray-300"
							>
								{parameters.buttons?.cancel?.text || "Cancel"}
							</button>
							<button
								onClick={() =>
									dialogResult({
										isConfirmed: true,
										isDenied: false,
										isDismissed: false,
									})
								}
								className={classnames(
									"border w-1/2 text-white rounded-lg capitalize py-2 px-14",
									{
										"bg-coventi border-blue-500 hover:bg-blue-600 active:bg-blue-700":
											parameters.buttons?.confirm?.color === "normal",
										"border-red-500 text-red-500 bg-red-500 hover:bg-red-600 active:bg-red-700":
											parameters.buttons?.confirm?.color === "danger",
										"bg-emerald-500 border-emerald-500 hover:bg-emerald-600 active:bg-emerald-700":
											parameters.buttons?.confirm?.color === "success",
									}
								)}
							>
								{parameters.buttons?.confirm?.text || "Confirm"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
