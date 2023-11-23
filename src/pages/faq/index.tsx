import { FC, useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getEvents } from "@/features/slices/event/eventAction";
import { EventStatusEnum } from "@/features/slices/event/eventInterface";
import { Disclosure } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Footer from "@/components/Footer";
import { NextSeo } from "next-seo";

const faqsDummy = [
	{
		question: "What is coventi?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec nulla urna. Pellentesque sodales quam vestibulum quam imperdiet, at blandit sapien egestas. Sed in sapien mattis, eleifend nunc in, posuere risus. Duis tincidunt dolor et eros iaculis, at porta ex elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam blandit est erat, eget faucibus quam consequat non. Nulla ultricies augue vel orci pharetra euismod. Mauris ultrices dui a diam cursus imperdiet. Morbi at tincidunt felis.",
		id: 1,
	},
	{
		question: "How can I buy a Ticket?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec nulla urna. Pellentesque sodales quam vestibulum quam imperdiet, at blandit sapien egestas. Sed in sapien mattis, eleifend nunc in, posuere risus. Duis tincidunt dolor et eros iaculis, at porta ex elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam blandit est erat, eget faucibus quam consequat non. Nulla ultricies augue vel orci pharetra euismod. Mauris ultrices dui a diam cursus imperdiet. Morbi at tincidunt felis.",
		id: 13,
	},
	{
		question: "Can I buy for a friend?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec nulla urna. Pellentesque sodales quam vestibulum quam imperdiet, at blandit sapien egestas. Sed in sapien mattis, eleifend nunc in, posuere risus. Duis tincidunt dolor et eros iaculis, at porta ex elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam blandit est erat, eget faucibus quam consequat non. Nulla ultricies augue vel orci pharetra euismod. Mauris ultrices dui a diam cursus imperdiet. Morbi at tincidunt felis.",
		id: 11,
	},
	{
		question: "Can I share my login?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec nulla urna. Pellentesque sodales quam vestibulum quam imperdiet, at blandit sapien egestas. Sed in sapien mattis, eleifend nunc in, posuere risus. Duis tincidunt dolor et eros iaculis, at porta ex elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam blandit est erat, eget faucibus quam consequat non. Nulla ultricies augue vel orci pharetra euismod. Mauris ultrices dui a diam cursus imperdiet. Morbi at tincidunt felis.",
		id: 91,
	},
	{
		question: "Can I login on multiple device?",
		answer:
			"Etiam ac quam nec ante efficitur consequat non a ante. Vestibulum non justo sit amet ante gravida venenatis. Etiam suscipit sem ut nunc placerat pulvinar vitae eget nibh. Donec fringilla dolor in placerat tristique. Nulla nec leo pretium, dignissim eros eget, pharetra eros. Sed eu turpis aliquam, volutpat mi nec, faucibus nisl. Etiam convallis eu elit vitae auctor.",
		id: 51,
	},
	{
		question: "Who can register on Coventi?",
		answer:
			"Etiam ac quam nec ante efficitur consequat non a ante. Vestibulum non justo sit amet ante gravida venenatis. Etiam suscipit sem ut nunc placerat pulvinar vitae eget nibh. Donec fringilla dolor in placerat tristique. Nulla nec leo pretium, dignissim eros eget, pharetra eros. Sed eu turpis aliquam, volutpat mi nec, faucibus nisl. Etiam convallis eu elit vitae auctor.",
		id: 8,
	},
	{
		question: "How many events can my ticket cover?",
		answer:
			"Etiam ac quam nec ante efficitur consequat non a ante. Vestibulum non justo sit amet ante gravida venenatis. Etiam suscipit sem ut nunc placerat pulvinar vitae eget nibh. Donec fringilla dolor in placerat tristique. Nulla nec leo pretium, dignissim eros eget, pharetra eros. Sed eu turpis aliquam, volutpat mi nec, faucibus nisl. Etiam convallis eu elit vitae auctor.",
		id: 9,
	},
	{
		question: "Is my Credit card secured?",
		answer:
			"Etiam ac quam nec ante efficitur consequat non a ante. Vestibulum non justo sit amet ante gravida venenatis. Etiam suscipit sem ut nunc placerat pulvinar vitae eget nibh. Donec fringilla dolor in placerat tristique. Nulla nec leo pretium, dignissim eros eget, pharetra eros. Sed eu turpis aliquam, volutpat mi nec, faucibus nisl. Etiam convallis eu elit vitae auctor.",
		id: 87,
	},
	{
		question: "What information do i need to resgister?",
		answer:
			"CEtiam ac quam nec ante efficitur consequat non a ante. Vestibulum non justo sit amet ante gravida venenatis. Etiam suscipit sem ut nunc placerat pulvinar vitae eget nibh. Donec fringilla dolor in placerat tristique. Nulla nec leo pretium, dignissim eros eget, pharetra eros. Sed eu turpis aliquam, volutpat mi nec, faucibus nisl. Etiam convallis eu elit vitae auctor.",
		id: 56,
	},
];

