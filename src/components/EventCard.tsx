import Link from "next/link";
import Image from "next/image";

import {
  EventStatusEnum,
  EventStatusType,
  EventTypeEnum,
  IEvent,
} from "@/features/slices/event/eventInterface";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

export default function EventCard({
  event,
  status,
  isFullCard = true,
}: {
  event: IEvent;
  status?: EventStatusType;
  isFullCard?: boolean;
}): JSX.Element {
  function renderEvent(): JSX.Element {
    return (
      <Link href={`/events/${event?.referenceId?.toUpperCase()}`}>
        <div className="md:mb-4">
          <div className="relative md:mb-1">
            {isFullCard && event?.type === EventTypeEnum?.ON_DEMAND && (
              <div className="absolute px-4 py-1 mt-2 text-xs bg-yellow-500 rounded-full right-2">
                Available On Demand
              </div>
            )}
            <Image priority
              className="rounded-lg w-auto h-auto"
              src={event?.media?.display}
              alt={event?.name}
              width="2000"
              height="1000"
            />
          </div>
          {isFullCard && (
            <>
              <p className="mb-1 text-base font-semibold capitalize">
                {event?.name}
              </p>
              <p className="text-xs text-slate-500">
                {event?.schedules?.at(0)?.dateTime}
              </p>
            </>
          )}
        </div>
      </Link>
    );
  }

  function renderLiveEvent(): JSX.Element {
    return (
      <div className="px-2 py-2 space-y-5 rounded-lg bg-slate-200">
        <div className="grid grid-cols-10 gap-3 ">
          <div className="col-span-7">
            <Image
              src={event?.media.cover}
              alt={event?.name || "event"}
              width="2000"
              height="1000"
              className="rounded-md"
            />
          </div>
          <div className="col-span-3 pt-2">
            <div className="flex items-center justify-center px-2 text-white bg-red-500 rounded-md">
              <small className="text-center">{event?.status}</small>
            </div>
          </div>
          {/* <div className="grid content-start justify-end col-span-2 pt-2">
					<UsersCollections usersImages={usersIcon} />
				</div> */}
        </div>
        <div className="flex justify-between">
          <div className="w-full pr-2">
            <p className="font-semibold capitalize">{event?.name}</p>
            <div className="flex justify-between">
              <div className="text-xs font-medium">{event?.dateCreated}</div>
              <Link
                className="text-coventi"
                href={`/events/watch/${event?._id}`}
              >
                <PlayCircleIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>{status === EventStatusEnum.LIVE ? renderLiveEvent() : renderEvent()}</>
  );
}
