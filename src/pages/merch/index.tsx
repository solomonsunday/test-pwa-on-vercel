import Footer from "@/components/Footer";
import { NextSeo } from "next-seo";

export default function Merch() {
	return (
		<>
			<NextSeo
				title="Merch - Coventi"
				// description="Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
				openGraph={
					{
						url: 'https://coventi.co/faq',
						title: 'Merch - Coventi',
						// description: "Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
					}
				}
			/>

			<div className="container px-3 mx-auto mb-10 space-y-10 py-14 md:space-y-20 md:px-0">
				<section className="mx-2 font-serif text-center md:mx-0 md:max-w-8xl">
					<h1 className="md:mt-12 mt-5 mb-10 text-2xl text-[#200865]  font-bold md:text-7xl">
						{" "}
						Coming soon
					</h1>
				</section>
			</div>
			<Footer />
		</>
	);
}
