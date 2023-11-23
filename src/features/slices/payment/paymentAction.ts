import { PaymentService } from "@/features/services";
import { IEvent } from "../event/eventInterface";
import { PaymentStatusType } from "./paymentInterface";

export async function requestPayment(eventId: string) {
	const response = await PaymentService.requestPayment<{ link: string }>(
		eventId
	);
	return response;
}

export async function confirmPayment(transactionId: string) {
	const response = await PaymentService.confirmPaymentStatus<{
		status: PaymentStatusType;
		event: Pick<IEvent, '_id' | 'name' | 'referenceId'>;
	}>(transactionId);
	return response.data;
}
