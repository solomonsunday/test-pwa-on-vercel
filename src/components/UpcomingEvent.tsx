import { useAlert } from "@/contexts/ApplicationContext";
import { getHomeEvents } from "@/features/slices/event/eventAction";
import { EventStatusEnum, IEvent } from "@/features/slices/event/eventInterface";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect } from "react";

import EventCard from "./EventCard";

function UpcomingEvent({ events = [], isIndependent = false }: {
	events?: IEvent[];
	isIndependent?: boolean;
}): JSX.Element {
	const { sendErrorAlert } = useAlert();

	useEffect(() => {
		if (isIndependent) {
			helpSetUpcomingEvents();
		}
	}, []);

	function helpSetUpcomingEvents() {
		getHomeEvents()
			.then(eventss => { events = eventss.upcoming; })
			.catch(error => sendErrorAlert(error));
	}

	return (
		<div>
			<div className="container-full bg-stone-100">
				<div className="container mx-auto xs:px-2 md:px-6 lg:px-0 py-14">
					<div className="flex mb-8 text-slate-700 sm:items-center sm:justify-between xs:flex-col xs:gap-8">
						<h2 className="col-span-12 text-4xl font-semibold">
							Upcoming <span className="text-green-600">Events</span>
						</h2>
						<Link href={"/events?status=upcoming"}>
							<div className="flex">
								<p className="font-medium text-blue-500 underline sm:text-right">
									View all upcoming events
								</p>
								<p className="m-0">
									<ChevronRightIcon className="w-4 h-4 text-blue-500" />
								</p>
							</div>
						</Link>
					</div>
					<div className="grid grid-cols-12 gap-4">
						{events.map((event) => {
							return (
								<div
									key={Math.random()}
									className="xs:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
								>
									<EventCard event={event} status={EventStatusEnum.UPCOMING} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default UpcomingEvent;
