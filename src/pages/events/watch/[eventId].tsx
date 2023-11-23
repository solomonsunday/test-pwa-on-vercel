import EventCard from "@/components/EventCard";
import Chat from "@/components/chat/Chat";
import {
	getEvents,
	getOneEvent,
	getEventStreamData
} from "@/features/slices/event/eventAction";
import {
	EventStatusEnum,
	// IApiVideoLiveStream,
	IEvent,
} from "@/features/slices/event/eventInterface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";

import useProtectedRoute from "@/hooks/useProtectedRoute";
import { useRouter } from "next/router";
import { useAlert } from "@/contexts/ApplicationContext";
import { confirmTicketOwner } from "@/features/services/eventService";
import ApiVideoPlayer from "@api.video/react-player";
import { Spinner } from "@/components/Reusable";
import Footer from "@/components/Footer";
import { toTitleCase } from "@/common/utility";
import { NextSeo } from "next-seo";

const LiveVideo = () => {
	const dispatch = useAppDispatch();
	const { sendErrorAlert } = useAlert();
	const events = useAppSelector((state) => state.events.data?.events) || [];
	const [isTheaterMode] = useState<boolean>(false);
	const [eventStatus, setEventStatus] = useState(false);
	const [streamData, setStreamData] = useState<any>();
	const [eventDetails, setEventDetails] = useState<IEvent | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const imageCover = eventDetails?.media?.cover;

	//Protected route
	const loading = useProtectedRoute();
	console.log(loading);
	//Protected route

	const router = useRouter();

	const eventId = router.query?.eventId as string;
	console.log(streamData, "streamData");

	useEffect(() => {
		helpConfirmTicket();
	}, [eventId]);

	//   This function get the stream data where you can find the video id.
	useEffect(() => {
		if (eventId) {
			getEventStreamData(eventId)
				.then((data) => { setStreamData(data); })
				.catch((error) => sendErrorAlert(error.message));
		}
	}, [eventId]);

	async function helpConfirmTicket() {
		try {
			if (eventId) {
				let res = await confirmTicketOwner({ eventId } as any);
				let ticketArray: any = res?.data;
				let ticketArraySize = ticketArray.tickets;
				if (ticketArraySize.length === 0) {
					return router.push(`/events/${eventId}`);
				}
			}
		} catch (error) {
			sendErrorAlert(error);
		}
	}

	useEffect(() => {
		fetchOneEvent();
	}, [eventId]);

	useEffect(() => {
		if (eventDetails?.status === "live") {
			setEventStatus(true);
		} else {
			setEventStatus(false);
		}
	}, [eventDetails]);

	async function fetchOneEvent() {
		if (eventId) {
			setIsLoading(true);
			const fetchedEvent = await getOneEvent({ eventId } as any);
			if (fetchedEvent) {
				setEventDetails(fetchedEvent);
				setIsLoading(false);
			}
		}
	}

	useEffect(() => {
		dispatch(getEvents({}));
	}, []);

	return (
		<>


			<NextSeo
				title={'Watch' + toTitleCase(eventDetails?.name) + '- Coventi'}
				description={eventDetails?.summary}
				openGraph={
					{
						url: `https://coventi.co/events/watch/${eventId}`,
						title: `Watch ${toTitleCase(eventDetails?.name)} - Coventi`,
						description: eventDetails?.summary,
						// images: [
						// 	{ url: event?.media.display || ' ', alt: event?.name || ' ' },
						// 	{ url: event?.media.cover || ' ', alt: event?.name || ' ' }
						// ],
						siteName: 'Coventi'
					}
				}
			/>

			<main className="container pt-5 mx-auto xs:pt-1">
				<div className="relative grid-cols-4 gap-4 px-1 mt-32 mb-4 md:grid md:flex-row md:px-0">
					<div
						className={`${isTheaterMode ? "col-span-4" : "md:col-span-3 col-span-4"
							}`}
					>
						{/*See documentation for more details => https://www.npmjs.com/package/@api.video/react-player#installation */}
						{/* https://github.com/apivideo/api.video-react-player */}
						{/* We want a One time video */}
						{isLoading ? (
							<Spinner color="blue" height={5} width={30} />
						) : eventStatus ? (
							<ApiVideoPlayer
								video={{
									id: streamData?.liveStreamId!,
									// id: "vi5fv44Hol1jFrCovyktAJS8",
									live: eventStatus,
									token: "", //TODO: add the event token here to prevent multiple user from watching the event at a time.
								}}
								responsive={true}
								autoplay={true}
							/>
						) : (
							<>
								<div
									className="flex items-center justify-center"
									style={{
										backgroundImage: `url(${imageCover})`,
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										height: "65vh",
										borderRadius: "15px",
									}}
								>
									<div className="p-10 text-center rounded-lg shadow-md h-28 justify-items-center w-60 bg-slate-100">
										<p className="text-xl font-extrabold text-blue-500">
											Starting Soon
										</p>
									</div>
								</div>
							</>
						)}
					</div>
					{/* Chat section */}
					<div>{!isTheaterMode && <Chat />} </div>
				</div>
				<section className="gap-5 md:grid md:grid-cols-4">
					<div className="space-y-10 md:col-span-3">
						<div className="px-2 md:px-0">
							<h3 className="mb-2 text-3xl capitalize">{eventDetails?.name}</h3>
							<div
								className="mb-8"
								dangerouslySetInnerHTML={{
									__html: eventDetails ? eventDetails?.description : "",
								}}
							></div>
						</div>
						<div className="hidden px-2 md:block md:px-0">
							<h3 className="mb-3 text-3xl font-bold">Recommended for you</h3>
							<div className="flex items-center justify-center md:space-x-10 md:justify-start md:flex-row">
								{events.map((item) => (
									<div key={Math.random()}>
										<EventCard status={EventStatusEnum.PAST} event={item} />
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="md:col-span-1">{isTheaterMode && <Chat />}</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default LiveVideo;
