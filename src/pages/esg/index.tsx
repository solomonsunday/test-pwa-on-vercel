import Footer from "@/components/Footer";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { FC } from "react";

const ESG: FC = () => {
	return (
		<>

			<NextSeo
				title="ESG - Coventi"
				description="Coventi exists to build a flourishing and appealing community through innovation, taking responsibilities and initiatives, diversity and equality"
				openGraph={
					{
						url: 'https://coventi.co/esg',
						title: 'ESG - Coventi',
						description: "Coventi exists to build a flourishing and appealing community through innovation, taking responsibilities and initiatives, diversity and equality"
					}
				}
			/>

			<div className="container px-3 mx-auto mb-10 space-y-10 py-14 md:space-y-20 md:px-0">
				<section className="flex flex-col items-center justify-center mx-2 mt-20 font-serif md:flex-col lg:flex-row align-center md:mx-0 md:max-w-8xl">
					<div className="items-center flex-initial w-2/3 pr-20 mt-5 mb-10 xs:w-full sm:w-full md:w-full md:mt-12 ">
						<h2 className="text-2xl text-[#200865]  font-bold md:text-6xl">
							{" "}
							Environment, Social And Governance
						</h2>
					</div>
					<div className="flex-initial xs:w-full sm:w-full md:w-full lg:w-1/3 ">
						{" "}
						<p className="mb-4 text-lg">
							{" "}
							Coventi exists to build a flourishing and appealing community
							through innovation, taking responsibilities and initiatives,
							diversity and equality.
						</p>
						<Link href="/events">
							<button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600">
								Buy Event
							</button>
						</Link>
					</div>
				</section>

				<section className="flex flex-col items-center justify-center mx-2 mt-20 font-sans align-center md:mx-0 md:max-w-8xl">
					<div className="w-5/6 m-auto  z-20 h-96 bg-[#D9D9D9] rounded-lg"></div>
					<div
						className="w-full pt-28  items-center justify-center gap-14 xs:gap-0 sm:gap-0 md:gap-0   flex flex-col md:flex-col lg:flex-row px-24  pb-24 -mt-20  bg-gradient-to-r from-[#7ffcdd49] to-[#6082ff42]
] "
					>
						{" "}
						<h2 className="flex-initial  font-sans w-1/3 xs:w-full sm:w-full md:w-full lg:w-2/5 pr-20   md:mt-12 mt-5 mb-10 text-2xl text-[#200865]  font-bold md:text-6xl">
							Environment
						</h2>
						<p className="flex-initial w-2/3 mx-auto text-lg xs:w-full sm:w-full md:w-full lg:w-3/5">
							Coventi is committed to environmental sustainability at a
							corporate, social, and policy level. Our operation focuses on zero
							air pollution, carbon emissions, and high energy efficiency. We
							support our community in its effort to become sustainable and are
							committed to the Paris Agreement and its policies.
						</p>
					</div>
					{/* Social Section */}
					<div
						className="w-full pt-28  font-sans gap-14 xs:gap-0 sm:gap-0 md:gap-0   flex flex-col md:flex-col lg:flex-row px-24  pb-24 -mt-20
] "
					>
						{" "}
						<h2 className="flex-initial w-1/3  xs:w-full sm:w-full md:w-full lg:w-2/5 pr-20   md:mt-12 mt-5 mb-10 text-2xl text-[#200865]  font-bold md:text-6xl">
							Social
						</h2>
						<div className="flex-initial w-2/3 mx-auto text-lg xs:w-full sm:w-full md:w-full lg:w-3/5 lg:mt-11">
							<p className="text-lg">
								Coventi relates excellently with its employees, investors,
								partners clients/customers, and the community with a sense of
								equality diversity, respect, and inclusion.{" "}
							</p>
							<p className="mb-6 text-lg">
								{" "}
								We are committed to human rights, labour relations, gender and
								diversity, employee engagement, and fair remuneration.{" "}
							</p>
							<p className="mb-8 text-lg">
								{" "}
								We understand the importance of the following policies and
								statements as a responsible entity and are wholly committed to
								them.
							</p>

							<ul className="ml-6 list-disc list-inside marker:text-green">
								<li>Summary of Policies for Employees</li>
								<li>Child and Forced Labour Policy</li>
								<li>Vendor Code of Conduct</li>
								<li>Human Rights Statement</li>
								<li>Social indicator Table</li>
								<li>Sexual Harassment Policy</li>
								<li>Mission Statement</li>
								<li>Vision Statement</li>
							</ul>
						</div>
					</div>
					{/* Social Section */}
					<div
						className="w-full pt-28  gap-14 xs:gap-0 sm:gap-0 md:gap-0   flex flex-col md:flex-col lg:flex-row px-24  pb-24 -mt-20
] "
					>
						{" "}
						<h2 className="flex-initial w-1/3  xs:w-full sm:w-full md:w-full lg:w-2/5 pr-20   md:mt-12 mt-5 mb-10 text-2xl text-[#200865]  font-bold md:text-6xl">
							Governance
						</h2>
						<div className="flex-initial w-2/3 mx-auto text-lg xs:w-full sm:w-full md:w-full lg:w-3/5 lg:mt-11">
							<p className="text-lg">
								The board and executives of Coventi are a diverse and inclusive
								group committed to the interests of the company’s various
								stakeholders – employees, shareholders and customers. Its board
								members act in a genuine fiduciary relationship with
								stockholders and are careful to avoid any conflicts of interest
								with their duty. Coventi is committed to the rule of law in its
								jurisdiction and to financial and accounting transparency and
								full, honest and periodic financial recording and reporting.{" "}
							</p>
							<p className="mb-6 text-lg">
								{" "}
								We understand the importance of the following policies and
								statements as a responsible entity and are wholly committed to
								them.{" "}
							</p>
							<ul className="ml-6 list-disc list-inside">
								<li>Corporate Governance Guidelines</li>
								<li>Audit Committee Charter</li>
								<li>Compensation Committee Charter</li>
								<li>Nominating Committee Charter</li>
								<li>Code of Business Conduct and Ethics</li>
								<li>Insider Trading Policy</li>
								<li>Anti-Money Laundering Policy</li>
								<li>Proxy Voting Policy</li>
								<li>Information Barriers Policy</li>
								<li>Business Continuity</li>
								<li>Consumer Data Protection Policy</li>
								<li>Governance Indicators Table</li>
								<li>ESG Integration in the investment process</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
};
export default ESG;
