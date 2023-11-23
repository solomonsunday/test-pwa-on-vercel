import AppLoader from "@/components/Reusable/AppLoader";
import EventCard from "@/components/EventCard";
import { getEventNoRedux } from "@/features/slices/event/eventAction";
import React, { useEffect, useState } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { useRouter } from "next/router";
import { EventStatusEnum, EventStatusType, EventType, EventTypeEnum, IEvent } from "@/features/slices/event/eventInterface";
import Footer from "@/components/Footer";
import Capsule from "@/components/Capsule";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAlert } from "@/contexts/ApplicationContext";
import { NextSeo } from "next-seo";

export default function Events() {
	const router = useRouter();
	const query = router.query;
	const { sendErrorAlert } = useAlert();
	const loading = false;
	const [fetchedEvents, setFetchedEvents] = useState<IEvent[]>([]);
	const [events, setEvents] = useState<IEvent[]>([]);
	const [option, setOption] = useState<EventStatusType | EventType | null>(null);
	const [search, setSearch] = useState<string | null>(null);
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);


	useEffect(() => {
		helpSetEvents();
		helpFilterEvents(query.option as any, query.search as string);
	}, []);


	useEffect(() => {
		setOption(query.option! as any);
		setSearch(query.search! as string);
		helpFilterEvents(query.option as any, query.search as string);
	}, [fetchedEvents, query]);


	function helpSetEvents() {
		getEventNoRedux({})
			.then(eventsData => {
				setFetchedEvents(eventsData.events || [])
				setEvents(eventsData.events || [])
			})
			.catch(error => sendErrorAlert(error));
	}


	function helpFilterEvents(selectedOption: EventStatusType | EventType, searchTerm: string) {
		if (fetchedEvents.length < 1) return;
		let filteredEvents: IEvent[] = [];

		if (!selectedOption) {
			filteredEvents = fetchedEvents;
		}

		if (selectedOption && selectedOption !== EventTypeEnum.ON_DEMAND) {
			filteredEvents = fetchedEvents.filter(event => event.status === selectedOption);
		}
		if (selectedOption && selectedOption === EventTypeEnum.ON_DEMAND) {
			filteredEvents = fetchedEvents.filter(event => event.type === selectedOption);
		}

		if (searchTerm) {
			filteredEvents = filteredEvents.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		setEvents(filteredEvents);
	}

	function onSetRouteQuery(selectedOption?: EventStatusType | EventType | null) {
		let presentPathname = router.pathname;
		if (!selectedOption) {
			router.push(search ? `${presentPathname}?search=${search}` : presentPathname);
			return;
		}

		router.push(search ? `${presentPathname}?option=${selectedOption}&search=${search}` : `${presentPathname}?option=${selectedOption}`);
	}


	function handleSearchTerm(event: any) {
		const searchTerm = (event.target.value as string).trim();
		// if (!searchTerm || searchTerm === '' || searchTerm === ' ' || searchTerm === 'undefined') {
		// 	return;
		// }
		clearTimeout(searchTimeout!);
		const timeOut = setTimeout(() => {
			setSearch(searchTerm);
			const filteredEvents = events.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
			setEvents(filteredEvents);
			router.push(option ? `${router.pathname}?option=${option}&search=${searchTerm}` : `${router.pathname}?search=${searchTerm}`);
		}, 1400);
		setSearchTimeout(timeOut);
	}

	return (
		<>
			<NextSeo
				title='Events - Coventi'
				description="Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!" openGraph={
					{
						url: 'https://coventi.co/events',
						title: 'Events - Coventi',
						description: "Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
					}
				}
			/>

			<UserLayout className="container mx-auto">
				<>
					<div className="flex flex-col items-center justify-center">
						<h5 className="text-4xl font-bold mb-10 text-black capitalize">{option} events</h5>
						<div className="container max-w-md mx-auto mb-4">

							<div className="flex items-center gap-4 mb-6 w-full border border-slate-300 rounded-full px-4 py-2">
								<MagnifyingGlassIcon className="h-5 w-5" />
								<input id="search" type='text' placeholder={`Search for ${option || 'all'} events`} onKeyUp={handleSearchTerm} defaultValue={search!} className="py-1 focus:outline-none grow" />
								{search && <XMarkIcon onClick={() => {
									router.push(option ? `${router.pathname}?option=${option}` : router.pathname);
									(document.getElementById('search') as HTMLInputElement).value = '';
									setSearch(null);
								}} className="h-5 w-5 hover:text-red-500 cursor-pointer" />}
							</div>

							<div className="flex flex-wrap items-center justify-center gap-4">
								<Capsule isSelected={!option} onClick={() => onSetRouteQuery(null)} textContent="All" />
								<Capsule isSelected={option === EventStatusEnum.UPCOMING} onClick={() => onSetRouteQuery(EventStatusEnum.UPCOMING)} textContent="Upcoming" />
								<Capsule isSelected={option === EventStatusEnum.LIVE} onClick={() => onSetRouteQuery(EventStatusEnum.LIVE)} textContent="Live" />
								<Capsule isSelected={option === EventTypeEnum.ON_DEMAND} onClick={() => onSetRouteQuery(EventTypeEnum.ON_DEMAND)} textContent="On-demand" />
								<Capsule isSelected={option === EventStatusEnum.PAST} onClick={() => onSetRouteQuery(EventStatusEnum.PAST)} textContent="Past" />
							</div>

						</div>
					</div>
					{/* Event gallary */}
					<div className="flex items-center justify-center mb-60 md:px-0">
						{loading ? (
							<AppLoader />
						) : events?.length ? (
							<div className="grid items-center grid-cols-1 mt-20 space-y-5 md:gap-6 md:grid-cols-4 md:space-y-0">
								{events.map((item) => {
									return (
										<EventCard
											key={Math.random()}
											event={item}
											isFullCard={true}
										/>
									);
								})}
							</div>
						) : (
							<div className="pt-10 font-bold">
								No event found, please check back later
							</div>
						)}
					</div>
				</>
			</UserLayout>
			<Footer />
		</>
	);
}
