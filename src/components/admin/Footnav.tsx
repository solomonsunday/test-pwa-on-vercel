import Link from 'next/link'
import { useRouter } from 'next/router';

import { CalendarDaysIcon, Cog8ToothIcon, CreditCardIcon, PowerIcon, RectangleGroupIcon, ShoppingCartIcon, TicketIcon, UsersIcon } from '@heroicons/react/24/outline';

import { DefinedAdminPermissions, DefinedAdminUrl } from '@/common/base.constant';
import { useAuthenticatedAdminIsPermited } from '@/contexts/ApplicationContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/features/slices/auth/authAction';
import classnames from 'classnames';

export default function Footnav() {
	const { pathname, push } = useRouter();
	const dispatch = useAppDispatch();


	function adminIsPermitted(permission: string): boolean {
		return useAuthenticatedAdminIsPermited({ requiredPermissions: [permission] }).isPermitted;
	}

	function isActiveRoute(route: string): boolean {
		return pathname.includes(route);
	}


	function onLogout() {
		dispatch(logOut());
		push('/login');
	}

	return (
		<div className='flex justify-between border-t'>
			<Link className='w-full' href={DefinedAdminUrl.dashboard.link}>
				<div className={classnames('py-2 px-1 border-r border-t-2 w-full', {
					'text-coventi-500 border-t-coventi-500 bg-blue-50': isActiveRoute(DefinedAdminUrl.dashboard.link),
					'border-t-white': !isActiveRoute(DefinedAdminUrl.dashboard.link)
				})}>
					<div className='flex justify-center mb-1'>
						<RectangleGroupIcon className="w-4 h-4" />
					</div>
					<p className='text-[10px] text-center'>{DefinedAdminUrl.dashboard.name}</p>
				</div>
			</Link>
			{adminIsPermitted(DefinedAdminPermissions.user.view) && <Link className='w-full' href={DefinedAdminUrl.users.link}>
				<div className={classnames('py-2 px-1 border-r border-t-2 w-full', {
					'text-coventi-500 border-t-coventi-500 bg-blue-50': isActiveRoute(DefinedAdminUrl.users.link),
					'border-t-white': !isActiveRoute(DefinedAdminUrl.users.link)
				})}>
					<div className='flex justify-center mb-1'>
						<UsersIcon className="w-4 h-4" />
					</div>
					<p className='text-[10px] text-center'>{DefinedAdminUrl.users.name}</p>
				</div>
			</Link>}
			<Link className='w-full' href={DefinedAdminUrl.events.link}>
				<div className={classnames('py-2 px-1 border-r border-t-2 w-full', {
					'text-coventi-500 border-t-coventi-500 bg-blue-50': isActiveRoute(DefinedAdminUrl.events.link),
					'border-t-white': !isActiveRoute(DefinedAdminUrl.events.link)
				})}>
					<div className='flex justify-center mb-1'>
						<CalendarDaysIcon className="w-4 h-4" />
					</div>
					<p className='text-[10px] text-center'>{DefinedAdminUrl.events.name}</p>
				</div>
			</Link>
			{adminIsPermitted(DefinedAdminPermissions.payment.view) && <Link className='w-full' href={DefinedAdminUrl.payments.link}>
				<div className={classnames('py-2 px-1 border-r border-t-2 w-full', {
					'text-coventi-500 border-t-coventi-500 bg-blue-50': isActiveRoute(DefinedAdminUrl.payments.link),
					'border-t-white': !isActiveRoute(DefinedAdminUrl.payments.link)
				})}>
					<div className='flex justify-center mb-1'>
						<CreditCardIcon className="w-4 h-4" />
					</div>
					<p className='text-[10px] text-center'>{DefinedAdminUrl.payments.name}</p>
				</div>
			</Link>}
			{adminIsPermitted(DefinedAdminPermissions.ticket.view) && <Link className='w-full' href={DefinedAdminUrl.tickets.link}>
				<div className={classnames('py-2 px-1 border-r border-t-2 w-full', {
					'text-coventi-500 border-t-coventi-500 bg-blue-50': isActiveRoute(DefinedAdminUrl.tickets.link),
					'border-t-white': !isActiveRoute(DefinedAdminUrl.tickets.link)
				})}>
					<div className='flex justify-center mb-1'>
						<TicketIcon className="w-4 h-4" />
					</div>
					<p className='text-[10px] text-center'>{DefinedAdminUrl.tickets.name}</p>
				</div>
			</Link>}
			<Link className='w-full' href={DefinedAdminUrl.mersh.link}>
				<div className={classnames('py-2 px-1 border-r border-t-2 w-full', {
					'text-coventi-500 border-t-coventi-500 bg-blue-50': isActiveRoute(DefinedAdminUrl.mersh.link),
					'border-t-white': !isActiveRoute(DefinedAdminUrl.mersh.link)
				})}>
					<div className='flex justify-center mb-1'>
						<ShoppingCartIcon className="w-4 h-4" />
					</div>
					<p className='text-[10px] text-center'>{DefinedAdminUrl.mersh.name}</p>
				</div>
			</Link>
			<Link className='w-full' href={DefinedAdminUrl.settings.link}>
				<div className={classnames('py-2 px-1 border-r border-t-2 w-full', {
					'text-coventi-500 border-t-coventi-500 bg-blue-50': isActiveRoute(DefinedAdminUrl.settings.link),
					'border-t-white': !isActiveRoute(DefinedAdminUrl.settings.link)
				})}>
					<div className='flex justify-center mb-1'>
						<Cog8ToothIcon className="w-4 h-4" />
					</div>
					<p className='text-[10px] text-center'>{DefinedAdminUrl.settings.name}</p>
				</div>
			</Link>
			<div onClick={onLogout} className='py-2 px-1 text-red-500 bg-red-300/25 hover:bg-red-500/25'>
				<div className='flex justify-center mb-1'>
					<PowerIcon className="w-4 h-4" />
				</div>
				<p className='text-[10px]'>Logout</p>
			</div>
		</div>
	)
}