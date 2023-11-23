import Image from "next/image";
import Link from "next/link";

import { Fragment, useState } from "react";

import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import classnames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logOut } from "@/features/slices/auth/authAction";
import { useUserIsAuthenticated } from "@/contexts/ApplicationContext";
import { Menu, Transition } from "@headlessui/react";
import { UserTypeEnum } from "@/features/slices/user/userInterface";

export default function Header(): JSX.Element {
  const isAuthenticated = useUserIsAuthenticated()!;
  const dispatch = useAppDispatch();
  const [CTOIsOpen, setCTOIsOpen] = useState(false);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const usertype = useAppSelector((state) => state.auth).data?.user.userType;

  let logedinUser = JSON.parse(localStorage.getItem("user")!);
  function onToggleDropDown() {
    setDropDownIsOpen(!dropDownIsOpen);
  }

  function onToggleCTO() {
    setCTOIsOpen(!CTOIsOpen);
  }

  function onLogOut() {
    dispatch(logOut());
  }

  // function renderUserPreview(): JSX.Element {
  // 	return <></>
  // }

  return (
    <div
      className={classnames("inset-x-0", "z-30", "absolute", {
        "bg-white": dropDownIsOpen,
      })}
    >
      <div className="container xs:px-5 sm:px-10 md:px-14 sm:py-4 xs:py-2 mx-auto text-gray-200 bg-[#090055] rounded-full xs:max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div className="mr-24 xs:col-span-8 sm:col-span-8 lg:col-span-2 ">
                <Image
                  src={"/assets/images/app-logo.svg"}
                  alt={"coventi_logo"}
                  width={110}
                  height={0}
                />
              </div>
            </Link>
            <div className="flex items-center justify-center gap-10 xs:hidden sm:hidden lg:flex md:col-span-4 lg:col-span-9">
              {isAuthenticated && (
                <Link
                  href={
                    usertype === UserTypeEnum.ADMIN
                      ? "/admin/dashboard"
                      : "/dashboard"
                  }
                >
                  <span className="">Dashboard</span>
                </Link>
              )}
              <Link href="/events?option=live">
                <span>Live Events</span>
                <span className="px-2 ml-1 text-xs bg-red-600 rounded-sm">
                  Live
                </span>
              </Link>
              <Link href="/events?option=upcoming">Upcoming Events</Link>
              <Link href="/events?option=on-demand">Watch on demand</Link>
              <Link href="/merch">Merch</Link>
              {!isAuthenticated && <Link href="/about-us">About Us</Link>}{" "}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 xs:col-span-4 sm:col-span-4 lg:col-span-1">
            <Bars3Icon
              onClick={onToggleDropDown}
              className="w-6 h-6 text-right md:hidden"
            />
            {!isAuthenticated ? (
              <div className="flex space-x-5">
                <div>
                  <Link
                    className="xs:hidden sm:hidden lg:block"
                    href="/register"
                  >
                    Register
                  </Link>
                </div>
                <div>
                  <Link
                    className="text-yellow-500 xs:hidden sm:hidden lg:block"
                    href="/login"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            ) : (
              <div className="items-center justify-between hidden py-0 space-x-3 md:flex ">
                {/* <div className="text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </div> */}
                <div className="divide-x ">
                  <img
                    src={"/assets/images/hori-line.svg"}
                    alt="horizontal-line"
                  />
                </div>
                <Image
                  src={"/assets/images/user.svg"}
                  width={35}
                  height={35}
                  alt="profileImage"
                  className="cursor-pointer"
                />
                <div>
                  <div className="">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 text-slate-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
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
                        <Menu.Items className="absolute right-0 z-50 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1">
                            <div className="flex py-2 pl-1">
                              <UserCircleIcon className="w-5 h-5" />

                              <p className="pl-2 font-serif text-black capitalize">
                                HI, {logedinUser?.firstName}!{" "}
                              </p>
                            </div>
                            <hr />
                            <div className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href={"/profile"}>
                                    <button
                                      className={`${
                                        active
                                          ? "text-gray-200"
                                          : "text-black-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-black`}
                                    >
                                      <div className="col-span-3 pr-2">
                                        <UserIcon className="w-4 h-4" />
                                      </div>
                                      Profile
                                    </button>
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? "text-red-200" : "text-red-400"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-500 `}
                                  onClick={onLogOut}
                                >
                                  <div className="col-span-3 pr-2">
                                    <PowerIcon className="w-4 h-4" />
                                  </div>
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {dropDownIsOpen && (
        <div className="absolute border-b w-full p-6 bg-white animate__animated animate__slideInDown animate__fast">
          <div className="py-4">
            <Link className="block mb-4" href="/events?option=live">
              <span>Live Events</span>
              <span className="px-2 ml-2 text-xs text-sm text-white bg-red-600 rounded-sm">
                Live
              </span>
            </Link>
            <Link className="block mb-4" href="/events?option=upcoming">
              Upcoming Events
            </Link>
            <Link className="block mb-4" href="/events?option=on-demand">
              Watch on demand
            </Link>
            <Link className="block mb-4" href="/merch">
              Merch
            </Link>
            <Link className="block mb-4 " href="/about-us">
              About Us
            </Link>

            <div
              onClick={onToggleCTO}
              className="flex items-center gap-2 cursor-pointer"
            >
              <UserIcon className="w-6 h-6 p-0 -ml-1" />
              <p>Profile</p>
              {CTOIsOpen ? (
                <ChevronUpIcon className="w-3 h-3 p-0 mt-1" />
              ) : (
                <ChevronDownIcon className="w-3 h-3 p-0 mt-1" />
              )}
            </div>
            {CTOIsOpen && (
              <div className="pt-3 pl-8 font-light animate__animated animate__slideInLeft animate__fast">
                {!isAuthenticated ? (
                  <>
                    <Link className="block mb-2" href="/login">
                      Sign in
                    </Link>
                    <Link href="/register">Create an account</Link>
                  </>
                ) : (
                  <p onClick={onLogOut}>Log out</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
