import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { RiLinkedinFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";

import ModalLayout from "./layouts/ModalLayout";
import { useAlert } from "@/contexts/ApplicationContext";
import { UserRegisterDto } from "@/features/slices/auth/authInterface";
import CoventiButton from "./Button";
import { getCountryCodes } from "@/features/slices/utility/utilityAction";
import { ICountryCode } from "@/features/slices/utility/utilityInterface";
import { isValidPhoneNumber } from "@/common/utility";
import { submitSubscription } from "@/features/slices/subscription/subscriptionAction";
import { parsePhoneNumber } from "react-phone-number-input";

export default function Footer(): JSX.Element {
	const router = useRouter();
	const { sendErrorAlert, sendAlert } = useAlert();
	const [isBusy, setIsBusy] = useState(false);
	const [emailInput, setEmailInput] = useState<string | null>(null);
	const [subFormIsOpened, setSubFormIsOpened] = useState(false);
	const [countryCodes, setCountryCodes] = useState<ICountryCode[]>([]);
	const [phoneNumberValid, setPhoneNumberValid] = useState(false);

	const subForm = useForm<Omit<UserRegisterDto, 'password'> & { countryCode: string }>({ mode: "onBlur" });

	useEffect(() => {
		const email = router.query?.subscription_email as string || null;
		setSubFormIsOpened(email !== null);

		if (!email) return;
		subForm.setValue('email', email, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
		helpSetCountryCodes();
	}, [router.query]);



	function onSubmitSubForm(subFormDto: Omit<UserRegisterDto, 'password'> & { countryCode: string }) {
		if (!subForm.formState.isValid) return;
		const phoneNumber = parsePhoneNumber(subFormDto.phoneNumber, subFormDto.countryCode as any)!;
		subFormDto.phoneNumber = phoneNumber?.countryCallingCode + phoneNumber.nationalNumber;

		setIsBusy(true);
		submitSubscription(subFormDto)
			.then(response => {
				setIsBusy(false);
				sendAlert(response.message);
				router.push(router.pathname);
			})
			.catch(error => {
				setIsBusy(false);
				sendErrorAlert(error)
			});
	}


	function validatePhoneNumber(event: any) {
		const phoneNumber = (event.target as HTMLInputElement).value;
		setPhoneNumberValid(isValidPhoneNumber(phoneNumber));
	}

	function helpSetCountryCodes() {
		setCountryCodes(getCountryCodes());
	}


	return (
		<>

			<div className="py-10 mt-6 bg-white border-t xs:px-4 md:px-6 lg:px-0">
				<div className="container pt-6 mx-auto">
					<div className="grid grid-cols-8 gap-4 mb-4">
						<div className="mb-4 xs:col-span-8 sm:col-span-3 lg:col-span-2">
							<Link href={"/"}>
								<Image
									className="mb-4"
									src={"/assets/images/app-logo.svg"}
									alt={"coventi_logo"}
									width={127}
									height={0}
								/>
							</Link>
							<p className="text-base">support@coventi.co</p>
						</div>
						<div className="xs:col-span-4 sm:col-span-3 lg:col-span-2">
							<h5 className="mb-3 text-xl font-bold">Quick links</h5>
							<Link className="block mb-3" href="/events?option=live">
								<span className="mb-2 font-light text-slate-500 hover:text-blue-500">
									Live Events
								</span>
								<span className="px-2 ml-2 text-xs text-sm text-white bg-red-600 rounded-sm">
									Live
								</span>
							</Link>
							<Link
								className="block mb-3 font-light text-slate-500 hover:text-blue-500"
								href="/events?option=upcoming"
							>
								Upcoming Events
							</Link>
							<Link
								className="block mb-3 font-light text-slate-500 hover:text-blue-500"
								href="/events?option=on-demand"
							>
								Watch on demand
							</Link>
							<Link
								className="block mb-3 font-light text-slate-500 hover:text-blue-500"
								href="/merch"
							>
								Merch
							</Link>
						</div>
						<div className="xs:col-span-4 sm:col-span-2 lg:col-span-2 xs:pt-10 sm:pt-10">
							<Link
								className="block mb-3 font-light text-slate-500 hover:text-blue-500"
								href="/about-us"
							>
								About Us
							</Link>
							<Link
								className="block mb-3 font-light text-slate-500 hover:text-blue-500"
								href="/privacy"
							>
								Privacy Policy
							</Link>
							<Link
								className="block mb-3 font-light text-slate-500 hover:text-blue-500"
								href="/terms-of-use"
							>
								Terms of Use
							</Link>
							<Link
								className="block mb-3 font-light text-slate-500 hover:text-blue-500"
								href="/faq"
							>
								FAQ
							</Link>
							<Link
								className="block mb-3 font-light text-slate-500 hover:text-blue-500"
								href="/esg"
							>
								ESG
							</Link>
						</div>
						<div className="xs:col-span-8 sm:col-span-8 lg:col-span-2">
							<h5 className="mb-4 text-xl font-bold">
								Stay up to date with events
							</h5>
							<div className="flex">
								<input
									type="email"
									onChange={event => setEmailInput(event.target.value)}
									className="px-6 py-3 bg-white border border-r-0 rounded-l-lg grow border-slate-400 placeholder-slate-400 focus:outline-none focus:border-blue-300"
									placeholder="email@example.com"
								/>
								<button className="rounded-r-lg grow-0 py-3 px-6 bg-coventi-500 hover:bg-blue-600 active:bg-blue-700 text-white">
									<div onClick={() => {
										router.push(`${router.pathname}?subscription_email=${emailInput}`);
									}} className="shrink-0">
										<PaperAirplaneIcon className="w-4 h-4" />
									</div>
								</button>
							</div>
						</div>
					</div>
					<hr />
					<hr />
					<div className="grid grid-cols-8 gap-4 pt-6 pb-2">
						<div className="mb-2 xs:col-span-8 sm:col-span-4 lg:col-span-4">
							<div className="flex gap-4 xs:justify-center">
								<a
									href="https://www.linkedin.com/company/linkedinlocallagos/"
									target="_blank"
									className="border border-slate-300 rounded-full p-2 hover:bg-blue-50 active:bg-blue-100 text-gray hover:text-coventi-500 hover:border-blue-200"
								>
									<RiLinkedinFill />
								</a>

								<a
									href="https://instagram.com/coventi.co"
									target="_blank"
									className="border border-slate-300 rounded-full p-2 hover:bg-blue-50 active:bg-blue-100 text-gray hover:text-coventi-500 hover:border-blue-200"
								>
									<RiInstagramFill />
								</a>

								<a
									href="https://twitter.com/Coventi_"
									target="_blank"
									className="border border-slate-300 rounded-full p-2 hover:bg-blue-50 active:bg-blue-100 text-gray hover:text-coventi-500 hover:border-blue-200"
								>
									<RiTwitterFill />
								</a>
							</div>
						</div>
						<div className="xs:col-span-8 sm:col-span-4 lg:col-span-4">
							<p className="font-light xs:text-center text-slate-600 sm:text-right">
								&copy; {new Date().getFullYear()} Coventi. All rights reserved
							</p>
						</div>
					</div>
				</div>
			</div>


			<ModalLayout modalResult={() => router.push(router.pathname)} parameters={{ isOpened: subFormIsOpened, title: 'Subscribe to news and updates.' }} >
				<>
					<form onSubmit={subForm.handleSubmit(onSubmitSubForm)}>
						<div className="mb-4">
							<span className="block text-sm text-gray-500">
								Firstname
							</span>
							<div className="flex items-center">
								<input
									{...subForm.register("firstName", {
										required: "Firstname is required",
										minLength: 2,
									})}
									type="text"
									autoComplete="false"
									className="block w-full p-3 mt-1 placeholder-gray-500 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
									required
									placeholder="Firstname..."
								/>
								{subForm.formState.isValid ? (
									<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
								) : (
									<></>
								)}
							</div>
							{subForm.formState.errors.firstName?.type === "required" && (
								<p className="mt-1 text-xs italic text-red-600">
									{subForm.formState.errors.firstName?.message}
								</p>
							)}
							{subForm.formState.errors.firstName?.type === "minLength" && (
								<p className="mt-1 text-xs italic text-red-600">
									Minimum input length of 2
								</p>
							)}
						</div>

						<div className="block mb-4">
							<span className="block text-sm text-gray-500">Surname</span>

							<div className="flex items-center ">
								<input
									{...subForm.register("surName", {
										required: "Surname is required",
										minLength: 2,
									})}
									type="text"
									autoComplete="false"
									className="block w-full p-3 mt-1 placeholder-gray-500 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
									placeholder="Surname..."
								/>

								{subForm.formState.isValid ? (
									<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
								) : (
									<></>
								)}
							</div>

							{subForm.formState.errors.surName?.type === "required" && (
								<p className="mt-1 text-xs italic text-red-600">
									{subForm.formState.errors.surName?.message}
								</p>
							)}
							{subForm.formState.errors.surName?.type === "minLength" && (
								<p className="mt-1 text-xs italic text-red-600">
									Minimum input length of 2
								</p>
							)}
						</div>

						<div className="block mb-4">
							<span className="text-gray-500">Email</span>
							<div className="flex items-center ">
								<input
									{...subForm.register("email", {
										required: "Email is required",
										minLength: 5,
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Please provide a valid email address!",
										},
									})}
									type="email"
									autoComplete="false"
									pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
									className="block w-full p-3 mt-1 placeholder-gray-500 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
									placeholder="Email..."
								/>

								{subForm.formState.isValid ? (
									<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
								) : (
									<></>
								)}
							</div>

							{subForm.formState.errors.email?.type === "required" && (
								<p className="mt-1 text-xs italic text-red-600">
									{subForm.formState.errors.email?.message}
								</p>
							)}
							{subForm.formState.errors.email?.type === "minLength" && (
								<p className="mt-1 text-xs italic text-red-600">
									Minimum input length of 5
								</p>
							)}
							{subForm.formState.errors.email?.type === "pattern" && (
								<p className="mt-1 text-xs italic text-red-600">
									{subForm.formState.errors.email?.message}
								</p>
							)}
						</div>

						<div className="block mb-4">
							<label
								className="block text-sm text-gray-400"
								htmlFor="phone-input"
							>
								Phone number
							</label>

							<div className="flex items-center">
								<select
									{...subForm.register("countryCode", {
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
									{...subForm.register("phoneNumber", {
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

								{subForm.formState.isValid && (
									<CheckCircleIcon className="h-6 mt-1 text-green-500" />
								)}
							</div>
							{!phoneNumberValid && (
								<p className="mt-1 text-xs italic text-red-600">
									Phone number is required & must be a valid number
								</p>
							)}

							{subForm.formState.errors.phoneNumber?.type === "required" && (
								<p className="mt-1 text-xs italic text-red-600">
									{subForm.formState.errors.phoneNumber?.message}
								</p>
							)}
							{subForm.formState.errors.countryCode?.type === "required" && (
								<p className="mt-1 text-xs italic text-red-600">
									{subForm.formState.errors.countryCode?.message}
								</p>
							)}
							{subForm.formState.errors.phoneNumber?.type === "minLength" && (
								<p className="mt-1 text-xs italic text-red-600">
									Valid phone number only
								</p>
							)}
							{subForm.formState.errors.phoneNumber?.type === "maxLength" && (
								<p className="mt-1 text-xs italic text-red-600">
									Valid phone number only
								</p>
							)}
						</div>


						<CoventiButton
							type="submit"
							text='Submit'
							isBusy={isBusy}
							isDisabled={!subForm.formState.isDirty || !subForm.formState.isValid}
							className="w-full my-4"
						/>



					</form>
				</>
			</ModalLayout>
		</>
	);
}
