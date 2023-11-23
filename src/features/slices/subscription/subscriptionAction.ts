import { SubscriptionService } from "@/features/services";
import { UserRegisterDto } from "../auth/authInterface";

export async function submitSubscription(subDto: Omit<UserRegisterDto, 'password'> & { countryCode: string }) {
	return SubscriptionService.submitSubscription(subDto);
}
