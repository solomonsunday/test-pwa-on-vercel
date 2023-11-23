import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CoventiButton from './Button'
import ModalLayout from './layouts/ModalLayout';

export default function ContactSale() {

	const [modalIsOpened, setModalIsOpened] = useState(false);
	const {
		handleSubmit,
		register,
		// reset,
		// setValue,
		formState: { errors, isDirty, isValid },
	} = useForm<any>({ mode: "onChange" });


	return <>
		<div className="flex justify-center border-t">
			<div className="text-center max-w-xl py-12 xs:px-3 sm:px-2">
				<h2 className='xs:text-3xl font-thin sm:text-4xl mb-6'>Lorem ipsum dolor sit.</h2>
				<p className='text-base mb-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, voluptatum. Commodi, corrupti non!</p>
				<CoventiButton onClick={() => setModalIsOpened(true)} className="px-12 py-3" text='Contact sales' />
			</div>

		</div>


		<ModalLayout parameters={{
			isOpened: modalIsOpened,
			title: 'Contact sales',
			// position:'left'
		}}
			modalResult={() => { setModalIsOpened(false); }}>
			<>
				<form onSubmit={handleSubmit((d) => console.log(d))}>
					<div className="mb-4">
						<span className="text-gray-400">Email</span>
						<div className="flex items-center ">
							<input
								{...register("email", {
									required: "Email is required",
									minLength: 5,
								})}
								type="email"
								autoComplete="false"
								className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
								placeholder="Email..."
							/>

							{isValid && <CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />}
						</div>

						{errors.email?.type === "required" && (
							<p className="mt-1 text-xs italic text-red-600">
								{errors.email?.message?.toString()}
							</p>
						)}
						{errors.email?.type === "minLength" && (
							<p className="mt-1 text-xs italic text-red-600">
								Minimum input length of 5
							</p>
						)}
						{errors.email?.type === "pattern" && (
							<p className="mt-1 text-xs italic text-red-600">
								Please provide a valid email address!
							</p>
						)}
					</div>
					<div className="mb-4">
						<span className="text-gray-400">Email</span>
						<div className="flex items-center ">
							<input
								{...register("email", {
									required: "Email is required",
									minLength: 5,
								})}
								type="email"
								autoComplete="false"
								className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
								placeholder="Email..."
							/>

							{isValid && <CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />}
						</div>

						{errors.email?.type === "required" && (
							<p className="mt-1 text-xs italic text-red-600">
								{errors.email?.message?.toString()}
							</p>
						)}
						{errors.email?.type === "minLength" && (
							<p className="mt-1 text-xs italic text-red-600">
								Minimum input length of 5
							</p>
						)}
						{errors.email?.type === "pattern" && (
							<p className="mt-1 text-xs italic text-red-600">
								Please provide a valid email address!
							</p>
						)}
					</div>
					<div className="mb-4">
						<span className="text-gray-400">Email</span>
						<div className="flex items-center ">
							<input
								{...register("email", {
									required: "Email is required",
									minLength: 5,
								})}
								type="email"
								autoComplete="false"
								className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
								placeholder="Email..."
							/>

							{isValid && <CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />}
						</div>

						{errors.email?.type === "required" && (
							<p className="mt-1 text-xs italic text-red-600">
								{errors.email?.message?.toString()}
							</p>
						)}
						{errors.email?.type === "minLength" && (
							<p className="mt-1 text-xs italic text-red-600">
								Minimum input length of 5
							</p>
						)}
						{errors.email?.type === "pattern" && (
							<p className="mt-1 text-xs italic text-red-600">
								Please provide a valid email address!
							</p>
						)}
					</div>
					<div className="mb-4">
						<span className="text-gray-400">Email</span>
						<div className="flex items-center ">
							<input
								{...register("email", {
									required: "Email is required",
									minLength: 5,
								})}
								type="email"
								autoComplete="false"
								className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
								placeholder="Email..."
							/>

							{isValid && <CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />}
						</div>

						{errors.email?.type === "required" && (
							<p className="mt-1 text-xs italic text-red-600">
								{errors.email?.message?.toString()}
							</p>
						)}
						{errors.email?.type === "minLength" && (
							<p className="mt-1 text-xs italic text-red-600">
								Minimum input length of 5
							</p>
						)}
						{errors.email?.type === "pattern" && (
							<p className="mt-1 text-xs italic text-red-600">
								Please provide a valid email address!
							</p>
						)}
					</div>
					<div className="mb-4">
						<span className="text-gray-400">Email</span>
						<div className="flex items-center ">
							<input
								{...register("email", {
									required: "Email is required",
									minLength: 5,
								})}
								type="email"
								autoComplete="false"
								className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
								placeholder="Email..."
							/>

							{isValid && <CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />}
						</div>

						{errors.email?.type === "required" && (
							<p className="mt-1 text-xs italic text-red-600">
								{errors.email?.message?.toString()}
							</p>
						)}
						{errors.email?.type === "minLength" && (
							<p className="mt-1 text-xs italic text-red-600">
								Minimum input length of 5
							</p>
						)}
						{errors.email?.type === "pattern" && (
							<p className="mt-1 text-xs italic text-red-600">
								Please provide a valid email address!
							</p>
						)}
					</div>

					<CoventiButton isDisabled={!isDirty || !isValid}
						onClick={() => setModalIsOpened(false)} className="w-full py-3" text='Submit' />
				</form>
			</>
		</ModalLayout>
	</>
}
