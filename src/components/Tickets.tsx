import Image from "next/image";
import React, { useState } from "react";
import UsersCollections from "./UsersCollections";
import dayjs from "dayjs";
import Link from "next/link";

const images: any = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
];

const Tickets = ({ item }: { item: any }) => {
  const [usersIcon] = useState<any>(images);

  return (
    <div className="w-72">
      <div className="px-2 py-2 space-y-5 rounded-lg bg-slate-100">
        <div className="grid grid-cols-5 gap-3 ">
          <div className="relative h-16 col-span-2">
            <Image
              src={item?.media.cover}
              fill
              alt="ticket-image"
              className="rounded-md"
            />
          </div>
          <div className="col-span-1 pt-2">
            <p className="px-2 text-center text-white capitalize bg-red-600 rounded-md ">
              {item?.status === "live" && item?.status}
            </p>
          </div>
          <div className="grid content-start justify-end col-span-2 pt-2">
            <UsersCollections usersImages={usersIcon} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-full px-2">
            <div className="font-sans font-extrabold capitalize">
              {item?.name}
            </div>
            <div className="flex justify-between justify-items-center">
              <div className="text-xs font-medium">
                {dayjs().format(item?.dateCreated)}
              </div>
              <Link href={`/events/watch/${item?._id}`}>
                <Image
                  src="/assets/images/play.svg"
                  className="cursor-pointer"
                  width={15}
                  height={10}
                  alt="ticket-image"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
