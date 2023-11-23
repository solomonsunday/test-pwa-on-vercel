import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getOneEvent } from "@/features/slices/event/eventAction";
import { IEvent } from "@/features/slices/event/eventInterface";
import { parsePricing, toTitleCase } from "@/common/utility";
import EventTag from "@/components/EventTag";
import {
	useAlert,
	useUserIsAuthenticated,
} from "@/contexts/ApplicationContext";
import { requestPayment } from "@/features/slices/payment/paymentAction";
import CoventiButton from "@/components/Button";
import { getTicketPaidFor } from "@/features/slices/ticket/ticketAction";
import ScheduleCard from "@/components/ScheduleCard";
import Footer from "@/components/Footer";
import { NextSeo } from "next-seo";

// type Props = {
// 	params: { eventId: string }
// 	searchParams: { [key: string]: string | string[] | undefined }
// }

// export async function generateMetadata(
// 	{ params, searchParams }: Props,
// 	parent: ResolvingMetadata
// ): Promise<Metadata> {
// 	// read route params
// 	const eventId = params.eventId;
// 	if (!eventId) {

// }
// 	const event = await getOneEvent({ eventId });
// 	// fetch data
// 	const product = await fstch(`https://.../${id}`).then((res) => res.json())

// 	// optionally access and extend (rather than replace) parent metadata
// 	const previousImages = (await parent).openGraph?.images || []

// 	return {
// 		title: product.title,
// 		openGraph: {
// 			images: ['/some-specific-page-image.jpg', ...previousImages],
// 		},
// 	}
// }



export default function EventsDetailsPage() {
	const router = useRouter();
	const { sendAlert, sendErrorAlert } = useAlert();
	const isAuthenticated = useUserIsAuthenticated()!;
	const eventId = (router.query?.eventId as string)?.toLowerCase() || null;
	const [event, setEvent] = useState<IEvent | null>(null);
	const [loading, setLoading] = useState(false);
	const [isTicketPaidFor, setIsTicketPaidFor] = useState(false);

	useEffect(() => {
		fetchOneEvent();
	}, [eventId]);

	async function fetchOneEvent() {
		if (eventId) {
			getOneEvent({ eventId })
				.then((event) => {
					setEvent(event);
					helpFetchTicket(event);
				})
				.catch((error) => sendErrorAlert(error));
		}
	}

	async function helpFetchTicket(event: IEvent) {
		if (!isAuthenticated) {
			return;
		}
		try {
			const res = await getTicketPaidFor(event._id!);
			setIsTicketPaidFor(res.length > 0);
		} catch (error) {
			sendErrorAlert(error);
		}
	}

	async function helpMakePayment(eventId: string) {
		setLoading(true);
		try {
			const response = await requestPayment(eventId);
			if (event?.amount! > 0) {
				window.location.href = response.data.link;
			} else {
				sendAlert(response.message);
			}
			setLoading(false);
		} catch (error) {
			sendErrorAlert(error);
			setLoading(false);
		}
	}

	function handleEventButton() {
		// If the user is authenticated, check whether they have already paid for this ticket or not and
		if (!isAuthenticated) {
			const presentUrl = router.asPath;
			return router.push("/login" + "?redirect_url=" + presentUrl);
		}

		if (isAuthenticated && !isTicketPaidFor) {
			localStorage.setItem("eventId", event?._id!);
			helpMakePayment(event?._id!);
			return;
		}
		if (isTicketPaidFor) {
			return router.push(`/events/watch/${event?._id}`);
		}
	}

	return (
		<>

			<NextSeo
				title={toTitleCase(event?.name)}
				description={event?.summary}
				openGraph={
					{
						url: `https://coventi.co/events/${eventId}`,
						title: toTitleCase(event?.name),
						description: event?.summary,
						// images: [
						// 	{ url: event?.media.display || ' ', alt: event?.name || ' ' },
						// 	{ url: event?.media.cover || ' ', alt: event?.name || ' ' }
						// ],
						siteName: 'Coventi'
					}
				}
			/>

			<div className="bg-orange-100 container-full xs:pt-24 sm:pt-20 md:pt-28 lg:pt-24 ">
				<div className="container mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl xs:mb-3 md:mb-8 xs:px-4">
					<div className="flex items-center justify-between">
						<h2 className="font-semibold text-gray-700 capitalize xs:text-2xl md:text-4xl xs:truncate">
							{event ? event.name : ""}
						</h2>
						<CoventiButton
							className="px-10 py-3 xs:py-2 xs:px-7"
							text={
								event && event.amount < 0
									? "Get event"
									: loading
										? "Loading..."
										: isTicketPaidFor
											? "Watch Event"
											: "Buy event"
							}
							onClick={handleEventButton}
						/>
					</div>
				</div>
				<div className="container mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl xs:px-4">
					<Image
						className="object-contain mb-10 rounded-xl"
						src={event ? event?.media.cover : ""}
						alt={event?.name || " "}
						width="2000"
						height="1000"
					/>
				</div>
			</div>
			<div className="container pb-10 mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl xs:px-4">
				<h5 className="mb-1 text-xl font-semibold">About event</h5>
				<div
					className="mb-8"
					dangerouslySetInnerHTML={{ __html: event ? event?.description : "" }}
				></div>
				<h5 className="mb-1 text-xl font-semibold">Schedules</h5>
				<div className="mb-8 md:w-5/12">
					{event &&
						event.schedules.map((schedule) => (
							<ScheduleCard
								className="mb-2"
								key={Math.random()}
								showStatus
								isForPublic
								schedule={schedule}
							/>
						))}
				</div>
				<div className="flex items-center">
					<div>
						<h5 className="mb-1 text-xl font-semibold">Ticket price</h5>
						<p className="mb-8 text-base text-slate-500">
							{parsePricing(event)}
						</p>
					</div>
					<div className="ml-20">
						<CoventiButton
							className="px-8 py-1 xs:py-2 xs:px-7"
							text={
								event && event.amount < 0
									? "Get event"
									: loading
										? "Loading"
										: isTicketPaidFor
											? "Watch Event"
											: "Buy event"
							}
							onClick={handleEventButton}
						/>
					</div>
				</div>
				<h5 className="mb-2 text-xl font-semibold">Tags</h5>
				<div className="flex flex-wrap">
					{event &&
						event.tags.map((tag) => (
							<EventTag isClickable={false} key={Math.random()} tag={tag} />
						))}
				</div>
			</div>
			<Footer />
		</>
	);
}
