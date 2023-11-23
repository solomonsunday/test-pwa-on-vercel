import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';

import { CalendarDaysIcon, Cog8ToothIcon, CreditCardIcon, PowerIcon, RectangleGroupIcon, ShoppingCartIcon, TicketIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/store/hooks';
import classnames from 'classnames';

import { logOut } from "@/features/slices/auth/authAction";
import {
  DefinedAdminPermissions,
  DefinedAdminUrl,
} from "@/common/base.constant";
import { useAuthenticatedAdminIsPermited } from "@/contexts/ApplicationContext";

export default function Sidenav(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pathname, push } = useRouter();

  function adminIsPermitted(permission: string) {
    return useAuthenticatedAdminIsPermited({
      requiredPermissions: [permission],
    }).isPermitted;
  }

  function isActiveRoute(route: string) {
    return pathname.includes(route);
  }
  function isAxactRoute(route: string) {
    return pathname === route;
  }

  function onLogout() {
    dispatch(logOut());
    push("/login");
  }

	return (
		<>
			<div className='flex justify-center py-6 border-b'>
				<Link href={'/'}>
				<Image
					src={"/assets/logos/cropped_coventi_logo_270x270.png"}
					alt={"coventi_logo"}
					width={40}
					height={0}
				/>
				</Link>
			</div>

      <div className="absolute w-full">
        <Link href={DefinedAdminUrl.dashboard.link}>
          <div
            className={classnames(
              "grid grid-cols-10 gap-3 border-b border-r-2 p-4 hover:text-coventi-500",
              {
                "text-coventi-500 border-r-coventi-500": isActiveRoute(
                  DefinedAdminUrl.dashboard.link
                ),
                "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                  !isActiveRoute(DefinedAdminUrl.dashboard.link),
                "cursor-default": isAxactRoute(DefinedAdminUrl.dashboard.link),
              }
            )}
          >
            <div className="col-span-3">
              <RectangleGroupIcon className="w-7 h-7" />
            </div>
            <div className="flex items-center col-span-7">
              <p>{DefinedAdminUrl.dashboard.name}</p>
            </div>
          </div>
        </Link>

        {adminIsPermitted(DefinedAdminPermissions.user.view) && (
          <Link href={DefinedAdminUrl.users.link}>
            <div
              className={classnames(
                "grid grid-cols-10 gap-3 border-b border-r-2 p-4 hover:text-coventi-500",
                {
                  "text-coventi-500 border-r-coventi-500": isActiveRoute(
                    DefinedAdminUrl.users.link
                  ),
                  "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                    !isActiveRoute(DefinedAdminUrl.users.link),
                  "cursor-default": isAxactRoute(DefinedAdminUrl.users.link),
                }
              )}
            >
              <div className="col-span-3">
                <UsersIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center col-span-7">
                <p>{DefinedAdminUrl.users.name}</p>
              </div>{" "}
            </div>
          </Link>
        )}

        <Link href={DefinedAdminUrl.events.link}>
          <div
            className={classnames(
              "grid grid-cols-10 gap-3 border-b border-r-2 p-4 hover:text-coventi-500",
              {
                "text-coventi-500 border-r-coventi-500": isActiveRoute(
                  DefinedAdminUrl.events.link
                ),
                "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                  !isActiveRoute(DefinedAdminUrl.events.link),
                "cursor-default": isAxactRoute(DefinedAdminUrl.events.link),
              }
            )}
          >
            <div className="col-span-3">
              <CalendarDaysIcon className="w-7 h-7" />
            </div>
            <div className="flex items-center col-span-7">
              <p>{DefinedAdminUrl.events.name}</p>
            </div>
          </div>
        </Link>

        {adminIsPermitted(DefinedAdminPermissions.payment.view) && (
          <Link href={DefinedAdminUrl.payments.link}>
            <div
              className={classnames(
                "grid grid-cols-10 gap-3 border-b border-r-2 p-4 hover:text-coventi-500",
                {
                  "text-coventi-500 border-r-coventi-500": isActiveRoute(
                    DefinedAdminUrl.payments.link
                  ),
                  "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                    !isActiveRoute(DefinedAdminUrl.payments.link),
                  "cursor-default": isAxactRoute(DefinedAdminUrl.payments.link),
                }
              )}
            >
              <div className="col-span-3">
                <CreditCardIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center col-span-7">
                <p>{DefinedAdminUrl.payments.name}</p>
              </div>
            </div>
          </Link>
        )}

        {adminIsPermitted(DefinedAdminPermissions.ticket.view) && (
          <Link href={DefinedAdminUrl.tickets.link}>
            <div
              className={classnames(
                "grid grid-cols-10 gap-3 border-b border-r-2 p-4 hover:text-coventi-500",
                {
                  "text-coventi-500 border-r-coventi-500": isActiveRoute(
                    DefinedAdminUrl.tickets.link
                  ),
                  "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                    !isActiveRoute(DefinedAdminUrl.tickets.link),
                  "cursor-default": isAxactRoute(DefinedAdminUrl.tickets.link),
                }
              )}
            >
              <div className="col-span-3">
                <TicketIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center col-span-7">
                <p>{DefinedAdminUrl.tickets.name}</p>
              </div>
            </div>
          </Link>
        )}

        {/* {adminIsPermitted(DefinedAdminPermissions.video.view) && <Link href={DefinedAdminUrl.apiVideo.link}>
					<div className={classnames('flex gap-4 border-r-2 items-center px-4 py-4 border-b hover:text-coventi-500', {
						'text-coventi-500': isActiveRoute(DefinedAdminUrl.apiVideo.link),
						'border-r-white': !isActiveRoute(DefinedAdminUrl.apiVideo.link),
						'hover:bg-blue-50': !isActiveRoute(DefinedAdminUrl.apiVideo.link),
						'hover:border-r-blue-50': !isActiveRoute(DefinedAdminUrl.apiVideo.link),
						'border-r-coventi-500': isActiveRoute(DefinedAdminUrl.apiVideo.link),
						'cursor-default': isAxactRoute(DefinedAdminUrl.apiVideo.link),
					})}>
						<VideoCameraIcon className="w-7 h-7" />
						<p>{DefinedAdminUrl.apiVideo.name}</p>
					</div>
				</Link>} */}

        <Link href={DefinedAdminUrl.mersh.link}>
          <div
            className={classnames(
              "grid grid-cols-10 gap-3 border-b border-r-2 p-4 hover:text-coventi-500",
              {
                "text-coventi-500 border-r-coventi-500": isActiveRoute(
                  DefinedAdminUrl.mersh.link
                ),
                "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                  !isActiveRoute(DefinedAdminUrl.mersh.link),
                "cursor-default": isAxactRoute(DefinedAdminUrl.mersh.link),
              }
            )}
          >
            <div className="col-span-3">
              <ShoppingCartIcon className="w-7 h-7" />
            </div>
            <div className="flex items-center col-span-7">
              <p>{DefinedAdminUrl.mersh.name}</p>
            </div>
          </div>
        </Link>

        <Link href={DefinedAdminUrl.settings.link}>
          <div
            className={classnames(
              "grid grid-cols-10 gap-3 border-b border-r-2 p-4 hover:text-coventi-500",
              {
                "text-coventi-500 border-r-coventi-500": isActiveRoute(
                  DefinedAdminUrl.settings.link
                ),
                "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                  !isActiveRoute(DefinedAdminUrl.settings.link),
                "cursor-default": isAxactRoute(DefinedAdminUrl.settings.link),
              }
            )}
          >
            <div className="col-span-3">
              <Cog8ToothIcon className="w-7 h-7" />
            </div>
            <div className="flex items-center col-span-7">
              <p>{DefinedAdminUrl.settings.name}</p>
            </div>
          </div>
        </Link>

        <div
          onClick={onLogout}
          className="grid grid-cols-10 gap-3 p-4 text-red-500 border-b cursor-pointer bg-red-300/25 hover:bg-red-500/25"
        >
          <div className="col-span-3">
            <PowerIcon className="w-7 h-7" />
          </div>
          <div className="flex items-center col-span-7">
            <p>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}
