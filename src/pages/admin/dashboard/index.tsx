import AdminDashboardCards from "@/components/admin/AdminDashboardCards";
import AdminBreadcrump from "@/components/admin/BreadCrump";
import AdminLayout from "@/components/layouts/AdminLayout";
import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import useProtectedRoute from "@/hooks/useProtectedRoute";

const users = [
  {
    customerName: "Solomon Sunday",
    eventName: "Chike Beach Party",
    paymentRef: "schinoyerem007@gmail.com",
    dateTime: "22/03/2033 12 00 PM",
  },
  {
    customerName: "Corlineous Okafor",
    eventName: "Okafor's Law",
    paymentRef: "PA456478",
    dateTime: "22/03/2033 12 00 PM",
  },
  {
    customerName: "Davides",
    eventName: "Adewale",
    paymentRef: "PA456470",
    dateTime: "22/03/2033 12 00 PM",
  },
  {
    customerName: "Kunle",
    eventName: "Ajayi",
    paymentRef: "PA456478",
    dateTime: "22/03/2033 12 00 PM",
  },
  {
    customerName: "Genevive",
    eventName: "Ugama",
    paymentRef: "PA476478",
    dateTime: "22/03/2033 12 00 PM",
  },
  {
    customerName: "Anna",
    eventName: "Okerere",
    paymentRef: "PA456478",
    dateTime: "22/03/2033 12 00 PM",
  },
];
export default function Dashboard() {
  const [showRightModal, setShowRightModal] = useState<boolean>(false);

  //Protected route
  useProtectedRoute();
  //Protected route

  const toggleRightBar = () => {
    setShowRightModal(!showRightModal);
  };
  return (
    <AdminLayout>
      <div>
        <AdminBreadcrump breadcrumbDatas={[{ name: "Overview" }]} />
        <div className="flex flex-col space-x-0 md:flex-row md:space-x-5 ">
          <AdminDashboardCards activeUserCount="133,454+ Online" />
          <AdminDashboardCards
            cardTitle="Ticket Sold"
            userCount={213215}
            date="02 Jan 2023"
            time="10:00AM"
            activeUserCount="12+ Events"
          />
          {/* comming soon events */}
          <div>
            <div className="bg-[url('/assets/images/bg-card.svg')] p-4 mt-5 border rounded-lg border-slate-300 w-[360px] text-white">
              <div className="flex justify-between">
                <div>
                  <p className="text-xl font-bold">Upcoming Events</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-4xl font-extrabold">15</p>
              </div>
              <div className="flex items-center pb-1 mt-6">
                <div>
                  <img
                    src="/assets/images/event-pic.svg"
                    width={50}
                    height={50}
                    alt="event-log"
                  />
                </div>
                <div className="px-2">
                  <h1 className="font-bold">Chika's Beach Party</h1>
                  <p className="font-semibold">08:00Am , 02 Jan 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold"> Recent Payments</h1>
          </div>
          <div className="pb-32 overflow-auto rounded-lg">
            <table className="w-full">
              <thead className="border-b border-b-gray-400 borer">
                <tr className="">
                  <th className="p-3 text-sm font-bold tracking-wide text-left">
                    Customer Name
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-left">
                    Event Name
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-left">
                    Payment Reference
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-left">
                    Date & time
                  </th>
                  <th className="p-3 text-sm font-bold tracking-wide text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users &&
                  users.length > 0 &&
                  users.map((item, idx) => {
                    return (
                      <tr className="" key={idx}>
                        <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                          {item.customerName}
                        </td>
                        <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                          {" "}
                          {item.eventName}
                        </td>
                        <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                          {item.paymentRef}{" "}
                        </td>
                        <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                          {item.dateTime}{" "}
                        </td>
                        <td className="p-2 text-sm text-gray-700">
                          {" "}
                          <div className="">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                    />
                                  </svg>
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-50 w-40 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="px-1 py-1 ">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active
                                              ? "bg-gray-200 text-black"
                                              : "text-black-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                          onClick={toggleRightBar}
                                        >
                                          Edit Permission
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                  <div className="px-1 py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active
                                              ? "bg-gray-200 text-black"
                                              : "text-gray-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          Transfer Ownership
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                  <div className="px-1 py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active
                                              ? "bg-gray-200 text-white"
                                              : "text-gray-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm  text-red-500`}
                                        >
                                          Remove User
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="flex items-center justify-center w-full my-36">
                <div className="flex flex-col items-center justify-center px-auto">
                  <div className="">
                    <img src="/assets/images/user.svg" alt="user" />
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-lg font-semibold">
                      You payment made yet
                    </p>
                    <p>
                      Your user's payment will apear here when they have one
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </AdminLayout>
  );
}
