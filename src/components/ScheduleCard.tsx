import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'

import { toTitleCase } from '@/common/utility'
import { ISchedule } from '@/features/slices/event/eventInterface'

interface IProps {
	schedule: ISchedule;
	showStatus?: boolean;
	isForPublic?: boolean;
	className?: string;
	onEditSchedule?: (scheduleId: string) => void;
	onDeleteSchedule?: (scheduleId: string) => void;
}

export default function ScheduleCard({
	schedule,
	showStatus = false,
	isForPublic = false,
	className = ' ',
	onEditSchedule,
	onDeleteSchedule
}: IProps) {
	const initialStyle = "w-full py-2 px-4 border hover:border-blue-400 border-gray-300 rounded-lg mb-1 ";
	return (
		<div key={Math.random()} className={initialStyle + className}>
			<div className="flex justify-between mb-1">
				<p className='text-sm truncate'>{toTitleCase(schedule?.name)}</p>
				<div className='flex items-center gap-1'>

					{showStatus && <p className="px-1 text-emerald-500 text-xs rounded-md italic">{!schedule.isEnded ? 'Not streamed' : 'Streamed'}</p>}

					{!isForPublic && <div onClick={() => onEditSchedule && onEditSchedule(schedule?.scheduleId)} className="px-1 cursor-pointer"><PencilIcon className='h-3 w-3' /></div>}

					{!isForPublic && <div onClick={() => onDeleteSchedule && onDeleteSchedule(schedule?.scheduleId)} className="pl-2 cursor-pointer text-red-500"><XMarkIcon className='h-4 w-4' /></div>}

				</div>
			</div>
			<div className="flex justify-between text-gray-400">
				<p className='text-xs'>{schedule?.location}</p>
				<div className='flex gap-4'>
					<p className='text-xs'>{schedule?.timeZone}</p>
					<p className='text-xs'>{schedule?.dateTime}</p>
				</div>
			</div>
		</div>
	)
}