const Faq: FC = () => {
	const dispatch = useAppDispatch();

	const eventData = useAppSelector((state) => state.events.data);
	const events = eventData?.events || [];

	useEffect(() => {
		dispatch(getEvents({}));
	}, []);

	return (
		<>
			<NextSeo
				title="FAQ - Coventi"
				description="Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
				openGraph={
					{
						url: 'https://coventi.co/faq',
						title: 'FAQ - Coventi',
						description: "Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
					}
				}
			/>


			<div className="container px-3 mx-auto mb-10 space-y-10 py-14 md:space-y-20 md:px-0">
				<section className="mx-2 font-serif text-center md:mx-0 md:max-w-8xl">
					<h1 className="md:mt-12 lg:mt-28 mb-10 text-2xl text-[#200865]  font-bold md:text-7xl">
						Frequently asked questions
					</h1>
					<p className="max-w-2xl mx-auto text-lg">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et,
						necessitatibus expedita nam suscipit ducimus est aspernatur amet
					</p>
				</section>
				<section>
					<div className="w-full px-4 pt-16">
						<div className="w-full max-w-2xl p-2 mx-auto bg-white rounded-2xl">
							{faqsDummy.map((item, index) => (
								<div className="mb-5 ">
									<Disclosure key={index}>
										{({ open }: { open: boolean }) => (
											<>
												<Disclosure.Button className="flex w-full justify-between align-middle rounded-tr-lg rounded-tl-lg bg-[#F2F2F2] px-4 py-4 text-left text-2xl font-bold text-[#080055] hover:bg-[#e0dfdf] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
													<span>{item.question}</span>
													<PlusIcon
														className={`${open ? "rotate-45 transform" : ""
															} h-7 w-7 bg-[#1a338f88] rounded-full text-[#1A348F]`}
													/>
												</Disclosure.Button>
												<Disclosure.Panel className="px-4 mb-10  pt-4 pb-2 text-[16px] text-[#2C2B39] rounded-bl-lg rounded-br-lg bg-[#F2F2F2]">
													{item.answer}
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							))}
						</div>
					</div>
				</section>
				<h3 className="md:mt-12 mt-10 mb-10 text-2xl text-[#200865] text-center font-bold md:text-3xl">
					Still need help? Chat Us
				</h3>
			</div>
			<div className="container-full bg-stone-100">
				<div className="container mx-auto xs:px-2 md:px-6 lg:px-0 py-14">
					<div className="flex mb-8 text-slate-700 sm:items-center sm:justify-between xs:flex-col xs:gap-8">
						<h2 className="col-span-12 text-4xl font-semibold">
							Upcoming <span className="text-green-600">Events</span>
						</h2>
						<Link href="/events">
							<div className="flex">
								<p className="font-medium underline sm:text-right">
									View all upcoming events
								</p>
								<p className="m-0">
									<ChevronRightIcon className="w-4 h-4" />
								</p>
							</div>
						</Link>
					</div>
					<div className="grid grid-cols-12 gap-4">
						{events.map((event) => (
							<div
								key={event._id}
								className="xs:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
							>
								<EventCard event={event} status={EventStatusEnum.UPCOMING} />
							</div>
						))}
					</div>
				</div>
			</div>

			<Footer />

		</>
	);
};

export default Faq;
