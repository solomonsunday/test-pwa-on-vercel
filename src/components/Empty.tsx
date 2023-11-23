import { CloudIcon } from "@heroicons/react/24/solid";

export default function Empty(): JSX.Element {

	return (
		<div className="flex items-center justify-center w-full my-36">
			<div className="flex flex-col items-center justify-center px-auto">
				<CloudIcon className="w-36 h-36" />
				<div className="mt-6 text-center">
					<p className="text-lg font-semibold">
						You currently have no data
					</p>
					<p>Your data will apear here when available</p>
				</div>
			</div>
		</div>
	)
}
