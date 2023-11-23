import { UserRegisterDto } from "../slices/auth/authInterface";
import { postFunc } from "./common/request";

export async function submitSubscription<TResponse>(subDto: Omit<UserRegisterDto, 'password'> & { countryCode: string }) {
	return postFunc<TResponse>({ path: `/subscription/create`, payload: subDto });
}