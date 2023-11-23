import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthBanner from "@/components/AuthBanner";
import { useRouter } from "next/router";
import { useAlert } from "@/contexts/ApplicationContext";
import { UserForgotResetPassswordDto } from "@/features/slices/auth/authInterface";
import {
	ArrowPathIcon,
	CheckCircleIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { isValidEmail } from "@/common/utility";
import CoventiButton from "@/components/Button";
import {
	forgotPassword,
	resetPassword,
} from "@/features/slices/auth/authAction";
import { NextSeo } from "next-seo";

export default function ForgotPassword(): JSX.Element {
	const { sendAlert, sendErrorAlert } = useAlert();
	const [isEmail, setIsEmail] = useState(false);
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { errors, isDirty, isValid },
	} = useForm<UserForgotResetPassswordDto>({ mode: "onChange" });
	const [inputType, setInputType] = useState<"password" | "text">("password");
	const [isBusy, setIsBusy] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const email = router.query?.email as string;
		if (email) {
			if (!isValidEmail(email)) {
				router.push("forgot-password");
				return;
			}
			setValue("email", email);
			setIsEmail(true);
			return;
		}
		reset();
		setIsEmail(false);
	}, [router.query]);

	function onSubmit(formDto: UserForgotResetPassswordDto) {
		if (!formDto.email) {
			return;
		}
		setIsBusy(true);
		if (!formDto.token || !formDto.password || !isEmail) {
			helpSendForgotPassword(formDto);
			return;
		}

		resetPassword(formDto)
			.then((message) => {
				setIsBusy(false);
				sendAlert(message);
				router.push("/login");
			})
			.catch((error) => {
				setIsBusy(false);
				sendErrorAlert(error);
			});
	}

	function onTogglePassword() {
		if (inputType === "text") {
			setInputType("password");
			return;
		}
		setInputType("text");
	}

	function helpSendForgotPassword(formDto: UserForgotResetPassswordDto) {
		setIsBusy(true);
		forgotPassword(formDto)
			.then((message) => {
				setIsBusy(false);
				sendAlert(message);
				router.push(`${router.pathname}?email=${formDto.email}`);
			})
			.catch((error) => {
				setIsBusy(false);
				sendErrorAlert(error);
			});
	}

	return (

		<>
			<NextSeo
				title="Forgot password - Coventi"
				description="Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
				openGraph={
					{
						url: 'https://coventi.co/faq',
						title: 'Forgot password - Coventi',
						description: "Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
					}
				}
			/>


			<div className="container p-4 mx-auto bg-white">
				<div className="grid grid-cols-7 gap-4 ">
					<div className="pt-8 xs:col-span-7 sm:col-span-7 lg:col-span-3 md:px-16">
						<Link href="/">
							<div className="mb-12">
								<Image
									src="/assets/images/app-logo.svg"
									alt="appicon"
									width={127}
									height={0}
								/>
							</div>
						</Link>
						<h4 className="mb-2 text-3xl font-bold">
							{!isEmail ? "Forgot" : "Reset"} password?
						</h4>

						<>
							{!isEmail ? (
								<p className="mb-10 font-light text-slate-500 text-md">
									Enter your email and we'll send you a confirmation token
								</p>
							) : (
								<p className="mb-10 font-light text-slate-500 text-md">
									Enter the confirmation token sent to the email you provided
								</p>
							)}
						</>

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-4">
								<p className="mb-1 text-sm text-gray-400">Email</p>
								<div className="flex items-center bg-transparent">
									<input
										{...register("email", {
											required: "Email is required",
											minLength: 5,
										})}
										type="email"
										readOnly={isEmail}
										autoComplete="false"
										className="block w-full p-3 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
										placeholder="Email..."
									/>
									{isValid && (
										<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
									)}
								</div>

								{errors.email?.type === "required" && (
									<p className="mt-1 text-xs text-red-600">
										{errors.email?.message}
									</p>
								)}
								{errors.email?.type === "minLength" && (
									<p className="mt-1 text-xs text-red-600">
										Minimum input length of 5
									</p>
								)}
								{errors.email?.type === "pattern" && (
									<p className="mt-1 text-xs text-red-600">
										Please provide a valid email address!
									</p>
								)}
							</div>

							{isEmail && (
								<>
									<div className="mb-4">
										<div className="flex justify-between">
											<span className="mb-1 text-sm text-gray-400">Token</span>
											<p
												onClick={() =>
													helpSendForgotPassword({
														email: router.query?.email,
													} as any)
												}
												className="flex items-center text-sm cursor-pointer text-coventi-500"
											>
												<ArrowPathIcon className="w-4 h-4 mr-1" />
												Resend token
											</p>
										</div>
										<div className="flex items-center">
											<input
												{...register("token", {
													required: "Token is required",
													minLength: 4,
													maxLength: 4,
												})}
												type="number"
												minLength={4}
												maxLength={4}
												autoComplete="false"
												className="block w-full p-3 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
												placeholder="Token..."
											/>
											{isValid && (
												<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
											)}
										</div>
										{errors.token?.type === "required" && (
											<p className="mt-1 text-xs text-red-600">
												{errors.token?.message}
											</p>
										)}
										{errors.token?.type === "minLength" && (
											<p className="mt-1 text-xs text-red-600">
												Token code length cannot be less than 4
											</p>
										)}
										{errors.token?.type === "maxLength" && (
											<p className="mt-1 text-xs text-red-600">
												Token code length cannot be more than 4
											</p>
										)}
									</div>

									<div className="mb-4">
										<p className="mb-1 text-sm text-gray-400">New Password</p>
										<div className="flex items-center">
											<input
												{...register("password", {
													required: "Password is required",
													minLength: 6,
												})}
												type={inputType}
												autoComplete="false"
												className="block w-full p-3 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
												placeholder="New password..."
											/>

											<span
												onClick={onTogglePassword}
												className="cursor-pointer hover:text-blue-500"
											>
												{inputType === "password" ? (
													<EyeSlashIcon className="h-6 mt-1 -ml-9 text-slate-400 hover:text-blue-500" />
												) : (
													<EyeIcon className="h-6 mt-1 -ml-9 text-slate-400 hover:text-blue-500" />
												)}
											</span>
										</div>
										{errors.password?.type === "required" && (
											<p className="mt-1 text-xs text-red-600">
												{errors.password?.message}
											</p>
										)}
										{errors.password?.type === "minLength" && (
											<p className="mt-1 text-xs italic text-left text-red-600">
												Minimum 6 characters
											</p>
										)}
									</div>
								</>
							)}

							<CoventiButton
								type="submit"
								text="Submit"
								isBusy={isBusy}
								isDisabled={!isDirty || !isValid}
								className="w-full mt-4"
							/>

							<p className="mt-8 font-light text-center text-slate-500">
								Remembered your credentials?{" "}
								<span>
									<Link className="font-normal text-coventi" href="/login">
										Login
									</Link>
								</span>
							</p>
						</form>
					</div>
					<div className="flex justify-center min-h-screen py-6 pt-6 sm:col-span-7 lg:col-span-4 xs:hidden">
						<AuthBanner
							title="The Show is Wherever You Are"
							subText="Stream your favourite Concerts  anywhere, with Coventi"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
