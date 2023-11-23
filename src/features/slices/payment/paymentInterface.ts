import {
  IBaseMongoId,
  IBaseCreateEditDate,
  IBaseReferenceId,
} from "@/common/base.interface";
import { IEvent } from "../event/eventInterface";
import { IUser } from "../user/userInterface";

export interface IPayment
  extends IBaseMongoId,
    IBaseCreateEditDate,
    IBaseReferenceId {
  amount: number;
  userId: string;
  user?: IUser;
  eventId: string;
  event?: IEvent;
  status: PaymentStatusType;
  reference: string;
}
export type PaymentStatusType = `${PaymentStatusEnum}`;
export enum PaymentStatusEnum {
  SUCCESS = "successful",
  FAIL = "failed",
	PENDING = "pending",
	CANCELLED = 'cancelled'
}

export interface IFlutterwaveTransaction {
  id: number;
  tx_ref: string;
  flw_ref: string;
  device_fingerprint: string;
  amount: number;
  currency: string;
  charged_amount: number;
  app_fee: number;
  merchant_fee: number;
  processor_response: string;
  auth_model: string;
  ip: string;
  narration: string;
  status: PaymentStatusType;
  payment_type: string;
  created_at: string;
  account_id: number;
  card: {
    first_6digits: string;
    last_4digits: string;
    issuer: string;
    country: string;
    type: string;
    token: string;
    expiry: string;
  };
  meta: {
    __CheckoutInitAddress: string;
    userId: string;
    eventId: string;
  };
  amount_settled: number;
  customer: {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    created_at: string;
  };
}
