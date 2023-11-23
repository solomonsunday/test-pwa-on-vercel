import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

import { generateNanoId, getAuthData, saveAuthData } from "@/common/utility";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { persistAuthentication } from "@/features/slices/auth/authAction";
import { IAuthenticatedUser } from "@/features/slices/auth/authInterface";
import {
	AlertType,
	AlertTypeEnum,
	IAlert,
} from "@/features/slices/notification/notificationInterface";
import { UserTypeEnum } from "@/features/slices/user/userInterface";
import { IBaseErrorObject } from "@/common/base.interface";

// for auth guard
// https://github.com/ivandotv/nextjs-client-signin-logic
// https://github.com/pagecow/nextjs-13-context-
// https://github.dev/sericaia/react-global-notifications-example
const Context = createContext<{
	notification: {
		toggleNotification: (type?: "network" | "verification") => void;
		notification: { isOpened: boolean; type?: "network" | "verification" };
	};
	verification: {
		toggleVerificationModal: () => void;
		isVerificationModalOpen: boolean;
		isVerified: boolean;
	};
	alert: {
		sendAlert: (message: string, type?: AlertType) => void;
		sendErrorAlert: (error: Pick<IBaseErrorObject, 'message'>) => void;
		removeAlert: (alertId: string) => void;
		clearAlerts: () => void;
		alerts: IAlert[];
	};
	userAuthentication:
	| (IAuthenticatedUser & { isAuthenticated: boolean })
	| null;
}>({
	notification: {
		toggleNotification: () => { },
		notification: { isOpened: true },
	},
	verification: {
		toggleVerificationModal: () => { },
		isVerificationModalOpen: false,
		isVerified: true,
	},
	alert: {
		sendAlert: () => { },
		sendErrorAlert: () => { },
		removeAlert: () => { },
		clearAlerts: () => { },
		alerts: [],
	},
	userAuthentication: null,
});

export default function ApplicationContext({ children }: any): JSX.Element {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [alerts, setAlerts] = useState<IAlert[]>([]);
	const [showVerifyModal, setShowVerifyModal] = useState(false);
	const [isVerified, setIsVerified] = useState(true);
	const [notification, setNotification] = useState<{
		isOpened: boolean;
		type?: "network" | "verification";
	}>({ isOpened: false });
	const authState = useAppSelector((state) => state.auth.data)!;
	const dispatch = useAppDispatch();

	useEffect(() => {
		helpSetAuth();
	}, [authState]);

	function helpSetAlerts(data: IAlert): void {
		setAlerts((currentAlerts) => {
			data.type = data.type || AlertTypeEnum.SUCCESS;
			data = { id: generateNanoId(10), ...data };
			// https://youtu.be/oc_TNtCe2sY?t=1077
			return [data, ...currentAlerts];
		});
	}

	function helpSetAuth() {
		const authStore = getAuthData();
		if (!authState && !authStore) {
			setIsAuthenticated(false);
			return;
		}
		if (authState?.user && !authState?.user?.isVerified) {
			// set notification
			helpSetNotification(true);
			setIsVerified(false);
		}
		if (authState?.user && authState?.user?.isVerified) {
			// set notification
			helpSetNotification(false);
			setIsVerified(true);
		}

		if (!authState && authStore) {
			// set the state into redux store
			dispatch(persistAuthentication(authStore));
			setIsAuthenticated(true);
			return;
		}
		if (authState && !authStore) {
			//set the state into local storage
			saveAuthData({ ...authState });
			setIsAuthenticated(true);
			return;
		}
		setIsAuthenticated(true);
	}

	function helpSetNotification(
		isOpened: boolean,
		type?: "network" | "verification"
	): void {
		setNotification({ isOpened, type });
	}

	const contextValues = {
		// other states can go here
		notification: {
			toggleNotification: (type?: "verification" | "network") => {
				const isOpen = !notification.isOpened;
				helpSetNotification(isOpen, type);
			},
			notification: { ...notification },
		},

		alert: {
			sendAlert: useCallback(
				(message: string, type?: AlertType) => helpSetAlerts({ message, type }),
				[]
			),
			sendErrorAlert: useCallback((error: IBaseErrorObject) => {
				let type = AlertTypeEnum.ERROR;
				const message = error?.message || "An error occured";
				// if (error?.statusCode > 499 && error.statusCode < 600) {
				//   type = AlertTypeEnum.ERROR;
				// }
				const newAlert = { message, type };
				helpSetAlerts(newAlert);
			}, []),
			removeAlert: (alertId: string) => {
				const newAlerts = alerts.filter((alert) => alert.id! !== alertId);
				setAlerts(newAlerts);
			},
			clearAlerts: () => setAlerts([]),
			alerts: [...alerts],
		},
		userAuthentication: { isAuthenticated, ...authState! },
		verification: {
			toggleVerificationModal: useCallback(() => {
				setShowVerifyModal((showModal) => !showModal);
			}, []),
			isVerificationModalOpen: showVerifyModal,
			isVerified,
		},
	};

	return <Context.Provider value={contextValues}>{children}</Context.Provider>;
}
// For route protection
// https://stackoverflow.com/questions/63251020/react-nextjs-protected-routes

export function useUserIsAuthenticated(): boolean {
	return useContext(Context).userAuthentication?.isAuthenticated || false;
}
export function useAuthenticatedUser() {
	return useContext(Context).userAuthentication?.user;
}
export function useUserAuthentication() {
	return useContext(Context).userAuthentication;
}
export function useAlert() {
	return useContext(Context).alert;
}
export function useNotification() {
	return useContext(Context).notification;
}
export function useVerification() {
	return useContext(Context).verification;
}
export function useAuthenticatedAdminIsPermited({
	requiredPermissions,
	matchAll = false,
}: {
	requiredPermissions: string[];
	matchAll?: boolean;
}): { isAuthenticated: boolean; isPermitted: boolean } {
	let isPermitted = false;
	const authentication = useContext(Context).userAuthentication;
	if (
		!authentication ||
		!authentication?.user ||
		!authentication?.isAuthenticated
	) {
		return { isAuthenticated: false, isPermitted };
	}
	const permissions = authentication.user.permissions;

	if (
		!permissions.length ||
		authentication.user.userType !== UserTypeEnum.ADMIN
	) {
		return { isAuthenticated: true, isPermitted };
	}
	if (matchAll) {
		isPermitted = requiredPermissions.every((item) =>
			permissions.includes(item)
		);
		return { isAuthenticated: true, isPermitted };
	}
	isPermitted = requiredPermissions.some((item) => permissions.includes(item));
	return { isAuthenticated: true, isPermitted };
}

export function useAuthenticatedAdminPermissions(): string[] {
	const authentication = useContext(Context).userAuthentication;
	if (
		!authentication ||
		!authentication?.user ||
		!authentication?.isAuthenticated
	) {
		return [];
	}
	if (authentication.user.userType !== UserTypeEnum.ADMIN) {
		return [];
	}
	return authentication.user.permissions;
}
