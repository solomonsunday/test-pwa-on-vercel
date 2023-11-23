import { useEffect, useState } from "react";
import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminBreadcrump from "@/components/admin/BreadCrump";
import { matchAdminPermissions } from "@/common/utility";
import {
	useAlert,
	useAuthenticatedAdminPermissions,
} from "@/contexts/ApplicationContext";
import { DefinedAdminPermissions } from "@/common/base.constant";
import CoventiButton from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import Empty from "@/components/Empty";
import AppLoader from "@/components/Reusable/AppLoader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	ArrowTopRightOnSquareIcon,
	EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuItem } from "@szhsin/react-menu";
import Paginator from "@/components/Paginator";
import {
	createTicket,
	getTickets,
} from "@/features/slices/ticket/ticketAction";
import ModalLayout from "@/components/layouts/ModalLayout";
import CreatableSelect from "react-select/creatable";
import { useForm } from "react-hook-form";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { getEvents } from "@/features/slices/event/eventAction";
import { CreateTicketDto } from "@/features/slices/ticket/ticketInterface";
import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function Tickets() {
	const dispatch = useAppDispatch();
	const adminPermissions = useAuthenticatedAdminPermissions();
	const {
		data: ticketData,
		loading: isLoading,
		error,
	} = useAppSelector((state) => state.tickets);
	const events = useAppSelector((state) => state.events.data?.events) || [];
	const tickets = ticketData?.tickets || [];
	const totalTickets = ticketData?.totalTickets || 0;
	const [newTicketModalIsOpened, setNewTicketModalIsOpened] = useState(false);
	const { sendAlert, sendErrorAlert } = useAlert();
	const [paginatorData, setPaginatorData] = useState<{
		dataLength: number;
		dataPerPage: number;
		currentPage: number;
	}>({ dataLength: totalTickets, dataPerPage: 10, currentPage: 1 });

	//Protected route
	useProtectedRoute();
	//Protected route

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isDirty, isValid },
	} = useForm<CreateTicketDto>({ mode: "onChange" });

	useEffect(() => {
		if (error) {
			sendErrorAlert(error);
		}
	}, [error]);

	useEffect(() => {
		if (newTicketModalIsOpened) {
			dispatch(getEvents({}));
		}
	}, [newTicketModalIsOpened]);

	useEffect(() => {
		dispatch(
			getTickets({
				data_per_page: paginatorData.dataPerPage,
				current_page: paginatorData.currentPage,
			})
		);
	}, [paginatorData]);

	function onSubmitTicket(data: CreateTicketDto) {
		createTicket(data)
			.then((response) => {
				sendAlert(response.message);
				dispatch(
					getTickets({
						data_per_page: paginatorData.dataPerPage,
						current_page: paginatorData.currentPage,
					})
				);
				setNewTicketModalIsOpened(false);
			})
			.catch((error) => sendErrorAlert(error));
	}

	function adminIsPermitted(permission: string): boolean {
		return matchAdminPermissions({
			requiredPermissions: [permission],
			userPermissions: adminPermissions,
		});
	}

	return (
		<>
			{/* <div ref={ref}>
				{showRightModal && <RightModal paymentContent={paymentContent} />}{" "}
			</div> */}
			<AdminLayout>
				<>
					<ModalLayout
						parameters={{
							isOpened: newTicketModalIsOpened,
							position: "right",
							title: "Assign ticket",
						}}
						modalResult={(result) => {
							setNewTicketModalIsOpened(false);
						}}
					>
						<>
							<form onSubmit={handleSubmit(onSubmitTicket)}>
								<div className="mb-6">
									<span className="text-sm text-gray-400">Sponsors</span>
									<CreatableSelect
										className="w-full mt-1"
										instanceId="tags"
										placeholder="Selects event"
										hideSelectedOptions={true}
										minMenuHeight={10}
										theme={
											{
												borderRadius: 8,
												spacing: {
													// controlHeight: 4,
													baseUnit: 6.3,
													menuGutter: 4,
												},
											} as any
										}
										onChange={(selectedEvent) => {
											setValue("eventId", selectedEvent?.value!, {
												shouldDirty: true,
												shouldTouch: true,
												shouldValidate: true,
											});
										}}
										options={events.map((event) => ({
											label: event.name,
											value: event._id,
										}))}
									/>
								</div>

								<div className="block mb-4">
									<span className="block text-gray-400">Email</span>
									<div className="flex items-center">
										<input
											{...register("email", {
												required: "Email is required",
												minLength: 5,
											})}
											type="email"
											autoComplete="false"
											className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
											placeholder="Email..."
										/>

										{isValid ? (
											<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
										) : (
											<></>
										)}
									</div>

									{errors.email?.type === "required" && (
										<p className="mt-1 text-xs italic text-red-600">
											{errors.email?.message}
										</p>
									)}
									{/* {errors.email?.type === "minLength" && (
										<p className="mt-1 text-xs italic text-red-600">
											Minimum input length of 5
										</p>
									)} */}
									{errors.email?.type === "pattern" && (
										<p className="mt-1 text-xs italic text-red-600">
											Please provide a valid email address!
										</p>
									)}
								</div>

								<CoventiButton
									isDisabled={!isDirty || !isValid}
									type="submit"
									text="Assign Ticket"
									className="w-full"
									size="small"
								/>
							</form>
						</>
					</ModalLayout>

					<div className="flex justify-between pt-5 mb-6">
						<AdminBreadcrump breadcrumbDatas={[{ name: "Tickets" }]} />
						{adminIsPermitted(DefinedAdminPermissions.ticket.add) && (
							<CoventiButton
								onClick={() => setNewTicketModalIsOpened(true)}
								text="Assign Ticket"
								className="px-8"
								size="small"
							/>
						)}
					</div>
					<div className="mb-6">
						<SearchBar />
					</div>

					<div className="w-full mb-6">
						<div className="grid grid-cols-12 gap-4 px-2 pb-1">
							<div className="col-span-2">
								<p className="font-semibold">Ticket ID</p>
							</div>
							<div className="col-span-2">
								<p className="font-semibold">User</p>
							</div>
							<div className="col-span-4">
								<p className="font-semibold">Event name</p>
							</div>
							<div className="col-span-2">
								<p className="font-semibold">Created date</p>
							</div>
							{/* <div className="col-span-1">
								<p className="font-semibold">Schedules</p>
							</div> */}
							<div className="col-span-1">
								<p className="font-semibold">Amount</p>
							</div>
							<div className="col-span-1">
								<p className="font-semibold text-center">Action</p>
							</div>
						</div>
						<hr />

						{isLoading && tickets.length === 0 && (
							<div className="py-20">
								<AppLoader />
							</div>
						)}
						{!isLoading && tickets.length === 0 && <Empty />}

						{tickets.length > 0 &&
							tickets.map((ticket) => {
								return (
									<div key={Math.random()}>
										<div className="grid grid-cols-12 gap-4 px-2 hover:bg-gray-50">
											<div className="col-span-4 py-3">
												<p className="capitalize truncate">{ticket.referenceId}</p>
											</div>
											<div className="col-span-2 py-3 capitalize">
												{ticket.user?.firstName} {ticket.user?.surName}
											</div>
											<div className="col-span-2 py-3">{ticket.event?.name}</div>
											<div className="col-span-1 py-3">  {ticket.dateCreated}                      </div>
											<div className="col-span-1 py-3 capitalize">{ticket.type}</div>
											<div className="col-span-1 py-3">
												{ticket.payment?.amount}
											</div>
											<div className="flex col-span-1">
												<p className="px-3 py-3 cursor-pointer hover:text-blue-500 hover:bg-blue-100 active:bg-blue-200">
													<ArrowTopRightOnSquareIcon className="w-5 h-5" />
												</p>
												<Menu
													menuButton={
														<p className="px-2 pt-3 pb-2 cursor-pointer hover:text-blue-500 hover:bg-blue-100 active:bg-blue-200">
															<EllipsisVerticalIcon className="w-6 h-6" />
														</p>
													}
													direction="left"
													position="anchor"
													viewScroll="auto"
													arrow
													transition
												>
													{/* {adminIsPermitted(DefinedAdminPermissions.event.edit) && <MenuItem onClick={() => { }} className='hover:bg-blue-50 hover:text-blue-500' >
												<div className="py-1">Edit</div>
											</MenuItem>} */}
													{/* <hr /> */}
													{/* {adminIsPermitted(DefinedAdminPermissions.event.edit) && <MenuItem onClick={() => {
												onUpdateEventStatus(event.referenceId);
												helpSelectEvent(event._id!);
												setStatusModalIsOpen(true);
											}} className='hover:bg-blue-50 hover:text-blue-500' >
												<div className="py-1">Update status/schedules</div>
											</MenuItem>}
											<hr />
											<MenuItem onClick={() => { }} className='hover:bg-blue-50 hover:text-blue-500' >
												<div className="py-1">Copy stream details</div>
											</MenuItem>
											<hr /> */}
													{adminIsPermitted(
														DefinedAdminPermissions.event.delete
													) && (
															<MenuItem
																onClick={() => { }}
																className="hover:bg-red-50 hover:text-red-500"
															>
																<div className="py-1">Delete</div>
															</MenuItem>
														)}
												</Menu>
											</div>
										</div>
										<hr />
									</div>
								);
							})}
					</div>

					<Paginator
						dataLength={totalTickets}
						currentPage={paginatorData.currentPage}
						dataPerPage={paginatorData.dataPerPage}
						onChangePage={(data) => setPaginatorData(data)}
					/>
				</>

				{/* <div className="p-5">
					<div className="flex items-center justify-between mb-10">
						<AdminBreadcrump breadcrumbDatas={[{ name: "Tickets" }]} />

						<div className="flex items-center">
							<button
								className="px-3 py-3 text-white bg-blue-500 border border-blue-300 rounded-full md:px-5 hover:bg-blue-300 "
								onClick={openModal}
							>
								Assign Ticket
							</button>
							<NewTicketModal isOpen={isModalOpen} onClose={closeModal}>
								<div className="flex flex-col justify-between h-full">

									<h2 className="text-2xl pb-9 ">Assign Tickets</h2>

									<div className="mb-8">
										<SearchableSelect
											usage='user'
											options={users}
											onSelect={handleSelect}
											label='Select User'
										/>
									</div>
									<div className="mb-6">
										<SearchableSelect
											options={events}
											onSelect={handleSelect}
											usage='event'
											label='Select Event'
										/>
									</div>

									<div className="mt-4 mb-4">
										<button
											className="px-4 py-1 mt-4 text-white bg-blue-500 border border-blue-300 rounded-full md:px-5 hover:bg-blue-300 "
											type="submit" >Assign </button>
									</div>

								</div>
							</NewTicketModal>
						</div>
					</div>
					<div className="mb-4">
						<input
							type="text"
							className="px-3 py-2 bg-transparent border rounded-md w-72 placeholder:text-slate-400 border-slate-300 focus:outline-none focus:border-blue-300"
							placeholder="Search "
						/>
					</div>
					<div className="pb-32 overflow-auto rounded-lg">
						<table className="w-full">
							<thead className="border-b border-b-gray-400 borer">
								<tr className="">
									<th className="p-3 text-sm font-semibold tracking-wide text-left">
										Ticket ID
									</th>
									<th className="p-3 text-sm font-semibold tracking-wide text-left">
										Ticket Type
									</th>
									<th className="p-3 text-sm font-semibold tracking-wide text-left">
										Tickets Owner
									</th>
									<th className="p-3 text-sm font-semibold tracking-wide text-left">
										Event Name
									</th>
									<th className="p-3 text-sm font-semibold tracking-wide text-left">
										Payment Reference
									</th>
									<th className="p-3 text-sm font-semibold tracking-wide text-left">
										Date & time
									</th>
									<th className="p-3 text-sm font-semibold tracking-wide text-left">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{tickets &&
									tickets.length > 0 &&
									tickets.map((item) => {
										return (
											<tr key={item.id} className="">
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{item.id}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{" "}
													{item.type}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{item.owner}{" "}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{item.event}{" "}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{item.ref}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{item.date}
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
																					Edit Ticket
																				</button>
																			)}
																		</Menu.Item>
																	</div>
																	<div className="px-1 py-1">
																		<Menu.Item>
																			{({ active }) => (
																				<button
																					className={`${active
																						? "bg-gray-200 text-black"
																						: "text-gray-900"
																						} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																				>
																					Transfer Ownership
																				</button>
																			)}
																		</Menu.Item>
																	</div>
																	<div className="px-1 py-1">
																		<Menu.Item>
																			{({ active }) => (
																				<button
																					className={`${active
																						? "bg-gray-200 text-red-500"
																						: "text-gray-900"
																						} group flex w-full items-center rounded-md px-2 py-2 text-sm  text-red-500`}
																				>
																					Remove Ticket
																				</button>
																			)}
																		</Menu.Item>
																	</div>
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
						{tickets.length === 0 && (
							<div className="flex items-center justify-center w-full my-36">
								<div className="flex flex-col items-center justify-center px-auto">
									<div className="">
										<img src="/assets/images/user.svg" alt="user" />
									</div>
									<div className="mt-6 text-center">
										<p className="text-lg font-semibold">
											No Tickets available yet
										</p>
										<p>
											Your user's Tickets will apear here when they have one
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div> */}
			</AdminLayout>
		</>
	);
}
