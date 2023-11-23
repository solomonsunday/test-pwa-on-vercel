import Link from 'next/link';
// import { useState } from 'react';

export default function MerchCard({ merch }: { merch?: any; }): JSX.Element {
	// const [isMobileView, setIsMobileView] = useState(false);

	return (
		<div className='rounded-xl bg-cover bg-[url(https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg)] text-gray-200'>
			<div className="hover:bg-black hover:bg-opacity-60 opacity-0 hover:opacity-100 duration-700 h-full w-full py-24 text-center">
				<div className="mb-4 px-2">
					<h2 className="text-2xl">Lorem ipsum dolor sit amet conse.</h2>
				</div>
				<div className="mb-8 px-4">
					<p className="font-thin">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis labore porro perferendis culpa illum obcaecati veniam blanditiis</p>
				</div>
				<Link href={'/mersh'}>
					<button className="bg-coventi-500 hover:bg-blue-600 active:bg-blue-700 text-white px-10 py-2 rounded-full">Buy</button>
				</Link>
			</div>
			<div className='bg-black lg:hidden bg-opacity-60 items-center justify-between flex py-2 gap-4 px-4 rounded-b-lg flex'>
				<p className='truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
				<Link href={'/mersh'}>
					<button className='bg-indigo-500 py-1 px-5 rounded-lg'>Buy</button>
				</Link>
			</div>
		</div>
	)
}