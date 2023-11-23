import AppLoader from "@/components/Reusable/AppLoader";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import EventCard from "@/components/EventCard";
import { getAllUserEvents } from "@/features/slices/usersEvents/usersEventAction";
import Link from "next/link";
import Tickets from "@/components/Tickets";
import Footer from "@/components/Footer";
import { getEvents } from "@/features/slices/event/eventAction";
import { confirmTicketOwner } from "@/features/services/eventService";
import { useAlert } from "@/contexts/ApplicationContext";
import { requestPayment } from "@/features/slices/payment/paymentAction";

function Dashboard(): JSX.Element {
  const dispatch = useAppDispatch();
  const eventData = useAppSelector((state) => state.events.data);

  const [tickets, getTickets] = useState([]);
  const [bannerDetail, setBannerDetail] = useState<any>({});
  const [userHasPaid, setUserHasPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { sendAlert, sendErrorAlert } = useAlert();

  const userEventsData: any = useAppSelector(
    (state) => state.usersEvents.data?.tickets
  );
  const loading = useAppSelector((state) => state.usersEvents.loading);
  const events = eventData?.events || [];

  //Protected route
  useProtectedRoute();
  //Protected route

  useEffect(() => {
    // const query = router.query;
    dispatch(getAllUserEvents({}));
  }, []);

  useEffect(() => {
    events?.slice(0, 1).map((item) => {
      return setBannerDetail(item);
    });
  }, [events]);

  useEffect(() => {
    helpConfirmTicket();
  }, [bannerDetail]);

  useEffect(() => {
    dispatch(getEvents({}));
  }, []);

  useEffect(() => {
    if (userEventsData) {
      let tickets = userEventsData?.map((item: any) => {
        console.log(item);
        return item?.event;
      });

      getTickets(tickets);
    }
  }, [userEventsData]);

  async function helpConfirmTicket() {
    const eventId = bannerDetail?._id;
    try {
      if (eventId) {
        let res = await confirmTicketOwner({ eventId } as any);
        let ticketArray: any = res?.data;
        let ticketArraySize = ticketArray.tickets;
        if (ticketArraySize.length > 0) {
          return setUserHasPaid(true);
        }
      }
    } catch (error) {
      sendErrorAlert(error);
    }
  }

  async function helpMakePayment(eventId: string) {
    setIsLoading(true);
    try {
      const response = await requestPayment(eventId);
      if (bannerDetail?.amount! > 0) {
        window.location.href = response.data.link;
      } else {
        sendAlert(response.message);
      }
      setIsLoading(false);
    } catch (error) {
      sendErrorAlert(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="container mx-auto xs:pt-24 sm:pt-20 md:pt-28 lg:pt-24">
        {events
          ? events.slice(0, 1).map((item) => {
              let image = item.media.cover;
              return (
                <div key={Math.random()}
                  className="bg-[#090055] h-full w-full rounded-xl bg-cover text-gray-300 z-0"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    // height: "65vh",
                    borderRadius: "15px",
                  }}
                >
                  <div className="grid grid-cols-12 px-10 py-8 bg-black opacity-50 rounded-xl">
                    <div className="xs:col-span-12 sm:col-span-6 lg:col-span-4">
                      <h2 className="mb-4 text-6xl capitalize font-base">
                        {item.name}
                      </h2>
                      <div
                        className="mb-8 text-white"
                        dangerouslySetInnerHTML={{
                          __html: item ? item?.description : "",
                        }}
                      ></div>
                      {userHasPaid ? (
                        <Link href={`events/watch/${item?._id}`}>
                          <button className="px-10 py-3 mb-8 text-lg font-semibold text-white bg-blue-500 rounded-full cursor-pointer">
                            Watch Event
                          </button>
                        </Link>
                      ) : (
                        <button
                          className="px-10 py-3 mb-8 text-lg font-semibold text-white bg-blue-500 rounded-full cursor-pointer"
                          onClick={() => helpMakePayment(item?._id!)}
                        >
                          {isLoading ? "Loading..." : "Buy Event"}
                        </button>
                      )}
                      {/* <UsersCollections
                  usersImages={usersIcon}
                  users={activeUserCount}
                /> */}
                    </div>
                  </div>
                </div>
              );
            })
          : " No event yet!"}

        <div className="pt-8">
          <h1 className="text-2xl xs:text-center">Your tickets</h1>
        </div>
        <div className="items-center pt-3 mr-3 xs:flex-col md:flex">
          {tickets.length === 0 ? (
            <div className="">
              You have not purchased an event yet. Click
              <Link href="/events">
                <span className="px-1 font-semibold text-blue-500">Here</span>
              </Link>
              to buy event
            </div>
          ) : (
            tickets.map((item) => (
              <div key={Math.random()} className="my-4 md:mr-4 xs:flex xs:justify-center xs:justify-items-center">
                <Tickets item={item} />
              </div>
            ))
          )}
        </div>
        {/*TODO:  On Demand goes here */}
        <div className="pt-8">
          <h1 className="text-2xl font-thin xs:text-center">
            Recommended events for you
          </h1>
        </div>
        <div className="items-center px-2 mb-6 md:px-0 ml-">
          {loading ? (
            <AppLoader />
          ) : events?.length ? (
            <div className="grid grid-cols-1 mt-5 space-y-5 md:gap-6 md:grid-cols-4 md:space-y-0">
              {events?.slice(0, 5).map((item: any) => {
                return (
                  <EventCard
                    key={Math.random()}
                    event={item}
                    isFullCard={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="">There are no recommended events for you yet.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
