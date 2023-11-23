import AdminBreadcrump from "@/components/admin/BreadCrump";
import AdminLayout from "@/components/layouts/AdminLayout";
import EventForm from "@/components/admin/EventForm";
import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function CreateEvent(): JSX.Element {
  // const dispatch = useAppDispatch();

  // const [eventDto, setEventDto] = useState<CreateEventDto | null>(null);
  //Protected route
  useProtectedRoute();
  //Protected route
  return (
    <AdminLayout>
      <div className="pt-4">
        <div className="mb-8">
          <AdminBreadcrump
            breadcrumbDatas={[
              { name: "Events", link: "/admin/events" },
              { name: "Create Event" },
            ]}
          />
        </div>
        <div className="container pb-10 mx-auto lg:w-1/2">
          <EventForm />
        </div>
      </div>
    </AdminLayout>
  );
}
