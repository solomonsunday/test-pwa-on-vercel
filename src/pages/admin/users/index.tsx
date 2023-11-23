import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import AdminLayout from "@/components/layouts/AdminLayout";
import RightModal from "@/components/layouts/right-modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	getAllUsers,
	suspendUnsuspendUser,
} from "@/features/slices/user/userAction";
import AdminBreadcrump from "@/components/admin/BreadCrump";
import { IUser } from "@/features/slices/user/userInterface";
import AppLoader from "@/components/Reusable/AppLoader";
import Empty from "@/components/Empty";
import ModalLayout from "@/components/layouts/ModalLayout";
import UserPermissionForm from "@/components/admin/UserPermissionForm";
import Paginator from "@/components/Paginator";
import {
	useAlert,
	useAuthenticatedAdminIsPermited,
} from "@/contexts/ApplicationContext";
import { DefinedAdminPermissions } from "@/common/base.constant";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { useOnClickOutside } from "@/hooks/useClickOutside";

export default function Users() {
	const dispatch = useAppDispatch();
	const { sendAlert, sendErrorAlert } = useAlert();
	const { data, loading } = useAppSelector((state) => state.users);
	const [paymentContent] = useState(true);
	const [showRightModal, setShowRightModal] = useState(false);
	const [permissionModalIsOpen, setPermissionModalIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
	const usersData = data?.users || [];
	const totalUsers = data?.totalUsers || 0;

	//Protected route
	useProtectedRoute();
	//Protected route

	const [paginatorData, setPaginatorData] = useState<{
		dataLength: number;
		dataPerPage: number;
		currentPage: number;
	}>({ dataLength: totalUsers, dataPerPage: 8, currentPage: 1 });

	useEffect(() => {
		dispatch(
			getAllUsers({
				data_per_page: paginatorData.dataPerPage,
				current_page: paginatorData.currentPage,
			})
		);
	}, [paginatorData]);

	const ref = useRef(null);
	const toggleRightBar = () => {
		setShowRightModal(!showRightModal);
	};

	useOnClickOutside(ref, () => setShowRightModal(false));

	async function onSuspendUser(user: IUser) {
		try {
			const response = await suspendUnsuspendUser(user);
			sendAlert(response.message);
		} catch (error) {
			sendErrorAlert(error);
		}
	}

	function adminIsPermitted(permission: string) {
		return useAuthenticatedAdminIsPermited({
			requiredPermissions: [permission],
		}).isPermitted;
	}

	return (
		<AdminLayout>
			<>
				<ModalLayout
					parameters={{
						isOpened: permissionModalIsOpen,
						title: "Edit user permissions",
					}}
					modalResult={(result) => setPermissionModalIsOpen(false)}
				>
					<UserPermissionForm
						user={selectedUser}
						returnAction={() => {
							setPermissionModalIsOpen(false);
							dispatch(
								getAllUsers({
									data_per_page: paginatorData.dataPerPage,
									current_page: paginatorData.currentPage,
								})
							);
						}}
					/>
				</ModalLayout>
				{showRightModal && (
					<div ref={ref}>
						<RightModal paymentContent={paymentContent} />
					</div>
				)}{" "}
				<div className="">
					<div className="flex flex-col items-center justify-between mb-10 md:flex-row">
						<AdminBreadcrump breadcrumbDatas={[{ name: "Users" }]} />
						<div className="flex flex-col items-center space-y-3 md:flex-row md:space-y-0">
							<div className="px-3">
								<input
									type="text"
									className="px-3 py-2 bg-transparent border border-gray-300 rounded-lg w-72 placeholder:text-slate-500 placeholder:left-0 focus:ring-0 focus:border-blue-300 focus:outline-none"
									placeholder="Search"
								/>
								{/* <SearchBar
                  keyWord={keyWord}
                  setKeyWord={setKeyWord}
                  onChange={handleSerchAction}
                /> */}
							</div>
							<div className="flex items-center border border-gray-300 rounded-lg focus:border-blue-300 focus:ring-0">
								<input
									type="text"
									className="px-3 py-2 bg-transparent w-44 placeholder:text-slate-500 placeholder:left-0 focus:outline-none focus:border-blue-300 "
									placeholder="Filter"
								/>{" "}
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-4 h-5 pr-1 duration-150 focus:translate-y-10"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</div>
							</div>
							<div className="px-2 cursor-pointer">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div className="mb-4 overflow-auto rounded-lg">
						<table className="w-full">
							<thead className="border-b border-b-gray-400 borer">
								<tr className="">
									<th className="p-3 text-sm font-bold tracking-wide text-left">
										First Name
									</th>
									<th className="p-3 text-sm font-bold tracking-wide text-left">
										Last Name
									</th>
									<th className="p-3 text-sm font-bold tracking-wide text-left">
										Email Name
									</th>
									<th className="p-3 text-sm font-bold tracking-wide text-left">
										Phone Number
									</th>
									<th className="p-3 text-sm font-bold tracking-wide text-left">
										Network Provider
									</th>
									<th className="p-3 text-sm font-bold tracking-wide text-left">
										Action
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-y-50">
								{!loading &&
									usersData.map((user, idx) => {
										return (
											<tr className="" key={idx}>
												<td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
													{user.firstName}
												</td>
												<td className="p-2 text-sm text-gray-700 capitalize whitespace-nowrap">
													{" "}
													{user.surName}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{user.contact?.email}{" "}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{user.contact?.phoneNumber}{" "}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{user.contact?.phoneNumber}{" "}
												</td>
												<td className="p-2 text-sm text-gray-700">
													{" "}
													<div className="">
														<Menu
															as="div"
															className="relative inline-block text-left"
														>
															<div>
																<Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		fill="none"
																		viewBox="0 0 24 24"
																		strokeWidth="1.5"
																		stroke="currentColor"
																		className="w-6 h-6"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
																		/>
																	</svg>
																</Menu.Button>
															</div>
															<Transition
																as={Fragment}
																enter="transition ease-out duration-100"
																enterFrom="transform opacity-0 scale-95"
																enterTo="transform opacity-100 scale-100"
																leave="transition ease-in duration-75"
																leaveFrom="transform opacity-100 scale-100"
																leaveTo="transform opacity-0 scale-95"
															>
																<Menu.Items className="absolute right-0 z-50 w-40 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
																	<div className="px-1 py-1 ">
																		<Menu.Item>
																			{({ active }) => (
																				<button
																					className={`${active
																						? "bg-gray-200 text-black"
																						: "text-black-900"
																						} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																					onClick={toggleRightBar}
																				>
																					View Detail
																				</button>
																			)}
																		</Menu.Item>
																	</div>
																	{adminIsPermitted(
																		DefinedAdminPermissions.user
																			.assignPermission
																	) && (
																			<div className="px-1 py-1 ">
																				<Menu.Item>
																					{({ active }) => (
																						<button
																							onClick={() => {
																								setSelectedUser(user);
																								setPermissionModalIsOpen(true);
																							}}
																							className={`${active
																								? "bg-gray-200 text-black"
																								: "text-black-900"
																								} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																						>
																							Edit Permission
																						</button>
																					)}
																				</Menu.Item>
																			</div>
																		)}
																	{adminIsPermitted(
																		DefinedAdminPermissions.user.edit
																	) && (
																			<div className="px-1 py-1">
																				<Menu.Item>
																					{({ active }) => (
																						<button
																							onClick={() => onSuspendUser(user)}
																							className={`${active
																								? "bg-gray-200 text-white"
																								: "text-gray-900"
																								} group flex w-full items-center rounded-md px-2 py-2 text-sm  text-red-500`}
																						>
																							Suspend user
																						</button>
																					)}
																				</Menu.Item>
																			</div>
																		)}
																</Menu.Items>
															</Transition>
														</Menu>
													</div>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>

						{loading ? <AppLoader /> : usersData.length === 0 && <Empty />}
					</div>
				</div>
				<Paginator
					dataLength={totalUsers}
					currentPage={paginatorData.currentPage}
					dataPerPage={paginatorData.dataPerPage}
					onChangePage={(data) => setPaginatorData(data)}
				/>
			</>
		</AdminLayout>
	);
}
