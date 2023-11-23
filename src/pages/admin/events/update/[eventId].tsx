import AdminBreadcrump from "@/components/admin/BreadCrump";
import EventForm from "@/components/admin/EventForm";
import AdminLayout from "@/components/layouts/AdminLayout";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import React from "react";

export default function UpdateEvent() {
  //Protected route
  useProtectedRoute();
  //Protected route

  return (
    <AdminLayout>
      <div className="pt-4">
        <div className="mb-8">
          <AdminBreadcrump
            key={Math.random()}
            breadcrumbDatas={[
              { name: "Events", link: "/admin/events" },
              { name: "Update Event" },
            ]}
          />
        </div>
        <div className="container pb-10 mx-auto lg:w-1/2">
          <EventForm key={Math.random()} />
        </div>
      </div>
    </AdminLayout>
  );
}
