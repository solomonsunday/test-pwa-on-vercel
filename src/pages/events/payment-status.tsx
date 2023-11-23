import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { confirmPayment } from "@/features/slices/payment/paymentAction";
import { useAlert } from "@/contexts/ApplicationContext";
import { PaymentStatusEnum, PaymentStatusType } from "@/features/slices/payment/paymentInterface";
import AppLoader from "@/components/Reusable/AppLoader";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { IEvent } from "@/features/slices/event/eventInterface";
import UserLayout from "@/components/layouts/UserLayout";
import CoventiButton from "@/components/Button";
import { CheckCircleIcon, NoSymbolIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function PaymentStatus() {
	const { sendErrorAlert } = useAlert();
	const router = useRouter();
	const [paymentStatus, setPaymentStatus] = useState<PaymentStatusType>(PaymentStatusEnum.PENDING);
	const [event, setEvent] = useState<Pick<IEvent, '_id' | 'name' | 'referenceId'> | null>(null);

	//Protected route
	useProtectedRoute();
	//Protected route

	useEffect(() => {
		helpProcessPayment();
	}, [router.query]);


	function helpProcessPayment() {
		const transactionId = router?.query?.transaction_id as string;
		const status = router?.query?.status as PaymentStatusType;
		if (!transactionId && status !== PaymentStatusEnum.CANCELLED) return;
		if (status === PaymentStatusEnum.CANCELLED) {
			setPaymentStatus(status);
			return;
		}
		confirmPayment(transactionId)
			.then(response => {
				setEvent(response.event);
				setPaymentStatus(response.status);
			})
			.catch(error => sendErrorAlert(error));
	}



	function renderCancelled(): JSX.Element {
		return <>
			<div className="flex justify-center items-center mb-6">
				<NoSymbolIcon className="xs:h-24 xs:w-24 sm:h-28 md:h-36 md:w-36 text-red-500" />
			</div>
			<div className="text-center mb-8">
				<h2 className="xs:text-2xl text-4xl mb-4 text-[#090055]">Payment cancelled!</h2>
				<p className="text-base">You have cancelled the payment. You can retry.</p>
			</div>
			<div className="flex justify-center">
				<CoventiButton url="/events" text='See events' className="px-14" />
			</div>
		</>
	}


	function renderfailed(): JSX.Element {
		return <>
			<div className="flex justify-center items-center mb-6">
				<XCircleIcon className="xs:h-24 xs:w-24 sm:h-28 md:h-36 md:w-36 text-red-500" />
			</div>
			<div className="text-center mb-8">
				<h2 className="xs:text-2xl text-4xl mb-4 text-[#090055]">Payment failed!</h2>
				<p className="text-base">Your payment failed. Please try again later.</p>
			</div>
			<div className="flex justify-center">
				<CoventiButton url={event ? '/event' + event.referenceId : '/event'} text='Try again' className="px-14" />
				{/* <p className="text-coventi">Close</p> */}
			</div>
		</>
	}


	function renderSuccess(): JSX.Element {
		return <>
			<div className="flex justify-center items-center mb-6">
				<CheckCircleIcon className="xs:h-24 xs:w-24 sm:h-28 md:h-36 md:w-36 text-green-500" />
			</div>
			<div className="text-center mb-8">
				<h2 className="xs:text-2xl text-4xl mb-4 text-[#090055]">Thank you for your purchase!</h2>
				<p className="text-base">Your payment has been processed successfully. We have sent you an email with your ticket details. Please check your email for more information.</p>
			</div>
			<div className="flex justify-center items-center gap-6">
				<CoventiButton text='Buy for others' className="px-8" />
				<Link className="hover:underline text-coventi" href={event ? '/events' + '/watch/' + event._id : '/event'}>Stream your event</Link>
			</div>
		</>
	}

	return (
		<UserLayout>
			<div className="controller max-w-3xl mx-auto py-1 xs:pt-24 sm:pt-20 px-6">
				{paymentStatus === PaymentStatusEnum.FAIL && renderfailed()}
				{paymentStatus === PaymentStatusEnum.SUCCESS && renderSuccess()}
				{paymentStatus === PaymentStatusEnum.PENDING && <AppLoader />}
				{paymentStatus === PaymentStatusEnum.CANCELLED && renderCancelled()}
			</div>
		</UserLayout>
	);
}
