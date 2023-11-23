import React from 'react'
import CoventiButton from './Button'

export default function HappeningNow() {
	return <div className="container mx-auto border border-slate-500 rounded-3xl xs:p-4 p-14 text-gray-200 bg-no-repeat h-full">
		<div className="flex items-center gap-2 mb-4">
			<span className="font-semibold mb-1 bg-red-600 py-1 rounded-lg xs:px-2 md:px-6">
				Live
			</span>
		</div>
		<div className="grid grid-cols-12 gap-4">
			<div className="xs:col-span-12 sm:col-span-6">
				<h2 className="text-3xl">Lorem ipsum dolor consectetur.</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum sapiente beatae autem recusandae aliquam fugiat est.</p>
			</div>
			<div className="xs:col-span-12 sm:col-span-6 text-right ">
				<CoventiButton className="px-10 text-right" text='Play video' />
			</div>
		</div>
	</div>
}
