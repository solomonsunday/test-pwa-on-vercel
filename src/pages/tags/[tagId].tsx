import EventCard from '@/components/EventCard';
import Footer from '@/components/Footer';
import { IEvent } from '@/features/slices/event/eventInterface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

export default function TagEvents() {
	const router = useRouter();
	const [events, setEvents] = useState<IEvent[]>([]);
	const tagId = (router.query?.tagId as string)?.toLowerCase() || null;

	useEffect(() => {
		if (tagId) { helpFetchEvents(); }
	}, [])

	function helpFetchEvents() {
		setEvents([])

	}


	return (
		<>

			{/* <NextSeo
				title="Reset password - Coventi"
				openGraph={
					{
						url: 'https://coventi.co/login',
						title: 'Login - Coventi'
					}
				}
			/> */}

			<div className='pt-20'>
				<div className="grid grid-cols-12 gap-4">
					{events.map((event) => {
						return <div key={Math.random()} className="xs:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
							<EventCard event={event} />
						</div>;
					})}
				</div>
			</div>

			<Footer />
		</>

	)
}
