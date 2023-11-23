import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import AdminBreadcrump from "@/components/admin/BreadCrump";
import AdminLayout from "@/components/layouts/AdminLayout";
import SearchBar from "@/components/SearchBar";
import {
	getEvents,
	getEventStreamData,
	updateEventStatus,
} from "@/features/slices/event/eventAction";
import AppLoader from "@/components/Reusable/AppLoader";
import Empty from "@/components/Empty";
import DialogLayout from "@/components/layouts/DialogLayout";
import { CheckBadgeIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Paginator from "@/components/Paginator";
import { ArrowTopRightOnSquareIcon, EllipsisVerticalIcon, } from "@heroicons/react/24/solid";
import { Menu, MenuItem } from "@szhsin/react-menu";
import ModalLayout from "@/components/layouts/ModalLayout";
import { useRouter } from "next/router";
import { EventStatusEnum, IEvent } from "@/features/slices/event/eventInterface";
import {
	useAlert,
	useAuthenticatedAdminPermissions,
} from "@/contexts/ApplicationContext";
import { DefinedAdminPermissions } from "@/common/base.constant";
import { matchAdminPermissions } from "@/common/utility";
import CoventiButton from "@/components/Button";
import classnames from "classnames";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import ScheduleForm from "@/components/admin/ScheduleForm";

export default function Events(): JSX.Element {
	const { sendAlert, sendErrorAlert } = useAlert();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const adminPermissions = useAuthenticatedAdminPermissions();
	const {
		data: eventData,
		loading: isLoading,
		error,
	} = useAppSelector((state) => state.events);
	const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
	const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
	const [eventTypeModalIsOpen, setEventTypeModalIsOpen] = useState(false);
	const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

	let events = eventData?.events || [];
	const totalEvents = eventData?.totalEvents || 0;

	//Protected route
	useProtectedRoute();
	//Protected route

	const [paginatorData, setPaginatorData] = useState<{
		dataLength: number;
		dataPerPage: number;
		currentPage: number;
	}>({ dataLength: totalEvents, dataPerPage: 10, currentPage: 1 });

	useEffect(() => {
		if (error) {
			sendErrorAlert(error);
		}
	}, [error]);

	useEffect(() => {
		helpDispatchEvent();
	}, [paginatorData]);

	function onToEditEvent(eventId: string) {
		router.push("/admin/events/update/" + eventId);
	}

	function onSubmitUpdateEventStatus() {
		const event = events.find(event => event._id === selectedEvent?._id);
		if (selectedEvent?.status === event?.status) {
			sendAlert('Cannot update to same status', 'error');
			return;
		}
		updateEventStatus({ eventId: selectedEvent?._id!, status: selectedEvent?.status! })
			.then(response => {
				helpDispatchEvent();
				setStatusModalIsOpen(false);
				sendAlert(response.message);
			})
			.catch(error => sendErrorAlert(error));
	}

	// function onSubmitUpdateEventType(eventType: EventType) {
	// 	// 	const event = events.find(event => event._id === eventId)!;
	// 	// 	setSelectedEvent(event);
	// }

	// function onSubmitUpdateSchedule(eventType: EventType) {
	// 	// 	const event = events.find(event => event._id === eventId)!;
	// 	// 	setSelectedEvent(event);
	// }

	function onCopyStreamCredential(eventId: string) {
		getEventStreamData(eventId)
			.then((data) => {
				navigator.clipboard.writeText(JSON.stringify(data));
				sendAlert("Streaming information copied!");
			})
			.catch((error) => sendErrorAlert(error.message));
	}

	function helpSelectEvent(eventId: string) {
		setSelectedEvent(events.find((event) => event._id === eventId) || null);
	}


	function helpDispatchEvent() {
		dispatch(
			getEvents({
				data_per_page: paginatorData.dataPerPage,
				current_page: paginatorData.currentPage,
			})
		);
	}

	function adminIsPermitted(permission: string): boolean {
		return matchAdminPermissions({
			requiredPermissions: [permission],
			userPermissions: adminPermissions,
		});
	}



	function renderDeleteDialog() {
		return <DialogLayout
			parameters={{
				isOpened: deleteDialogIsOpen,
				buttons: {
					cancel: { color: "normal" },
					confirm: { text: "Delete", color: "danger" },
				},
			}}
			dialogResult={(result) => {
				setDeleteDialogIsOpen(false);
				// if (result.isConfirmed) {
				// 	console.log(result);
				// }
			}}
		>
			<div className="flex flex-col items-center">
				<ExclamationCircleIcon className="w-20 h-20 text-red-400" />
				<p className="mb-4 text-3xl font-semibold">Are you sure?</p>
				<p className="mb-2 text-base text-center">
					Do you really want to delete this event? This action cannot be
					reversed.
				</p>
			</div>
		</DialogLayout>
	}


	function renderStatusUpdateModal() {
		return <ModalLayout
			parameters={{
				isOpened: statusModalIsOpen,
				title: "Update event status",
			}}
			modalResult={(result) => {
				setStatusModalIsOpen(false);
				setSelectedEvent(null);
			}}
		>
			<>

				<div className="mb-6 py-4">
					<span className="text-sm text-gray-400">Event status</span>
					<div className="grid grid-cols-12 gap-2 mt-1">
						<div className="xs:col-span-12 sm:col-span-4">
							<input
								type="radio"
								onClick={e => {
									setSelectedEvent(initialValue => {
										return {
											...initialValue!,
											status: EventStatusEnum.UPCOMING
										}
									})
								}}
								id={EventStatusEnum.UPCOMING}
								value={EventStatusEnum.UPCOMING}
								className="w-5 h-5"
								hidden
							/>
							<label
								htmlFor={EventStatusEnum.UPCOMING}
								className={classnames(
									"block w-full px-4 py-1 rounded-full focus:outline-none border",
									{
										"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
											selectedEvent?.status !== EventStatusEnum.UPCOMING,
										"text-coventi border-white ring-2 ring-coventi-500":
											selectedEvent?.status === EventStatusEnum.UPCOMING,
									}
								)}
							>
								<div className="flex items-center justify-between">
									<p className="capitalize">{EventStatusEnum.UPCOMING}</p>
									{selectedEvent?.status === EventStatusEnum.UPCOMING && <p>
										<CheckBadgeIcon className="w-4 h-4" />
									</p>}
								</div>
							</label>
						</div>

						<div className="xs:col-span-12 sm:col-span-4">
							<input
								type="radio"
								onClick={e => {
									setSelectedEvent(initialValue => {
										return {
											...initialValue!,
											status: EventStatusEnum.LIVE
										}
									})
								}}
								id={EventStatusEnum.LIVE}
								value={EventStatusEnum.LIVE}
								className="w-5 h-5"
								hidden
							/>
							<label
								htmlFor={EventStatusEnum.LIVE}
								className={classnames(
									"block w-full px-4 py-1 rounded-full focus:outline-none border",
									{
										"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
											selectedEvent?.status !== EventStatusEnum.LIVE,
										"text-coventi border-white ring-2 ring-coventi-500":
											selectedEvent?.status === EventStatusEnum.LIVE,
									}
								)}
							>
								<div className="flex items-center justify-between">
									<p className="capitalize">{EventStatusEnum.LIVE}</p>
									{selectedEvent?.status === EventStatusEnum.LIVE && <p>
										<CheckBadgeIcon className="w-4 h-4" />
									</p>}
								</div>
							</label>
						</div>

						<div className="xs:col-span-12 sm:col-span-4">
							<input
								type="radio"
								onClick={e => {
									setSelectedEvent(initialValue => {
										return {
											...initialValue!,
											status: EventStatusEnum.PAST
										}
									})
								}}
								id={EventStatusEnum.PAST}
								value={EventStatusEnum.PAST}
								className="w-5 h-5"
								hidden
							/>
							<label
								htmlFor={EventStatusEnum.PAST}
								className={classnames(
									"block w-full px-4 py-1 rounded-full focus:outline-none border",
									{
										"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
											selectedEvent?.status !== EventStatusEnum.PAST,
										"text-coventi border-white ring-2 ring-coventi-500":
											selectedEvent?.status === EventStatusEnum.PAST,
									}
								)}
							>
								<div className="flex items-center justify-between">
									<p className="capitalize">{EventStatusEnum.PAST}</p>
									{selectedEvent?.status === EventStatusEnum.PAST && <p>
										<CheckBadgeIcon className="w-4 h-4" />
									</p>}
								</div>
							</label>
						</div>
					</div>
				</div>
				<CoventiButton onClick={() => onSubmitUpdateEventStatus()} text="Submit" className="w-full" />
			</>
		</ModalLayout>
	}

	function renderEventTypeUpdateModal() {
		return <ModalLayout
			parameters={{
				isOpened: eventTypeModalIsOpen,
				title: "Update event type",
			}}
			modalResult={(result) => {
				setEventTypeModalIsOpen(false);
				setSelectedEvent(null);
			}}
		>
			<>
				<div className="mb-6">
					<span className="text-sm text-gray-400">Event type</span>
					<div className="grid grid-cols-12 gap-2 mt-1">
						<div className="xs:col-span-12 sm:col-span-4">
							<input
								type="radio"
								id={EventStatusEnum.UPCOMING}
								value={EventStatusEnum.UPCOMING}
								className="w-5 h-5"
								hidden
							/>
							<label
								htmlFor={EventStatusEnum.UPCOMING}
								className={classnames(
									"block w-full px-4 py-1 rounded-full focus:outline-none border"
									// {
									// 	"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
									// 		eventTypeWatch !== EventTypeEnum.LIVE_STREAM,
									// 	"text-coventi border-white ring-2 ring-coventi-500":
									// 		eventTypeWatch === EventTypeEnum.LIVE_STREAM,
									// }
								)}
							>
								<div className="flex items-center justify-between">
									<p className="capitalize">{EventStatusEnum.UPCOMING}</p>
									{/* {eventTypeWatch === EventStatusEnum.LIVE && (
													<p>
														<CheckBadgeIcon className="w-4 h-4" />
													</p>
												)} */}
								</div>
							</label>
						</div>

						<div className="xs:col-span-12 sm:col-span-4">
							<input
								type="radio"
								id={EventStatusEnum.LIVE}
								value={EventStatusEnum.LIVE}
								className="w-5 h-5"
								hidden
							/>
							<label
								htmlFor={EventStatusEnum.LIVE}
								className={classnames(
									"block w-full px-4 py-1 rounded-full focus:outline-none border"
									// {
									// 	"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
									// 		eventTypeWatch !== EventStatusEnum.LIVE,
									// 	"text-coventi border-white ring-2 ring-coventi-500":
									// 		eventTypeWatch === EventTypeEnum.ON_DEMAND,
									// }
								)}
							>
								<div className="flex items-center justify-between">
									<p className="capitalize">{EventStatusEnum.LIVE}</p>
									{/* {eventTypeWatch === EventStatusEnum.PAST && (
													<p>
														<CheckBadgeIcon className="w-4 h-4" />
													</p>
												)} */}
								</div>
							</label>
						</div>

						<div className="xs:col-span-12 sm:col-span-4">
							<input
								type="radio"
								id={EventStatusEnum.PAST}
								value={EventStatusEnum.PAST}
								className="w-5 h-5"
								hidden
							/>
							<label
								htmlFor={EventStatusEnum.PAST}
								className={classnames(
									"block w-full px-4 py-1 rounded-full focus:outline-none border"
									// {
									// 	"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
									// 		eventTypeWatch !== EventTypeEnum.THIRD_PARTY,
									// 	"text-coventi border-white ring-2 ring-coventi-500":
									// 		eventTypeWatch === EventTypeEnum.THIRD_PARTY,
									// }
								)}
							>
								<div className="flex items-center justify-between">
									<p className="capitalize">{EventStatusEnum.PAST}</p>
									{/* {eventTypeWatch === EventTypeEnum.THIRD_PARTY && (
													<p>
														<CheckBadgeIcon className="w-4 h-4" />
													</p>
												)} */}
								</div>
							</label>
						</div>
					</div>

					{/* {errors.type?.type === "required" && (
									<p className="mt-1 text-xs text-red-500">{errors.type?.message}</p>
								)} */}
				</div>
				<CoventiButton text="Submit" className="w-full" size="small" />
			</>
		</ModalLayout>
	}

	function renderScheduleUpdateModal() {
		return <ModalLayout
			parameters={{
				isOpened: scheduleModalIsOpen,
				// size: 'medium',
				title: "Update schedule"
			}}
			modalResult={(result) => {
				setScheduleModalIsOpen(false);
				setSelectedEvent(null);
			}}
		>
			<div className="py-3">
				<ScheduleForm key={Math.random()} isInEditMode={true} eventId={selectedEvent && selectedEvent._id!} closeForm={() => {
					setScheduleModalIsOpen(false);
					setSelectedEvent(null);
					helpDispatchEvent();
				}} initialSchedules={selectedEvent && selectedEvent.schedules || []} />
			</div>
		</ModalLayout>
	}

	return (
		<>
			<AdminLayout>
				<>
					{renderDeleteDialog()}
					{renderStatusUpdateModal()}
					{renderScheduleUpdateModal()}
					{renderEventTypeUpdateModal()}

					<div className="flex justify-between pt-5 mb-6">
						<AdminBreadcrump breadcrumbDatas={[{ name: "Events" }]} />
						{adminIsPermitted(DefinedAdminPermissions.event.add) && (
							<CoventiButton
								url="events/create"
								text="Create Event"
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
							<div className="col-span-4">
								<p className="font-semibold">Event name</p>
							</div>
							<div className="col-span-2">
								<p className="font-semibold">Event type</p>
							</div>
							<div className="col-span-2">
								<p className="font-semibold">Added date</p>
							</div>
							<div className="col-span-1">
								<p className="font-semibold">Schedules</p>
							</div>
							<div className="col-span-1">
								<p className="font-semibold">Status</p>
							</div>
							<div className="col-span-1">
								<p className="font-semibold">Amount</p>
							</div>
							<div className="col-span-1">
								<p className="font-semibold text-center">Action</p>
							</div>
						</div>
						<hr />

						{isLoading && events.length === 0 && (
							<div className="py-20">
								<AppLoader />
							</div>
						)}
						{!isLoading && events.length === 0 && <Empty />}

						{events.length > 0 &&
							events.map((event) => {
								return (
									<div key={Math.random()}>
										<div className="grid grid-cols-12 gap-4 px-2 hover:bg-gray-50">
											<div className="col-span-4 py-3">
												<p className="capitalize truncate">{event.name}</p>
											</div>
											<div className="col-span-2 py-3 capitalize">
												{event.type}
											</div>
											<div className="col-span-2 py-3">{event.dateCreated}</div>
											<div className="col-span-1 py-3">
												{event.schedules.length}
											</div>
											<div className="col-span-1 py-3 capitalize">
												{event.status}
											</div>
											<div className="col-span-1 py-3">{event.amount}</div>
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
													{adminIsPermitted(
														DefinedAdminPermissions.event.edit
													) && (
															<MenuItem
																onClick={() => onToEditEvent(event.referenceId)}
																className="hover:bg-blue-50 hover:text-blue-500"
															>
																<div className="py-1">Edit</div>
															</MenuItem>
														)}
													<hr />
													{adminIsPermitted(
														DefinedAdminPermissions.event.edit
													) && <MenuItem
														onClick={() => {
															helpSelectEvent(event._id!);
															setEventTypeModalIsOpen(true);
														}}
														className="hover:bg-blue-50 hover:text-blue-500"
													>
															<div className="py-1">Update type</div>
														</MenuItem>}
													<hr />
													{adminIsPermitted(
														DefinedAdminPermissions.event.edit
													) && (
															<MenuItem
																onClick={() => {
																	helpSelectEvent(event._id!);
																	setScheduleModalIsOpen(true);
																}}
																className="hover:bg-blue-50 hover:text-blue-500"
															>
																<div className="py-1">
																	Update schedules
																</div>
															</MenuItem>
														)}
													<hr />
													{((event.streamData && Object.keys.length > 0) && event.status === EventStatusEnum.LIVE) && <MenuItem
														onClick={() => onCopyStreamCredential(event._id!)}
														className="hover:bg-blue-50 hover:text-blue-500"
													>
														<div className="py-1">Copy stream details</div>
													</MenuItem>}
													<hr />
													{adminIsPermitted(
														DefinedAdminPermissions.event.delete
													) && (
															<MenuItem
																onClick={() => setDeleteDialogIsOpen(true)}
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
						dataLength={totalEvents}
						currentPage={paginatorData.currentPage}
						dataPerPage={paginatorData.dataPerPage}
						onChangePage={(data) => setPaginatorData(data)}
					/>
				</>
			</AdminLayout>
		</>
	);
}
