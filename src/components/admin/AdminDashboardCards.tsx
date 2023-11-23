import React, { FC } from "react";
import UsersCollections from "../UsersCollections";

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
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
interface IAdminCard {
  cardTitle?: string;
  userCount?: number;
  date?: string;
  time?: string;
  activeUserCount?: string;
}
const AdminDashboardCards: FC<IAdminCard> = ({
  cardTitle = "Total Users",
  userCount = 1004044,
  time = "08:15am",
  date = "02 Jan 2023",
  activeUserCount = "30,7823+ online",
}: IAdminCard) => {
  const count = cardTitle.split(" ")[0];
  const type = cardTitle.split(" ")[1];
  console.log(count, type, "words");
  return (
    <div className="bg-transparent p-4 mt-5 border rounded-lg border-slate-300 w-[360px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-extrabold">{count}</p>
          <p className="text-xl font-extrabold">{type},</p>
        </div>
        <p className="text-xl font-extrabold">{userCount}</p>
      </div>
      <div className="mt-6">
        <p className="font-light">
          as at{" "}
          <span className="font-semibold">
            {date}, {time}{" "}
          </span>
        </p>
      </div>
      <div className="pb-1 mt-6">
        <UsersCollections usersImages={images} users={activeUserCount} />
      </div>
    </div>
  );
};

export default AdminDashboardCards;
