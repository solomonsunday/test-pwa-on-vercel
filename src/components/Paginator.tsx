import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type IProps = {
	dataLength: number; // no of datas from d server
	dataPerPage: number; // data to display per-page
	currentPage: number; // current page navigated; is mostly start at 1 in reload
	// currentDataLength: number; // current number of data on display table
	onChangePage: (paginatorData: {
		dataLength: number;
		dataPerPage: number;
		currentPage: number;
	}) => void
}

export default function Paginator({ dataLength, dataPerPage, currentPage, onChangePage }: IProps) {


	function pagesToGo(): number {
		if (dataPerPage > dataLength) { return 1; }
		const remainder = dataLength % dataPerPage;
		const pageToGo = Number((dataLength / dataPerPage).toFixed(0));
		if (remainder === 0 || remainder > 5) { return pageToGo; }
		return pageToGo + 1;
	}


	function onPrevious() {
		if (currentPage <= 1) { return; }
		onChangePage({ dataLength, dataPerPage, currentPage: currentPage - 1 });
	}

	function onNext() {
		if (currentPage >= pagesToGo()) { return; }
		onChangePage({ dataLength, dataPerPage, currentPage: currentPage + 1 });
	}

	return (
		<>
			{ dataLength > dataPerPage && <div className='flex justify-end items-center border border-gray-300 gap-6 rounded-lg px-4 mb-6'>
				<p>Items per page: {dataPerPage}</p>
				<p>page <span className="mx-1">{currentPage}</span> of <span className="ml-1">{pagesToGo()}</span></p>
				<div className='flex items-center	gap-4'>
					<div onClick={() => onPrevious()} className='cursor-pointer rounded px-8 py-2 active:bg-blue-200 hover:bg-blue-100 hover:text-blue-500'>
						<ChevronLeftIcon className='h-6 w-6' />
					</div>
					<div title="view details" onClick={() => onNext()} className='cursor-pointer rounded px-8 py-2 active:bg-blue-200 hover:bg-blue-100 hover:text-blue-500'>
						<ChevronRightIcon className='h-6 w-6' />
					</div>
				</div>
			</div>}
		</>
	)
}