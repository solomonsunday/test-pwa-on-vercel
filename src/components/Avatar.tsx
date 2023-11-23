import { getInitials } from '@/common/utility'
import { IUser } from '@/features/slices/user/userInterface'
import Image from 'next/image'

export default function Avatar({ user, width }: {
	width?: number;
	user: IUser;
}) {

	function helpGetInitial() {
		return getInitials(`${user?.firstName} ${user?.surName}`)
	}


	function renderImage(): JSX.Element {
		return <Image className='rounded-full' width='45' height='0' src={user.profileImage || ''} alt='profile_img' />
	}

	function renderInitials(): JSX.Element {
		return <div className='bg-coventi block p-3 rounded-full'>
			<p className='text-blue-100 text-center w-[20px] h-5 font-semibold'>{helpGetInitial()}</p>
		</div>
	}

	return (!user?.profileImage ? renderInitials() : renderImage())
}
