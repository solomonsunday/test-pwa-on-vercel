"use client"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';

import { generateNanoId } from '@/common/utility';
import { ISchedule } from '@/features/slices/event/eventInterface';
import { getTimezones } from '@/features/slices/utility/utilityAction';
import { ITimezone } from '@/features/slices/utility/utilityInterface';
import { useAlert } from '@/contexts/ApplicationContext';
import ScheduleCard from '../ScheduleCard';
import CoventiButton from '../Button';
import { updateEventSchedules } from '@/features/slices/event/eventAction';

export default function ScheduleForm({
	emitSchedules,
	closeForm,
	eventId,
	initialSchedules = [],
	isInEditMode = false,
}: {
	closeForm?: () => void;
	emitSchedules?: (schedules: ISchedule[]) => void;
	initialSchedules?: ISchedule[];
	eventId?: string | null;
	isInEditMode?: boolean;
}): JSX.Element {
	const { sendAlert, sendErrorAlert } = useAlert();
	const [timeZones, setTimeZones] = useState<ITimezone[]>([]);
	const [isAddingSchedule, setIsAddingSchedule] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [schedules, setSchedules] = useState<ISchedule[]>([]);

	const {
		register,
		setError,
		setValue,
		getValues,
		formState: { errors, isDirty, isValid }
	} = useForm<{
		scheduleId: string | null;
		name: string | null;
		location: string | null;
		timeZone: string | null;
		date: string | null;
		isEnded: boolean;
		time: string | null;
	}>({ mode: "onChange" });


	useEffect(() => {
		console.log('effect called');
		helpSetTimezones();
		helpSetInitialSchedules();
	}, []);


	function onToggleAddSchedules() {
		setIsAddingSchedule(!isAddingSchedule);
	}

	function onEditSchedule(scheduleId: string) {
		setIsAddingSchedule(true);
		setIsEditing(true);
		const schedule = schedules.find(schedule => scheduleId === schedule.scheduleId) || null;
		if (!schedule) { return; }
		const dateTime = schedule.dateTime.split(' ');
		const date = dateTime.at(0) || null;
		const time = dateTime.at(1) || null;
		setValue('scheduleId', schedule.scheduleId, {
			shouldDirty: true,
			shouldValidate: true
		});
		setValue('name', schedule.name, {
			shouldDirty: true,
			shouldValidate: true
		});
		setValue('location', schedule.location, {
			shouldDirty: true,
			shouldValidate: true
		});
		setValue('timeZone', schedule.timeZone, {
			shouldDirty: true,
			shouldValidate: true
		});
		setValue('isEnded', schedule.isEnded || false, {
			shouldDirty: true,
			shouldValidate: true
		});
		setValue('date', date, {
			shouldDirty: true,
			shouldValidate: true
		});
		setValue('time', time, {
			shouldDirty: true,
			shouldValidate: true
		});
		const newSchedules = schedules.filter(schedule => scheduleId !== schedule.scheduleId);
		helpSetSchedules(newSchedules);
	}

	function onDeleteSchedule(scheduleId: string) {
		const newSchedules = schedules.filter(schedule => scheduleId !== schedule.scheduleId);
		helpSetSchedules(newSchedules);
	}

	function onCloseForm() {
		const { scheduleId, name, location, timeZone, isEnded, date, time } = getValues();
		onToggleAddSchedules()
		if (!name || !location || !timeZone || !date || !time) return;

		const schedule = {
			scheduleId: scheduleId!,
			name: name.trim().toLowerCase(),
			location: location.trim(),
			timeZone,
			isEnded: isEnded || false,
			dateTime: `${date} ${time}`
		};
		helpSetSchedules(schedule);
	}

	function onSubmitSchedule() {
		const { scheduleId, name, location, timeZone, isEnded, date, time } = getValues();
		if (!name || !location || !timeZone || !date || !time) { return; }
		const schedule = {
			scheduleId: isEditing ? scheduleId! : generateNanoId(),
			name: name.trim().toLowerCase(),
			location: location.trim(),
			timeZone,
			isEnded: isEnded || false,
			dateTime: `${date} ${time}`
		};

		const nameExists = schedules.some(schedulee => schedule.name === schedulee.name);
		if (nameExists) {
			setError('name', {
				type: 'validate',
				message: '2 Schedules cannot have same names!'
			});
			return;
		}

		helpSetSchedules(schedule);
		helpResetScheduleForm();
		setIsEditing(false);
	}

	function onSubmitSchedulesUpdate() {
		if (!eventId) {
			sendErrorAlert({ message: 'Schedules needs an event ID for a reference in the server' });
		}

		updateEventSchedules({ eventId: eventId!, schedules })
			.then(response => {
				sendAlert(response.message);
				closeForm && closeForm();
			})
			.catch(error => sendErrorAlert(error));
	}

	function helpSetTimezones() {
		if (timeZones.length <= 0) {
			getTimezones()
				.then(timezones => setTimeZones(timezones))
				.catch(error => sendErrorAlert(error));
		}
	}


	function helpSetInitialSchedules() {
		if (initialSchedules.length <= 0) return;
		const modifiedSchedules = initialSchedules.map(schedule => {
			return {
				...schedule,
				scheduleId: generateNanoId()
			}
		});
		helpSetSchedules(modifiedSchedules);
	}


	function helpSetSchedules(schedules: ISchedule[] | ISchedule) {
		if (Array.isArray(schedules)) {
			setSchedules(schedules);
			emitSchedules && emitSchedules(schedules);
			return;
		}
		setSchedules(initialValue => {
			const newSchedules = [...initialValue, schedules];
			emitSchedules && emitSchedules(newSchedules);
			return newSchedules;
		})
	}


	// function helpGetCompiledSchedules(persistData = true): ISchedule[] {
	// 	// this function is used to select between initial schedules sent by parent component and parent created in the component.
	// 	// using component use effect triggers rerender, which not what we want.
	// 	let initSchedules: ISchedule[] = [];
	// 	if (schedules.length > 0) {
	// 		initSchedules = schedules;
	// 	} else {
	// 		initSchedules = initialSchedules;
	// 	}
	// 	const finalSchedules = initSchedules.map(schedule => {
	// 		return {
	// 			...schedule,
	// 			scheduleId: schedule.scheduleId ? schedule.scheduleId : generateNanoId()
	// 		}
	// 	})
	// 	if (persistData) {
	// 		helpSetSchedules(finalSchedules);
	// 	}
	// 	return finalSchedules;
	// }


	function helpResetScheduleForm() {
		setValue('scheduleId', null);
		setValue('name', null);
		setValue('location', null);
		setValue('timeZone', null);
		setValue('date', null);
		setValue('time', null);
	}

	return (
		<>
			<div className="flex justify-between">
				<span className="text-sm text-gray-400 mb-1">Schedules</span>
				{!isAddingSchedule && <p onClick={onToggleAddSchedules} className='text-sm flex items-center text-blue-500 cursor-pointer'><PlusIcon className='h-5 w-5 mr-1' /> Add schedules</p>}
			</div>

			{schedules.length <= 0 && <div className="w-full py-3 border border-gray-300 rounded-lg">
				<p className='text-gray-500 text-center italic'>No schedule added yet...</p>
			</div>}

			{schedules.map(schedule => <ScheduleCard key={Math.random()} showStatus={isInEditMode} schedule={schedule} onDeleteSchedule={scheduleId => onDeleteSchedule(scheduleId)} onEditSchedule={scheduleId => onEditSchedule(scheduleId)} />)}

			{isAddingSchedule && <div className="border shadow-md rounded-lg px-4 py-4 mt-2 animate__animate animate__slideInDown">

				<div className="mb-4">
					<span className="text-xs text-gray-400">Schedule name</span>
					<div className="flex items-center">
						<input {...register("name", {
							required: "Schedule name is required",
							minLength: 5,
						})}
							id='name'
							type="text"
							autoComplete="false"
							// onChange={onChangeScheduleInput}
							className="w-full py-2 px-4 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
							placeholder="Schedule name..."
						/>
						{isValid && <CheckCircleIcon className="h-5 w-5 text-green-500 -ml-9" />}
					</div>
					{errors.name?.type === "required" && (
						<p className="mt-1 text-xs text-red-500">
							{errors.name?.message?.toString()}
						</p>
					)}
					{errors.name?.type === "minLength" && (
						<p className="mt-1 text-xs text-red-500">
							Minimum input length of 5
						</p>
					)}
					{errors.name?.type === "validate" && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
					}
				</div>

				<div className="grid grid-cols-12 gap-4 mb-4">
					<div className="col-span-6">
						<span className="text-xs text-gray-400">Location</span>
						<div className="flex items-center">
							<input {...register("location", {
								required: "Location is required",
								minLength: 3,
							})}
								id='location'
								type="text"
								autoComplete="false"
								// onChange={onChangeScheduleInput}
								className="w-full py-2 px-4 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
								placeholder="Location..."
							/>
							{isValid && <CheckCircleIcon className="h-5 w-5 text-green-500 -ml-9" />}
						</div>
						{errors.location?.type === "required" && (
							<p className="mt-1 text-xs text-red-500">
								{errors.location?.message?.toString()}
							</p>
						)}
						{errors.location?.type === "minLength" && (
							<p className="mt-1 text-xs text-red-500">
								Minimum input length of 3
							</p>
						)}
					</div>
					<div className="col-span-6">
						<span className="text-xs text-gray-400">Timezone</span>
						<div className="flex items-center">
							<select {...register("timeZone", {
								required: "Location is required"
							})}
								id='timeZone'
								// onChange={onChangeScheduleInput}
								className="w-full appearance-none border focus:outline-none focus:border-blue-300 border-gray-300 text-gray-600 py-2 px-3 rounded-lg">
								<option value=''>Select timezone</option>
								{timeZones.map(timezone => <option key={timezone.name} value={timezone.name}>{timezone.name}</option>)}
							</select>
							{isValid && <CheckCircleIcon className="h-5 w-5 text-green-500 -ml-9" />}
						</div>
					</div>
				</div>


				<div className="grid grid-cols-12 gap-4 mb-4">
					<div className="col-span-6">
						<span className="text-xs text-gray-400">Date </span>
						<div className="flex items-center">
							<input {...register("date", { required: "Date is required" })}
								id='date'
								type="date"
								autoComplete="false"
								// onChange={onChangeScheduleInput}
								className="w-full py-2 px-4 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
								placeholder="Date..."
							/>
							{isValid && <CheckCircleIcon className="h-5 w-5 text-green-500 -ml-16" />}
						</div>
						{errors.date?.type === "required" && (
							<p className="mt-1 text-xs text-red-500">
								{errors.date?.message?.toString()}
							</p>
						)}
					</div>
					<div className="col-span-6">
						<span className="text-xs text-gray-400">Time</span>
						<div className="flex items-center">
							<input {...register("time", { required: "Time is required" })}
								id="time"
								type="time"
								autoComplete="false"
								// onChange={onChangeScheduleInput}
								className="w-full py-2 px-4 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
								placeholder="Date..."
							/>
							{isValid && <CheckCircleIcon className="h-5 w-5 text-green-500 -ml-16" />}
						</div>
						{errors.time?.type === "required" && (
							<p className="mt-1 text-xs text-red-500">
								{errors.time?.message?.toString()}
							</p>
						)}
					</div>
				</div>


				{/* {isInEditMode && <div className="mb-4 py-2">
					<p className="text-xs mb-2 text-gray-400">Is ended?</p>
					<div className="flex items-center gap-3">
						<input
							{...register("isEnded", { required: false })}
							type="checkbox"
							id="isEnded"
							className="w-5 h-5 accent-coventi-500"
						/>
						<label htmlFor="isEnded" className="text-x">Is ended</label>
					</div>

					<label className="relative inline-flex items-center cursor-pointer">
						<input {...register("isEnded", { required: false })}
							type="checkbox"
							checked={getValues().isEnded || false}
							id="acceptEmailNotification"
							className="sr-only peer"
							onChange={() => setValue}
						// checked={true}
						/>
						<div className="w-11 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
						<span className="ml-3 text-sm">Change schedule status</span>
					</label>
				</div>} */}


				<div className="flex justify-end gap-6">
					<button
						type='button'
						onClick={onCloseForm}
						className='py-1 px-6 border bg-red-50 hover:bg-red-100 active:bg-red-200 border-red-500 text-red-500 rounded-md'>Close</button>

					<button onClick={onSubmitSchedule}
						type='button'
						disabled={!isDirty || !isValid}
						className='py-1 px-6 bg-coventi-500 hover:bg-blue-600 text-white rounded-md  disabled:shadow-none disabled:bg-blue-400'>Save</button>
				</div>

			</div>}
			{isInEditMode && <div className="border-t border-slate-300 mt-4">
				<CoventiButton onClick={onSubmitSchedulesUpdate} className="w-full mt-4" />
			</div>}
		</>
	)
}
