"use client";
import { getAuthData } from "@/common/utility";
import { UserTypeEnum } from "@/features/slices/user/userInterface";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Sidenav from "../admin/Sidenav";

export default function AdminLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    helpRouteAuthUser();
  });

  function helpRouteAuthUser() {
    const authenticationData = getAuthData();
    if (!authenticationData) {
      router.push("/login");
      return;
    }
    if (authenticationData?.user.userType !== UserTypeEnum.ADMIN) {
      router.push("/dashboard");
      return;
    }
  }

  return (
    <div className="container-full">
      {/* <AdminTopNav /> */}
      <div className="fixed w-[10rem] z-[1] xs:hidden overflow-hidden h-screen border-r">
        <Sidenav />
      </div>
      <div className="w-full lg:pl-[10rem]">
        <div className="pt-8 pr-6 xs:pl-6 sm:pl-6">{children}</div>
      </div>
      {/* <Footnav /> */}
    </div>
  );
}
