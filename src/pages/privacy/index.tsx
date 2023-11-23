import Footer from "@/components/Footer";
import UserLayout from "@/components/layouts/UserLayout";
import { NextSeo } from "next-seo";
import React, { FC } from "react";

const PrivacyPolicy: FC = () => {
	return (
		<>

			<NextSeo
				title="Privacy policy - Coventi"
				description="We will under no situation knowingly sell, exchange, or otherwise disclose your personal information to third parties, except with your consent."
				openGraph={
					{
						url: 'https://coventi.co/policy',
						title: 'Privacy policy - Coventi',
						description: "We will under no situation knowingly sell, exchange, or otherwise disclose your personal information to third parties, except with your consent."
					}
				}
			/>


			<UserLayout>
				<div className="container px-3 mx-auto mb-10 space-y-10 md:space-y-20 md:px-0">
					<div className="flex">
						<div className="fixed h-full w-80">
							<div className="hidden col-span-1 px-3 py-3 space-y-3 md:block">
								<div className="text-2xl font-bold  text-[#200865]">
									Privacy Policy
								</div>
								<p>
									<a href="#general"> General </a>
								</p>
								<p>
									<a href="#aboutOurService"> About our services </a>
								</p>
								<p>
									<a href="#whatPersonalData">
										{" "}
										1. What personal data we hold and how we collect it{" "}
									</a>
								</p>
								<p>
									<a href="#applicability">
										{" "}
										2. Applicability of this service{" "}
									</a>
								</p>
								<p>
									<a href="#whatWeUse">
										{" "}
										3. What we use your personal data for{" "}
									</a>
								</p>
								<p>
									<a href="#yourRightRegarding">
										{" "}
										4. Your right regarding the use of your personal information
									</a>
								</p>
								<p>
									<a href="#sharingYourPersonal">
										{" "}
										5. Sharing your personal information{" "}
									</a>
								</p>
								<p>
									<a href="#retentionPeriod"> 6. Retention period </a>
								</p>
								<p>
									<a href="#dataSecurity">7. Data security and transfer </a>
								</p>
								<p>
									<a href="#securityOfPersonalinformation">
										{" "}
										8. Security of personal information
									</a>
								</p>
							</div>
						</div>
						<div className="md:pl-80">
							<div className="col-span-4 px-3 py-3 text-lg shadow-lg md:col-span-3">
								<div className="mb-2">Updated at Sept, 2023</div>
								<div id="general">
									<h1 className="mb-2 text-xl text-[#200865]  font-bold md:text-3xl">
										General
									</h1>
									<p className="col-span-2 mb-4 text-lg ">
										Lead Innovative Concepts Limited (“Lead Innovative” and/or
										Company”) is a private company duly incorporated in Nigeria.
										All references to “our”, “us”, or “we” within this policy
										refer to the Company, its subsidiaries, affiliates and
										associates or any third party which may assume ownership
										and/or control of Coventi and its content. All references to
										“you” and “your” refer to any person who signs up on
										Coventi. We respect your privacy and are committed to
										protecting it through our compliance with this privacy
										policy “Policy” and applicable privacy laws. Our Privacy
										Policy sets out how and why we collect, use, share and
										protect your personal information.
									</p>
								</div>
								<div id="aboutOurService">
									<h2 className=" mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
										About our services
									</h2>

									<p className="mb-2 text-lg">
										Lead Innovative is a technology-based company engaged in
										promoting virtual and augmented reality experiences and
										lifestyles in Nigeria through its live streaming Platform -
										Coventi (“Website”/ “Platform”). The platform provides the
										highest quality immersive live streaming experience for
										concerts/events. Our expertise focuses on delivering top
										notch livestream services in the media and entertainment
										industry.
									</p>
									<p className="mb-2 text-lg">
										We also enable concert organizers to reach highest capacity
										of audience to livestream their concerts, world-wide.
										Through Coventi, persons who are physically unable to attend
										concerts or other events, for any reason whatsoever, can
										have full access to concerts at their convenience.
									</p>
									<p className="mb-2 text-lg">
										{" "}
										By accessing and using Coventi, we may collect certain
										personal information, which we commit to handle in the
										manner described in this Policy.
									</p>
									<p className="mb-2 text-lg">
										Please read the terms of this Policy carefully before using
										the Website. If you disagree in any way with the terms
										stated herein, you should not use or access the Website as
										your continued use will amount to your consent to this
										Policy and the use and sharing of your information in the
										manner described in this Policy.
									</p>
									<p className="mb-4 text-lg">
										We may update this Policy from time to time and if we make
										any material changes, we will notify you when we do so. We
										will provide you with the opportunity to review such
										changes. By continuing to use the Website after the changes
										have been made and we have notified you of them, you consent
										that the way we use your personal data will be subject to
										the terms of the updated policy.
									</p>
								</div>
								<div>
									<h5 className="mb-2"> This policy covers: </h5>
									<div className="mx-5 mb-4">
										<ul role="list" className="list-style-position">
											<li>What personal data we hold and how we collect it;</li>
											<li>Applicability of this Policy</li>
											<li>
												What we use your personal data for; Your rights
												regarding the use of your personal information;
											</li>
											<li> Sharing your personal data;</li>
											<li> Retention Periods;</li>
											<li>Data security and transfers;</li>
											<li>
												{" "}
												Security of Personal Information; and Your rights.
											</li>
										</ul>{" "}
									</div>
									<p className="mb-2 text-lg">
										If you have any further questions about how we process your
										information, or if you would like to exercise any of your
										rights regarding your personal information as set out in
										Paragraph 1.1, please contact us using the details below:
									</p>{" "}
									<p className="mb-4 text-lg">
										{" "}
										Name: Kunle Bamigboye <br />
										Email address: info@coventi.co <br />
										Phone Number: +234 803 460 4777
									</p>
								</div>
								<div id="whatPersonalData">
									<h2 className=" mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
										1. WHAT PERSONAL DATA WE HOLD AND HOW WE COLLECT IT
									</h2>
									<p className="col-span-2 mb-4 text-lg">
										To help improve your experience and to deliver the services
										we render on the Platform (“Services”), we collect
										information from/about you in a variety of ways when you
										interact with our Website. Such information is categorized
										as follows:
									</p>

									<p className="col-span-2 mb-4 text-lg">
										<span className="font-bold">1.1. </span> Personal Details
										<br /> We typically collect personal information provided at
										“sign up”, which may include your name, address, e-mail
										address, phone number, age, username, password, and other
										registration information, personal description and
										photograph.
										<br /> 1.2. Company Information <br />
										Where applicable, we may also collect your company
										information such as your company registration number, Tax
										Identification Number, sector of business, and office
										address.
										<br /> 1.3. Technical information and analytics
										<br /> When you use our Platform, we may automatically
										collect the following information where this is permitted by
										your device settings:
										<br /> 1.3.1 technical information, including the address
										used to connect your mobile phone or other device to the
										internet, your login information, system and operating
										system type and version, browser or Platform version, time
										zone setting, operating system and platform, and your
										location (based on IP address).
										<br /> 1.3.2 information about your site visit, including
										products and services you viewed or used, Platform response
										times, interaction information (such as button presses) and
										any phone number used to call our customer service number.
										Cookies and similar technologies may be used to collect this
										information, such as your interactions with our Services.
										<br />
									</p>
								</div>
								<div id="applicability">
									<h2 className="mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
										<span className="font-bold"> 2.</span> APPLICABILITY OF THIS
										POLICY
									</h2>
									<p className="col-span-2 mb-4 text-lg">
										By accessing, previewing, or otherwise using the Website in
										any manner, you represent and acknowledge that you are at
										least 18 (Eighteen) years of age, or if you are under 18
										(Eighteen) years of age i.e., a “Minor” that you are using
										the Website with the consent of your parent or legal
										guardian. If you are a parent or legal guardian of a Minor,
										you hereby agree to bind the Minor to this Policy
									</p>
								</div>
								<div id="whatWeUse">
									<h2 className=" mt-5 mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
										<span className="font-bold"> 3. </span> WHAT WE USE YOUR
										PERSONAL DATA FOR
									</h2>
									<div className="col-span-2 text-lg">
										<p className="mb-2 text-lg font-bold">
											The purposes for which we use your personal data are
											detailed below:
										</p>
										<p className="mb-2 text-lg">
											{" "}
											<span className="font-bold"> 3.1</span> To offer and
											provide you with our Services and to support our business
											functions.
										</p>
										<p className="mb-2 text-lg">
											{" "}
											<span className="font-bold"> 3.2 </span>To register your
											account, fulfill your requests for Services and
											communicate with you about such requests.
										</p>
										<p className="mb-2 text-lg">
											<span className="font-bold">3.3 </span> To respond to
											reviews, comments, or other feedback you provide us.
										</p>
										<p className="mb-2 text-lg">
											{" "}
											<span className="font-bold"> 3.4</span> As may be
											necessary to establish, exercise, and defend legal rights.
										</p>
										<p className="mb-2 text-lg">
											<span className="font-bold"> 3.5</span> To evaluate and
											improve our business, including developing new products
											and services.
										</p>
										<p className="mb-2 text-lg">
											{" "}
											<span className="font-bold"> 3.6 </span>To provide,
											administer, and communicate with you about the services
											and other offers to Coventi.
										</p>
									</div>
									<div id="yourRightRegarding">
										<h2 className=" mt-5 mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
											<span className="font-bold"> 4.</span>YOUR RIGHTS
											REGARDING THE USE OF YOUR PERSONAL INFORMATION
										</h2>
										<p className="mb-2 text-lg">
											You are entitled to the following rights regarding the use
											of your personal information:
										</p>
										<p className="mb-2 text-lg">
											<span className="font-bold"> 4.1</span> To withdraw
											consent to the processing of your information at any time,
											without affecting the lawfulness of processing of your
											information which you previously consented to. Note that
											if you revoke your consent to such processing, we will be
											unable to provide you with the Service(s) for which such
											consent is required.
										</p>
										<p className="mb-2 text-lg">
											{" "}
											<span className="font-bold">4.2</span>To restrict the use
											of your personal information to specific purposes.
										</p>
										<p className="mb-2 text-lg">
											{" "}
											<span className="font-bold"> 4.3</span> To request for the
											deletion of your personal information, subject to any
											overriding legitimate grounds for the retention of same,
											such as our obligation to store your personal information
											and company details for prescribed periods of time.
										</p>
										<p className="mb-2 text-lg">
											<span className="font-bold"> 4.4</span> To request for,
											and receive free of charge, any information regarding you
											which has been collected on the Platform, in concise &
											intelligible written form; provided that where such
											request is determined by us to be manifestly unfounded or
											excessive, we shall be entitled to charge a reasonable fee
											for same, taking into consideration, inter alia the
											administrative costs of providing such information.
										</p>{" "}
										<p className="mb-2 text-lg">
											<span className="font-bold"> 4.5</span> To contest the
											accuracy of your personal information, and to procure the
											rectification of any inaccurate information.
										</p>
										<p className="mb-2 text-lg">
											{" "}
											<span className="font-bold"> 3.8</span> To help us
											personalize our Service offerings in order to improve your
											experience on the Website, and to protect the security and
											integrity of our Services.
										</p>
									</div>
								</div>
								<div id="sharingYourPersonal">
									<h2 className=" mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
										<span className="font-bold"> 5.</span> SHARING YOUR PERSONAL
										INFORMATION
									</h2>
									<p className="mb-2 text-lg">
										We will under no situation knowingly sell, exchange, or
										otherwise disclose your personal information to third
										parties, except with your consent. We may, however, share
										information that we collect about you (including personally
										identifiable information) as follows:
									</p>
									<p className="mb-2 text-lg">
										{" "}
										<span className="font-bold"> 5.1</span> members of our
										corporate group and our partners to aid the optimal delivery
										of our Services to you.
									</p>
									<p className="mb-2 text-lg">
										{" "}
										<span className="font-bold">5.2</span> with companies and
										pre-vetted professionals we have engaged to provide
										Services, on our behalf, including those who act as data
										processors on our behalf, acting strictly under contract in
										accordance with applicable data protection laws. Those data
										processors are bound by strict confidentiality and data
										security provisions, and they can only use your data in the
										ways specified by us.
									</p>
									<p className="mb-2 text-lg">
										{" "}
										<span className="font-bold"> 5.3</span> We may share with
										our commercial partners aggregated data that does not
										personally identify you, but which shows general trends, for
										example, the number of users of our Services.
									</p>

									<p className="mb-2 text-lg">
										{" "}
										<span className="font-bold">5.4</span>We may preserve or
										disclose information about you to comply with a law,
										regulation, legal process, or governmental request; to
										assert legal rights or defend against legal claims; or to
										prevent, detect, or investigate illegal activity, fraud,
										abuse, violations of our terms, or threats to the security
										of our Services or the physical safety of any person.{" "}
									</p>
								</div>
								<div id="retentionPeriod">
									<h2 className=" mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
										6. RETENTION PERIODS
									</h2>

									<p className="col-span-2 mb-4 text-lg">
										We retain your information in accordance with national and
										international best practice. However, we may retain records
										for a longer period as required by law or regulation.
									</p>
								</div>
								<div id="dataSecurity">
									<h2 className=" mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
										7. DATA SECURITY AND TRANSFERS We store all your personal
										and
									</h2>

									<p className="col-span-2 mb-4 text-lg">
										corporate information on secure servers. We encrypt data
										transmitted to and from the Platform. Once we have received
										your information, we will use strict procedures and security
										features to prevent unauthorised access. We will take all
										steps reasonably necessary to ensure that your data is
										treated securely and in accordance with this Policy. Your
										data may be processed or stored via destinations outside of
										Nigeria (e.g. where we work with third parties who help
										deliver our Services to you, whose servers may be located
										outside of Nigeria), but always in accordance with
										applicable data protection laws, including mechanisms to
										lawfully transfer data across borders, and subject to strict
										safeguards.{" "}
									</p>
								</div>
								<div id="securityOfPersonalinformation">
									<h2 className=" mb-2 text-xl text-[#200865]  font-bold md:text-2xl capitalize">
										8. SECURITY OF PERSONAL INFORMATION
									</h2>
									<p className="col-span-2 ml-8 text-lg">
										Where you have chosen a password that enables you to access
										our Website, you are responsible for keeping this password
										confidential. We ask you not to share the password with
										anyone. Despite our very judicious efforts, you understand
										and accept that there is still a risk to your personal
										information being gained access to without authorisation due
										to the fact that there is no full guarantee of fidelity as
										per information transmitted across the internet. You are
										however advised to adhere to our security protocols at all
										times. We will not be liable for any unauthorized access to
										your personal information, save to the extent that such
										access is as a result of the willful negligence of the
										Company, its affiliates or authorised representatives.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</UserLayout>

			<Footer />
		</>
	);
};

export default PrivacyPolicy;
