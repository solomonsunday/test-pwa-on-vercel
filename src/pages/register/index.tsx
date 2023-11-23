import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Metadata } from "next";
import { parsePhoneNumber } from "react-phone-number-input";

import { isValidEmail, isValidPhoneNumber } from "@/common/utility";
import AuthBanner from "@/components/AuthBanner";
import { userRegister } from "@/features/slices/auth/authAction";
import { UserRegisterDto } from "@/features/slices/auth/authInterface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	EyeIcon,
	CheckCircleIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { UserTypeEnum } from "@/features/slices/user/userInterface";
import { useAlert } from "@/contexts/ApplicationContext";
import { getCountryCodes } from "@/features/slices/utility/utilityAction";
import { ICountryCode } from "@/features/slices/utility/utilityInterface";
import CoventiButton from "@/components/Button";
import { NextSeo } from "next-seo";
import { GoogleLogin } from "@react-oauth/google";

export const metadata: Metadata = {
	title: 'Register - Coventi',
	description: ' ',
}

export default function Register(): JSX.Element {
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { errors, isDirty, isValid },
	} = useForm<UserRegisterDto>({ mode: "onBlur", defaultValues: { countryCode: 'NG' } });

	const router = useRouter();
	const { sendErrorAlert } = useAlert();
	const dispatch = useAppDispatch();
	const [isEmail, setIsEmail] = useState(false);
	const [inputType, setInputType] = useState<"password" | "text">("password");
	const userAuth = useAppSelector((state) => state?.auth);
	const [countryCodes, setCountryCodes] = useState<ICountryCode[]>([]);
	const [phoneNumberValid, setPhoneNumberValid] = useState(true);

	const isBusy = userAuth.loading;

	useEffect(() => {
		const email = router.query?.email as string;
		if (email) {
			if (!isValidEmail(email)) {
				router.push(router.pathname);
				return;
			}
			setValue("email", email);
			setIsEmail(true);
			return;
		}
		reset();
		setIsEmail(false);
	}, [router.query]);

	useEffect(() => {
		handleUserRegistrationResponse();
	}, [userAuth]);

	useEffect(() => {
		helpSetCountryCodes();
	}, []);

	function helpSetCountryCodes() {
		setCountryCodes(getCountryCodes());
	}

	function validatePhoneNumber(event: any) {
		const phoneNumber = (event.target as HTMLInputElement).value;
		setPhoneNumberValid(isValidPhoneNumber(phoneNumber));
	}
	function onRegisterUser(userRegisterDto: UserRegisterDto) {
		if (!userRegisterDto.email) {
			return;
		}
		if (
			!userRegisterDto.firstName ||
			!userRegisterDto.surName ||
			!userRegisterDto.password ||
			!isEmail
		) {
			router.push(`${router.pathname}?email=${userRegisterDto.email}`);
			return;
		}
		console.log(userRegisterDto);

		const phoneNumber = parsePhoneNumber(userRegisterDto.phoneNumber, userRegisterDto.countryCode as any)!;
		console.log(phoneNumber);
		userRegisterDto.phoneNumber = phoneNumber?.countryCallingCode + phoneNumber.nationalNumber

		dispatch(userRegister(userRegisterDto));
	}

	function onTogglePassword() {
		if (inputType === "text") {
			setInputType("password");
			return;
		}
		setInputType("text");
	}

	function handleUserRegistrationResponse() {
		if (userAuth.error) {
			sendErrorAlert(userAuth.error);
			return;
		}
		if (!userAuth || !userAuth?.data?.user) {
			return;
		}
		if (userAuth.data.user.userType === UserTypeEnum.ADMIN) {
			router.push("/admin/dashboard");
			return;
		}
		router.push("/dashboard");
	}

	return (
		<>
			<NextSeo
				title="Register - Coventi"
				description="Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
				openGraph={
					{
						url: 'https://coventi.co/register',
						title: 'Register - Coventi',
						description: "Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
					}
				}
			/>


			<div className="w-full">
				<div className="container p-4 mx-auto">
					<div className="grid grid-cols-7 gap-4 h-scrseen">
						<div className="pt-8 xs:col-span-7 sm:col-span-7 lg:col-span-3 md:px-16">
							<Link href="/">
								<Image
									className="mb-12 cursor-pointer"
									src={"/assets/images/app-logo.svg"}
									alt={"coventi_logo"}
									width={127}
									height={0}
								/>
							</Link>
							<h4 className="mb-2 text-3xl font-bold">Welcome to Coventi!</h4>
							<p className="mb-10 font-light text-slate-500 text-md">
								Fill in a few details to signup
							</p>

							<form onSubmit={handleSubmit(onRegisterUser)}>
								{isEmail && (
									<>
										<div className="mb-4">
											<span className="block text-sm text-gray-400">
												Firstname
											</span>
											<div className="flex items-center">
												<input
													{...register("firstName", {
														required: "Firstname is required",
														minLength: 2,
													})}
													type="text"
													autoComplete="false"
													className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
													required
													placeholder="Firstname..."
												/>
												{isValid ? (
													<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
												) : (
													<></>
												)}
											</div>
											{errors.firstName?.type === "required" && (
												<p className="mt-1 text-xs italic text-red-600">
													{errors.firstName?.message}
												</p>
											)}
											{errors.firstName?.type === "minLength" && (
												<p className="mt-1 text-xs italic text-red-600">
													Minimum input length of 2
												</p>
											)}
										</div>

										<div className="block mb-4">
											<span className="block text-sm text-gray-400">Surname</span>

											<div className="flex items-center ">
												<input
													{...register("surName", {
														required: "Surname is required",
														minLength: 2,
													})}
													type="text"
													autoComplete="false"
													className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
													placeholder="Surname..."
												/>

												{isValid ? (
													<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
												) : (
													<></>
												)}
											</div>

											{errors.surName?.type === "required" && (
												<p className="mt-1 text-xs italic text-red-600">
													{errors.surName?.message}
												</p>
											)}
											{errors.surName?.type === "minLength" && (
												<p className="mt-1 text-xs italic text-red-600">
													Minimum input length of 2
												</p>
											)}
										</div>
									</>
								)}

								<div className="block mb-4">
									<span className="text-gray-400">Email</span>
									<div className="flex items-center ">
										<input
											{...register("email", {
												required: "Email is required",
												minLength: 5,
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message: "Please provide a valid email address!",
												},
											})}
											type="email"
											autoComplete="false"
											// pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
											className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
											placeholder="Email..."
										/>

										{isValid ? (
											<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
										) : (
											<></>
										)}
									</div>

									{errors.email?.type === "required" && (
										<p className="mt-1 text-xs italic text-red-600">
											{errors.email?.message}
										</p>
									)}
									{errors.email?.type === "minLength" && (
										<p className="mt-1 text-xs italic text-red-600">
											Minimum input length of 5
										</p>
									)}
									{errors.email?.type === "pattern" && (
										<p className="mt-1 text-xs italic text-red-600">
											{errors.email?.message}
										</p>
									)}
								</div>

								{isEmail && (
									<>
										<div className="block mb-4">
											<label
												className="block text-sm text-gray-400"
												htmlFor="phone-input"
											>
												Phone number
											</label>

											<div className="flex items-center">
												<select
													{...register("countryCode", {
														required: "Country code is required",
													})}
													className="w-full p-3 mt-1 text-gray-600 bg-transparent border border-r-0 border-gray-300 rounded-l-lg appearance-none focus:outline-none basis-4/12 focus:border-blue-300"
													placeholder="kljhyv"
												>
													<option value="">Country</option>
													{countryCodes.map((item) => (
														<option value={item.code} key={item.code}>
															({item.dialCode})	{item.name}
														</option>
													))}
												</select>

												<input
													{...register("phoneNumber", {
														required:
															"Phone number is required & must be a valid number",
														minLength: 8,
														maxLength: 11,
													})}
													type="tel"
													autoComplete="false"
													autoCorrect="false"
													onChange={(e) => validatePhoneNumber(e)}
													className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-r-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
													placeholder="Phone number..."
												/>

												{isValid && (
													<CheckCircleIcon className="h-6 mt-1 text-green-500" />
												)}
											</div>
											{!phoneNumberValid && (
												<p className="mt-1 text-xs italic text-red-600">
													Phone number is required & must be a valid number
												</p>
											)}

											{errors.phoneNumber?.type === "required" && (
												<p className="mt-1 text-xs italic text-red-600">
													{errors.phoneNumber?.message}
												</p>
											)}
											{errors.countryCode?.type === "required" && (
												<p className="mt-1 text-xs italic text-red-600">
													{errors.countryCode?.message}
												</p>
											)}
											{errors.phoneNumber?.type === "minLength" && (
												<p className="mt-1 text-xs italic text-red-600">
													Valid phone number only
												</p>
											)}
											{errors.phoneNumber?.type === "maxLength" && (
												<p className="mt-1 text-xs italic text-red-600">
													Valid phone number only
												</p>
											)}
										</div>

										<div className="mb-4">
											<p className="mb-1 text-sm text-gray-400">Password</p>

											<div className="flex items-center">
												<input
													{...register("password", {
														required: "Password is required",
														minLength: 6,
													})}
													type={inputType}
													autoComplete="false"
													className="block w-full p-3 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
													placeholder="Password..."
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
												<p className="mt-1 text-xs italic text-red-600 text">
													{errors.password?.message}
												</p>
											)}
											{errors.password?.type === "minLength" && (
												<p className="mt-1 text-xs italic text-left text-red-600">
													Minimum 6 characters
												</p>
											)}
										</div>

										<p className="mt-6 mb-2 text-sm text-center text-slate-500">
											By registering I agree to the{" "}
											<span className="text-coventi-500">
												<Link href="/terms-of-use">Terms of Use</Link>
											</span>{" "}
											and{" "}
											<span className="text-coventi-500">
												<Link href="/privacy">Privacy Policy </Link>
											</span>{" "}
											of Coventi.
										</p>
									</>
								)}

								<CoventiButton
									type="submit"
									text={isEmail ? "Submit" : "Proceed with email"}
									isBusy={isBusy}
									isDisabled={!isDirty || !isValid}
									className="w-full my-4"
								/>
							</form>

							<div className="grid grid-cols-5 mb-6">
								<div className="col-span-2 divide-y divide-slate-300">
									<div className="mt-3"></div>
									<div></div>
								</div>
								<div className="text-center">Or</div>
								<div className="col-span-2 divide-y divide-slate-300">
									<div className="mt-3"></div>
									<div></div>
								</div>
							</div>

							{/* Bring back when the login with google has been implemented */}
							<div className="flex justify-center">
								<GoogleLogin width={400} text="signup_with" shape="pill" context="signup"
									onSuccess={credentialResponse => {
										console.log(credentialResponse);
									}}
									onError={() => {
										console.log('Login Failed');
									}} />

							</div>


							<p className="mt-10 font-light text-center text-slate-500">
								Already have an account?{" "}
								<span>
									<Link className="font-normal text-blue-500" href="/login">
										Login
									</Link>
								</span>
							</p>
						</div>
						<div className="flex justify-center min-h-screen py-6 sm:col-span-7 lg:col-span-4 xs:hidden">
							<AuthBanner
								title="Go Global, Stream Anywhere."
								subText="Connect with Your Favourite Artistes anywhere"
							/>
						</div>
					</div>
				</div>
			</div>

		</>
	);
}
