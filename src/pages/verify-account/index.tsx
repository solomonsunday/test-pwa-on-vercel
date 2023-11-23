import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import AuthBanner from "@/components/AuthBanner";
import { UserLoginDto } from "@/features/slices/auth/authInterface";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const VerifyAccount: FC = (): JSX.Element => {
	const { handleSubmit, register, formState: { errors, isDirty, isValid } } = useForm<Pick<UserLoginDto, 'email'>>()

	useEffect(() => {
		// handleUserRegistration();
	}, []);

	const onSubmit = (formDto: Pick<UserLoginDto, 'email'>) => {
		if (!formDto.email) { return; }
		console.log(formDto);

	}

	return (
		<div className="p-4 mx-auto bg-white container-md">
			<div className="grid md:h-screen grid-cols-7 gap-4">
				<div className="xs:col-span-7 sm:col-span-7 lg:col-span-3 pt-8 md:px-16">
					<Image className="mb-12" src={'/assets/images/app-logo.svg'} alt={"coventi_logo"} width={127} height={0} />
					<h4 className="text-3xl font-bold mb-2">Verify account</h4>
					<p className="text-slate-500 text-md font-light mb-10">Enter verification code sent to your mail.</p>

					<form onSubmit={handleSubmit(onSubmit)} >
						<div className="block mb-2">
							<span className="block text-sm text-gray-400">Email</span>
							<div className="flex items-center">
								<input {...register('email', {
									required: 'Email is required',
									minLength: 5
								})} type="text" autoComplete="false" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700" required minLength={5} placeholder="Email..." />

								{isValid ? <CheckCircleIcon className='-ml-9 text-green-500 h-6 mt-1' /> : <></>}
							</div>
							{errors.email?.type === 'required' && <p className="mt-1 text-red-600 text-xs italic">{errors.email?.message}</p>}
							{errors.email?.type === 'minLength' && <p className="mt-1 text-red-600 text-xs italic">Minimum input length of 5</p>}
							{errors.email?.type === 'pattern' && <p className="mt-1 text-red-600 text-xs italic">Please provide a valid email address!</p>}
						</div>

						<p className="text-right text-slate-500 text-md font-light">Back to <span>
							<Link className="text-blue-500 font-normal" href="/login">Login</Link></span>
						</p>

						<button type="submit" disabled={!isDirty || !isValid} className="my-4 w-full rounded-full p-3 bg-coventi-500 hover:bg-blue-600 active:bg-blue-700 text-white disabled:shadow-none disabled:bg-blue-300">Submit</button>
					</form>

				</div>
				<div className="sm:col-span-7 lg:col-span-4 xs:hidden flex pt-6 justify-center">
					<AuthBanner
						title="Go Global, Stream Anywhere."
						subText="Connect with Your Favourite Artistes anywhere"
					/>
				</div>
			</div>
		</div>
	);
};

export default VerifyAccount;