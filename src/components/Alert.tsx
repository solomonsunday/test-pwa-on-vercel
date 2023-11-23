import { useEffect } from "react";

import {
	CheckCircleIcon,
	// ExclamationCircleIcon,
	InformationCircleIcon,
	XCircleIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import classnames from "classnames";

import {
	AlertType,
	AlertTypeEnum,
} from "@/features/slices/notification/notificationInterface";
import { useAlert } from "@/contexts/ApplicationContext";

export default function Alert(): JSX.Element {
	const { alerts, removeAlert, clearAlerts } = useAlert();

	useEffect(() => {
		let timeOut: NodeJS.Timeout;
		if (alerts.length > 0) {
			timeOut = setTimeout(() => { clearAlerts(); }, 7000);
		}
		return () => { clearTimeout(timeOut); };
	}, [alerts]);

	function deleteNofification(alertId: string): void {
		removeAlert(alertId);
	}

	function renderIcon(type: AlertType): JSX.Element {
		switch (type) {
			case AlertTypeEnum.SUCCESS:
				return <CheckCircleIcon className="w-8 h-8" />;
			case AlertTypeEnum.ERROR:
				return <XCircleIcon className="w-8 h-8" />;
			// case AlertTypeEnum.WARNING:
			// 	return <ExclamationCircleIcon className="w-8 h-8" />;
			case AlertTypeEnum.INFO:
				return <InformationCircleIcon className="w-8 h-8" />;
			default:
				return <CheckCircleIcon className="w-8 h-8" />;
		}
	}

	return (
		<div className="fixed right-0 z-40 max-w-sm mx-4 xs:top-12 md:top-20">
			{alerts.map((alert) => (
				<div
					key={Math.random()}
					className={classnames(
						"flex items-center px-4 py-3 mb-2 gap-4 transition duration-300 ease-in-out delay-150 bg-white border-2	shadow-md rounded-xl hover:-translate-y-1	hover:scale-x-95",
						{
							"border-green-500": alert.type === AlertTypeEnum.SUCCESS,
							"border-red-500": alert.type === AlertTypeEnum.ERROR,
							// "border-orange-400": alert.type === AlertTypeEnum.WARNING,
							"border-blue-500": alert.type === AlertTypeEnum.INFO,
						}
					)}
				>
					<div className="grow-0">
						<div
							className={classnames("shrink-0", {
								"text-green-500": alert.type === AlertTypeEnum.SUCCESS,
								"text-red-500": alert.type === AlertTypeEnum.ERROR,
								// "text-orange-400": alert.type === AlertTypeEnum.WARNING,
								"text-blue-500": alert.type === AlertTypeEnum.INFO,
							})}
						>
							{renderIcon(alert.type!)}
						</div>
					</div>
					<div className="grow">
						<p
							className={classnames("mb-0", {
								"text-green-500": alert.type === AlertTypeEnum.SUCCESS,
								"text-red-500": alert.type === AlertTypeEnum.ERROR,
								// "text-orange-400": alert.type === AlertTypeEnum.WARNING,
								"text-blue-500": alert.type === AlertTypeEnum.INFO,
							})}
						>
							{alert?.message}
						</p>
					</div>
					<div className="text-right grow-0">
						<div className="shrink-0">
							<XMarkIcon
								onClick={() => deleteNofification(alert?.id!)}
								className={classnames("w-5 h-5 cursor-pointer", {
									"text-green-500": alert.type === AlertTypeEnum.SUCCESS,
									"text-red-500": alert.type === AlertTypeEnum.ERROR,
									// "text-orange-400": alert.type === AlertTypeEnum.WARNING,
									"text-blue-500": alert.type === AlertTypeEnum.INFO,
								})}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
