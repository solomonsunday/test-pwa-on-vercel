import Image from "next/image";

import { useAppSelector } from '@/store/hooks'
import Avatar from '../Avatar';
import { toTitleCase } from "@/common/utility";
import { IUser } from "@/features/slices/user/userInterface";


export default function AdminTopNav() {
	const user = useAppSelector(state => state.auth.data?.user);
	return (
		<div className='flex justify-between items-center px-6 shadow py-2'>
			<Image src="/assets/images/app-logo.svg" alt="coventi_logo" width='100' height='0'
			/>
			<div className="flex items-center gap-2">
				<p className="text-base">{toTitleCase(user?.firstName)} {toTitleCase(user?.surName)}</p>
				<Avatar user={user as IUser} />
			</div>
		</div>
	)
}
