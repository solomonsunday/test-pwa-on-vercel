import classnames from 'classnames';
import Link from 'next/link';
import React from 'react'

interface IBreadCrumpsProps {
	name: string;
	link?: string
}

export default function AdminBreadcrump({ breadcrumbDatas }: {
	breadcrumbDatas: IBreadCrumpsProps[];
}) {

	function renderSingleBreadcrump(): JSX.Element {
		return <h3 className='text-black text-3xl font-bold'>{breadcrumbDatas.at(0)?.name}</h3>
	}

	function renderMiltiBreadcrump(): JSX.Element {
		return <div className='flex'>{breadcrumbDatas.map((breadcrump, position) => {
			return <Link key={Math.random()} className={classnames("text-coventi", {
				'text-black cursor-text': position + 1 === breadcrumbDatas.length,
			})} href={breadcrump.link ? breadcrump.link : ''}>
				{position > 0 && < span className='text-black px-3' >/</span>
				}{breadcrump.name}
			</Link>
		})}</div>
	}

	// function renderMiltiBreadcrump(): JSX.Element {
	// 	return <div className='flex items-center'>{breadcrumbDatas.map((breadcrump, position) => {
	// 		return position + 1 === breadcrumbDatas.length ? <Link className={classnames("text-coventi", { 'text-black': position + 1 === breadcrumbDatas.length })} href={breadcrump.link ? breadcrump.link : ''}>
	// 		</Link> : <p>{  breadcrump.name}</p>
	// 	})}</div>
	// }

	return (
		<>
			{breadcrumbDatas.length === 1 && renderSingleBreadcrump()}
			{breadcrumbDatas.length > 1 && renderMiltiBreadcrump()}
		</>
	)
}
