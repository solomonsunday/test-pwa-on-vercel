import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import React from "react";

import AdminLayout from "@/components/layouts/AdminLayout";
import RightModal from "@/components/layouts/right-modal";
import AdminBreadcrump from "@/components/admin/BreadCrump";
import { useOnClickOutside } from "@/hooks/useClickOutside";

const users = [
	{
		customerName: "Solomon Sunday",
		eventName: "Chike Beach Party",
		paymentRef: "schinoyerem007@gmail.com",
		dateTime: "22/03/2033 12 00 PM",
	},
	{
		customerName: "Corlineous Okafor",
		eventName: "Okafor's Law",
		paymentRef: "PA456478",
		dateTime: "22/03/2033 12 00 PM",
	},
	{
		customerName: "Davides",
		eventName: "Adewale",
		paymentRef: "PA456470",
		dateTime: "22/03/2033 12 00 PM",
	},
	{
		customerName: "Kunle",
		eventName: "Ajayi",
		paymentRef: "PA456478",
		dateTime: "22/03/2033 12 00 PM",
	},
	{
		customerName: "Genevive",
		eventName: "Ugama",
		paymentRef: "PA476478",
		dateTime: "22/03/2033 12 00 PM",
	},
	{
		customerName: "Anna",
		eventName: "Okerere",
		paymentRef: "PA456478",
		dateTime: "22/03/2033 12 00 PM",
	},
];

export default function Payment() {
	const [paymentContent] = useState<boolean>(true);
	const ref = useRef(null);
	const [showRightModal, setShowRightModal] = useState<boolean>(false);
	const toggleRightBar = () => {
		setShowRightModal(!showRightModal);
	};
	useOnClickOutside(ref, () => setShowRightModal(false));

	return (
		<>
			<div ref={ref}>
				{showRightModal && <RightModal paymentContent={paymentContent} />}{" "}
			</div>
			<AdminLayout>
				<div className="">
					<div className="flex items-center justify-between mb-10">
						<AdminBreadcrump breadcrumbDatas={[{ name: "Payments" }]} />

						<div className="flex items-center">
							<button className="px-3 py-3 text-white bg-blue-500 border border-blue-300 rounded-full md:px-5 hover:bg-blue-300 ">
								Assign Ticket
							</button>
						</div>
					</div>
					<div className="mb-4">
						<input
							type="text"
							className="px-3 py-2 bg-transparent border rounded-md w-72 placeholder:text-slate-400 border-slate-300 focus:outline-none focus:border-blue-300"
							placeholder="Search"
						/>
					</div>
					<div className="pb-32 overflow-auto rounded-lg">
						<table className="w-full">
							<thead className="border-b border-b-gray-400 borer">
								<tr className="">
									<th className="p-3 text-sm font-semibold tracking-wide text-left">
										Customer Name
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
								{users &&
									users.length > 0 &&
									users.map((item, idx) => {
										return (
											<tr className="" key={idx}>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{item.customerName}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{" "}
													{item.eventName}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{item.paymentRef}{" "}
												</td>
												<td className="p-2 text-sm text-gray-700 whitespace-nowrap">
													{item.dateTime}{" "}
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
																					Edit Permission
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
																							? "bg-gray-200 text-white"
																							: "text-gray-900"
																						} group flex w-full items-center rounded-md px-2 py-2 text-sm  text-red-500`}
																				>
																					Remove User
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
						{users.length === 0 && (
							<div className="flex items-center justify-center w-full my-36">
								<div className="flex flex-col items-center justify-center px-auto">
									<div className="">
										<img src="/assets/images/user.svg" alt="user" />
									</div>
									<div className="mt-6 text-center">
										<p className="text-lg font-semibold">
											You payment made yet
										</p>
										<p>
											Your user's payment will apear here when they have one
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</AdminLayout>
		</>
	);
}
