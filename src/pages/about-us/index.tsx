import { isValidPhoneNumber } from "@/common/utility";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCountryCodes } from "@/features/slices/utility/utilityAction";
import { ICountryCode } from "@/features/slices/utility/utilityInterface";
import Footer from "@/components/Footer";
import { NextSeo } from "next-seo";

const Aboutus: FC = () => {
	const { register } = useForm({ mode: "onChange" });
	const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);
	const [countryCodes, setCountryCodes] = useState<ICountryCode[]>([]);

	function helpSetCountryCodes() {
		setCountryCodes(getCountryCodes());
	}

	useEffect(() => {
		helpSetCountryCodes();
	}, []);

	const validatePhoneNumber = (e: { target: { value: any } }) => {
		const phoneNumber = e.target.value;
		setPhoneNumberValid(isValidPhoneNumber(phoneNumber));
	};
	return (
		<>
			<NextSeo
				title="About Us - Coventi"
				description="We are the first indigenous 100% streaming-as-a-service platform, providing the highest quality immersive livestreaming experience for your concerts"
				openGraph={
					{
						url: 'https://coventi.co/about-us',
						title: 'About Us - Coventi',
						description: 'We are the first indigenous 100% streaming-as-a-service platform, providing the highest quality immersive livestreaming experience for your concerts'
					}
				}
			/>


			<div className=" container px-3 mx-auto mb-10 space-y-10 py-14 md:space-y-20 md:px-0">
				<section className="mx-2 font-serif text-center md:mx-0 md:max-w-8xl">
					<h1 className="md:mt-12 mt-5 mb-10 text-2xl text-[#200865]  font-bold md:text-7xl">
						{" "}
						Streaming-as-a-service
					</h1>
					<p className="max-w-2xl mx-auto text-lg">
						{" "}
						We are the first indigenous 100% streaming-as-a-service platform,
						providing the highest quality immersive livestreaming experience for
						your concerts.
					</p>
				</section>
				<section className="">
					<div className="rounded-2xl h-80 md:h-[26rem] url(/assets/images/audience.svg)] bg-no-repeat bg-cover"></div>
				</section>
				<section className="space-y-10 md:space-y-28">
					<div className="grid gap-5 md:gap-20 md:grid-cols-3 md:grid-col-3">
						<p className="text-3xl font-bold text-center md:text-5xl">
							Our Vision
						</p>
						<div className="col-span-2 text-lg">
							{" "}
							Our vision is to become a first-rate company in Media &
							Entertainment, revolutionising the way people connect, experience,
							and share live moments. Through our innovative livestreaming
							platform, we strive to empower creators by providing them with a
							global stage to express, inspire, and connect.
						</div>
					</div>

					<div className="flex flex-col-reverse md:flex-row justify-between">
						<div className="w-full mt-20 md:mt-0 md:w-1/2 rounded-2xl h-96 bg-[url(/assets/images/family-time.svg)] bg-no-repeat bg-cover"></div>
						<div className="w-full md:w-1/2 md:ml-12 ">
							<h2 className="pt-10 px-5 font-serif text-3xl font-bold md:pt-0 md:text-5xl">
								Why Coventi ?
							</h2>

							<div className="px-5 mt-5 md:mt-10 md:ml-12">
								<div className="flex items-center mb-4 md:mb-6">
									<div className="pr-3 md:pr-6">
										<img
											src="/assets/images/green-bg-check.svg"
											alt="green-check"
											className="w-5 h-5 md:w-6 md:h-6"
										/>
									</div>
									<div>Dedicated mobile pack</div>
								</div>
								<div className="flex items-center mb-4 md:mb-6">
									<div className="pr-3 md:pr-6">
										<img
											src="/assets/images/green-bg-check.svg"
											alt="green-check"
											className="w-5 h-5 md:w-6 md:h-6"
										/>
									</div>
									<div>Stream video up to 4k screen size</div>
								</div>
								<div className="flex items-center mb-4 md:mb-6">
									<div className="pr-3 md:pr-6">
										<img
											src="/assets/images/green-bg-check.svg"
											alt="green-check"
											className="w-5 h-5 md:w-6 md:h-6"
										/>
									</div>
									<div>Stream on UHD and adjust to bandwidth size</div>
								</div>
								<div className="flex items-center mb-4 md:mb-6">
									<div className="pr-3 md:pr-6">
										<img
											src="/assets/images/green-bg-check.svg"
											alt="green-check"
											className="w-5 h-5 md:w-6 md:h-6"
										/>
									</div>
									<div>Several events monetization options</div>
								</div>
								<div className="flex items-center">
									<div className="pr-3 md:pr-6">
										<img
											src="/assets/images/green-bg-check.svg"
											alt="green-check"
											className="w-5 h-5 md:w-6 md:h-6"
										/>
									</div>
									<div>Several event customization options</div>
								</div>
							</div>
						</div>
					</div>

					<div className="grid gap-5 pb-10 md:grid-cols-12 md:gap-20 md:grid-col-3">
						<div className="col-span-12 md:col-span-7">
							<p className="pb-8 font-serif text-3xl font-bold md:text-5xl">
								Take your brand to a global audience
							</p>
							<div className="col-span-8">
								{" "}
								<div className="space-y-5 md:space-y-10 ">
									<div className="flex ">
										<div className="pr-5">
											<img
												src="/assets/images/audience-icon.svg"
												alt="green-check"
												//   width={80}
												className="w-32 md:w-16"
											/>
										</div>
										<div>
											<h2 className="pb-2 font-serif text-lg text-[#200865]">
												{" "}
												Enrich audience reach
											</h2>
											<span>
												Expand the reach and coverage of your in-person events
												by opening it to larger audiences.
											</span>
										</div>
									</div>
									<div className="flex ">
										<div className="pr-5">
											<img
												src="/assets/images/ticket-icon.svg"
												alt="green-check"
												//   width={70}
												className="w-28 md:w-16"
											/>
										</div>
										<div>
											<h2 className="pb-2 font-serif text-lg text-[#200865]">
												{" "}
												Sell ticket online
											</h2>
											<span>
												Use Coventi to costomise your event, issue free/paid
												tickets and recruit sponsors.
											</span>
										</div>
									</div>
									<div className="flex ">
										<div className="pr-5">
											<img
												src="/assets/images/stats-ions.svg"
												alt="green-check"
												//   width={40}
												className="w-16 md:w-30"
											/>
										</div>
										<div>
											<h2 className="pb-3 font-serif text-lg text-[#200865]">
												Track result and ROI
											</h2>
											<span>
												Track statistics and useful data for your event.
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-12 md:col-span-5">
							<div className="w-full px-5 border md:px-10 py-7 border-slate-200 rounded-xl">
								<form>
									<label className="text-slate-400">Full name</label>
									<input
										type="text"
										className="w-full py-3 pl-3 mt-3 mb-5 bg-transparent border rounded-lg focus:outline-none focus:border-blue-300 placeholder:text-slate-300 border-slate-200"
										placeholder="e.g John Deo"
									/>
									<label className="text-slate-400">Email</label>
									<input
										type="email"
										className="w-full py-3 pl-3 mt-3 mb-5 bg-transparent border rounded-lg focus:outline-none focus:border-blue-300 placeholder:text-slate-300 border-slate-200"
									/>
									<div className="mb-2">
										<label className="text-slate-400">Phone Number</label>
										{/* phone number input form */}
										<div className="grid grid-cols-12 gap-3 mt-3">
											<label
												className="relative block col-span-4"
												htmlFor="grid-state"
											>
												{/* <span className="absolute inset-y-0 left-0 flex items-center pl-3 mb-3 cursor-pointer">
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="16" height="12" fill="#F5F8FB" />
                          <rect width="5" height="12" fill="#2B9F5A" />
                          <rect x="11" width="5" height="12" fill="#2B9F5A" />
                        </svg>
                      </span> */}

												<div className="relative">
													<select
														{...register("countryCode", {
															required: "Country code is required",
														})}
														// className="w-full p-3 mt-1 text-gray-600 bg-transparent border border-r-0 border-gray-300 rounded-l-lg appearance-none focus:outline-none basis-4/12 focus:border-blue-300"
														className="block w-full px-4 py-3 pl-10 pr-8 mt-1 leading-tight text-gray-700 bg-transparent border border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-blue-300"
														placeholder="kljhyv"
													>
														<option value="">Country</option>
														{countryCodes.map((item) => (
															<option value={item.dialCode} key={item.code}>
																{item.name} ({item.dialCode})
															</option>
														))}
													</select>
												</div>
												{/* <span className="absolute inset-y-0 flex items-center pl-3 mb-3 text-gray-700 pointer-events-none right-2">
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </span> */}
											</label>

											{/* <input
                      type="tel"
                      className="w-full col-span-9 py-3 pl-3 mb-3 bg-transparent border rounded-lg focus:outline-none focus:border-blue-300 placeholder:text-slate-300 border-slate-200"
                    /> */}
											<input
												{...register("phoneNumber", {
													required:
														"Phone number is required & must be a valid number",
													minLength: 10,
												})}
												maxLength={15}
												type="tel"
												autoComplete="false"
												onChange={(e) => validatePhoneNumber(e)}
												className="w-full col-span-8 py-3 pl-3 mb-3 bg-transparent border rounded-lg focus:outline-none focus:border-blue-300 placeholder:text-slate-300 border-slate-200"
												placeholder="Phone number..."
											/>
										</div>
										{!phoneNumberValid && (
											<p className="mt-1 text-xs italic text-red-600">
												Phone number is required & must be a valid number
											</p>
										)}
									</div>

									<label className=" text-slate-400">Enter Message</label>
									<textarea
										cols={5}
										rows={8}
										className="w-full pl-3 mt-3 mb-3 bg-transparent border rounded-lg focus:outline-none focus:border-blue-300 border-slate-200 placeholder:text-slate-300"
									/>

									<div className="mt-5">
										<button className="w-full py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
};

export default Aboutus;
