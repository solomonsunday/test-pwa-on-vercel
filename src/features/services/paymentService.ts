import { AxiosRequestConfig } from "axios";
import { getFunc, postFunc } from "./common/request";

export async function requestPayment<TResponse>(eventId: string) {
  return postFunc<TResponse>({
    path: `/payment/request`,
    payload: { eventId },
  });
}

export async function confirmPayment<TResponse>(
  options: AxiosRequestConfig<any>
) {
  return getFunc<TResponse>({ path: "/payment/callback", options });
}

export async function confirmPaymentStatus<TResponse>(transaction_id: string) {
  return getFunc<TResponse>({
    // options: {
    //   params: { transaction_id: transaction_id },
    // },
    path: `/payment/callback?transaction_id=${transaction_id}`,
  });
}
