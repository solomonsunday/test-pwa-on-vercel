import {
	useNotification,
	useUserIsAuthenticated,
	useVerification,
} from "@/contexts/ApplicationContext";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import VerificationModal from "./Reusable/VerificationModal";
// import { useRouter } from "next/router";

export default function InLineNotification(): JSX.Element {
	// const router = useRouter();

	const { toggleVerificationModal, isVerificationModalOpen } =
		useVerification();
	const isAuthenticated = useUserIsAuthenticated()
	const { toggleNotification, notification } = useNotification();

	// function renderNetworkErrorNotification() {
	// 	return <div className="fixed z-[2] w-full px-3 py-4 shadow-md bg-red-500">
	// 		<div className="flex items-center justify-center gap-4 lg:pl-16 text-slate-500">
	// 			<div className="shrink-0">
	// 				<WifiIcon className="w-8 h-8 text-center text-red-500" />
	// 			</div>
	// 			<p className="text-base">{message}</p>
	// 			<div className="shrink-0">
	// 				<XMarkIcon className="w-8 h-8 text-center text-red-500" />
	// 			</div>
	// 		</div>
	// 	</div>
	// }

	function renderVerificationNotification(): JSX.Element {
		return (
			<div className="fixed z-50 w-full px-3 py-3 bg-red-400 shadow-md">
				<div className="flex items-center justify-center xs:gap-2 md:gap-10 text-slate-500">
					<div className="xs:hidden shrink-0">
						<ExclamationCircleIcon className="w-8 h-8 text-center text-white" />
					</div>
					<p className="text-white xs:text-sm sm:text-base">
						Click to verify account to buy, watch events, and more.
					</p>
					<div className="shrink-0">
						<button
							onClick={() => toggleVerificationModal()}
							className="px-8 py-1 text-red-500 rounded-md bg-red-50 hover:bg-red-100 active:bg-red-200"
						>
							Verify
						</button>
					</div>
					<div className="shrink-0">
						<button
							onClick={() => toggleNotification()}
							className="px-2 py-1 text-red-500 rounded-md bg-red-50 hover:bg-red-100 active:bg-red-200"
						>
							<XMarkIcon className="w-5 h-5 text-center" />
						</button>
					</div>
				</div>
				{isVerificationModalOpen && <VerificationModal />}
			</div>
		);
	}

	//   function helpNavigateToProfile() {
	//     if (router.asPath === "/profile?tab=verification") return;
	//     router.push("/profile?tab=verification");
	//   }

	return <>{(isAuthenticated && notification.isOpened) && renderVerificationNotification()}</>;
}
