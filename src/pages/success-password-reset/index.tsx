import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const Success: FC = () => {
	return (
		<div>
			<Link href="/">
				<div className="hidden p-10 md:block">
					<Image
						className="mb-12"
						src={"/assets/images/app-logo.svg"}
						alt={"coventi_logo"}
						width={127}
						height={0}
					/>
				</div>
			</Link>
			<div className="flex flex-col items-center py-24 space-y-4 text-center">
				<div className="">
					<img src="/assets/images/security.svg" />
				</div>
				<div className="pt-5 text-center">
					<p className="text-4xl font-bold text-center">
						Password Reset Successful
					</p>
				</div>
				<p>You have successfully changed your password</p>
				<div className="w-full">
					<Link className="py-3 text-white bg-blue-500 rounded-full cursor-pointer px-28 hover:bg-blue-600" href="/login">
						Return to Login
					</Link>
					
				</div>
			</div>
		</div>
	);
};

export default Success;
