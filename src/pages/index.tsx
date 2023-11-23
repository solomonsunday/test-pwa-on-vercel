import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PlayCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import EventCard from "@/components/EventCard";
import { getHomeEvents } from "@/features/slices/event/eventAction";
import {
  useAlert,
  useUserIsAuthenticated,
} from "@/contexts/ApplicationContext";
import UpcomingEvent from "@/components/UpcomingEvent";
import {
  EventStatusEnum,
  IEvent,
} from "@/features/slices/event/eventInterface";
import Footer from "@/components/Footer";
import { toTitleCase } from "@/common/utility";
import { NextSeo } from "next-seo";

export default function Home(): JSX.Element {
  const { sendErrorAlert } = useAlert();
  const isAuthenticated = useUserIsAuthenticated()!;
  const [events, setEvents] = useState<{
    past: IEvent[];
    live: IEvent[];
    upcoming: IEvent[];
  }>({ past: [], live: [], upcoming: [] });
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [firstLiveEvent, setFirstLiveEvent] = useState<IEvent | null>(null);
  const [randomEvent, setRandomEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    helpSetHomeEvents();
  }, []);

  useEffect(() => {
    helpSetHeroImages();
  }, [events]);

  function helpSetHomeEvents() {
    getHomeEvents()
      .then((eventss) => {
        setEvents(eventss);
        setFirstLiveEvent((eventss && eventss.live.at(0)!) || null);
      })
      .catch((error) => sendErrorAlert(error));
  }

  function helpSetHeroImages() {
    if (events.upcoming.length > 0 || events.live.length > 0) {
      const liveUpcomingEvents = [...events.live, ...events.upcoming];
      const eventt = liveUpcomingEvents.at(
        Math.floor(Math.random() * events.past.length)
      )!;
      setRandomEvent(eventt);
    }

    if (
      events.live.length > 0 ||
      events.past.length > 0 ||
      events.upcoming.length > 0
    ) {
      let images = events.upcoming.map((event) => event.media.display);
      if (images.length < 3) {
        images = [
          ...images,
          ...events.live.map((event) => event.media.display),
        ];
      }
      if (images.length < 3) {
        images = [
          ...images,
          ...events.past.map((event) => event.media.display),
        ];
      }
      const heroImgs = [...images, ...images.slice(0, 3)];
      setHeroImages(heroImgs);
    }
  }

  return (
    <>
      <NextSeo
        title="Coventi - Experience Live, Anywhere"
        description="Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
        openGraph={{
          url: "https://coventi.co",
          title: "Coventi - Experience Live, Anywhere",
          description:
            "Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!",
        }}
      />

      {/* hero section */}
      <div className="container-full bg-indigo-900 lg:bg-contain no-repeat bg-[url(/assets/images/bg-image.svg)]">
        {/* overlay */}
        <div className="bg-[#090055] bg-opacity-70 h-full xs:pt-24 sm:pt-20 md:pt-28 lg:pt-40 w-full">
          {/* overlay ends */}
          {/* max-w-[150px] */}
          {randomEvent && (
            <div className="flex justify-center px-2 mb-8">
              <Link
                target="_blank"
                href={`/events/${randomEvent?.referenceId?.toUpperCase()}`}
              >
                <div className="flex items-center max-w-xl gap-4 py-2 bg-blue-200 rounded-full overflow-clip xs:px-3 sm:px-6 text-slate-700">
                  <div className="px-3 py-1 text-xs font-semibold bg-yellow-400 rounded-full xs:text-xs shrink-0">
                    Don't miss!
                  </div>
                  <p className="truncate">{toTitleCase(randomEvent?.name)}</p>
                  <ChevronRightIcon className="w-5 h-5 shrink-0" />
                </div>
              </Link>
            </div>
          )}

          <div className="container mx-auto xs:px-2">
            <h2 className="font-semibold text-gray-200 xs:text-4xl md:text-5xl lg:text-6xl md:text-center xs:mb-4 md:mb-10">
              <span className="text-emerald-300 tracking-loose">
                Experience Live, Anywhere{" "}
              </span>
              -
              <br />
              <span>Coventi Ensures your Events are Engaging</span>
            </h2>
            <div className="md:px-32 lg:px-60">
              <p className="font-light text-gray-200 md:text-center xs:leading-5 md:leading-8 md:text-lg">
                Monetise and maximise your concerts to a larger audience with
                Cutting-Edge Technology for the best Livestreaming performances
                and high-quality video content delivery!
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center xs:py-10 md:py-14">
            {!isAuthenticated && (
              <>
                <div>
                  <Link
                    className="px-12 py-3 font-normal text-blue-500 bg-gray-200 rounded-full"
                    href="/register"
                  >
                    Register
                  </Link>
                </div>
                <div>
                  <Link
                    className="px-8 py-3 font-normal text-yellow-500 rounded-full"
                    href="/login"
                  >
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </div>

          {heroImages.length > 1 && (
            <div className="container pt-6 mx-auto xs:px-2">
              <div className="flex justify-center overflow-hidden">
                <Image
                  className="rotate-[-12deg] origin-top-right rounded-tl-2xl mt-6"
                  src={heroImages.length > 1 ? heroImages.at(0)! : ""}
                  alt={"event_img"}
                  width={400}
                  height={0}
                />

                <Image
                  className="z-10 rounded-t-2xl"
                  src={heroImages.length > 1 ? heroImages.at(1)! : ""}
                  alt={"event_img"}
                  width={480}
                  height={0}
                />

                <Image
                  className="rotate-[12deg] origin-top-left rounded-tr-2xl mt-6"
                  src={heroImages.length > 1 ? heroImages.at(2)! : ""}
                  alt={"event_img"}
                  width={400}
                  height={0}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-8 pb-6 bg-black container-full xs:px-4">
        <div className="container mx-auto mb-4 text-gray-200">
          <div className="grid grid-cols-12">
            <div className="mb-6 xs:col-span-12 sm:col-span-6 lg:col-span-4">
              <div className="grid grid-cols-12">
                <div className="xs:col-span-3 sm:col-span-2">
                  <ShieldCheckIcon className="w-12 h-12" />
                </div>
                <div className="xs:col-span-9 sm:col-span-10">
                  <p className="mb-1 font-medium md:text-lg">Go Global</p>
                  <p className="font-thin md:text-base">
                    Share your Live concerts with a larger audience
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 xs:col-span-12 sm:col-span-6 lg:col-span-4">
              <div className="grid grid-cols-12">
                <div className="xs:col-span-3 sm:col-span-2">
                  <ShieldCheckIcon className="w-12 h-12" />
                </div>
                <div className="xs:col-span-9 sm:col-span-10">
                  <p className="mb-1 font-medium md:text-lg">
                    Monetize your shows
                  </p>
                  <p className="font-thin md:text-base">
                    Find sponsors, sell one-off or recurring tickets to over 1
                    million streamers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 xs:col-span-12 sm:col-span-6 lg:col-span-4">
              <div className="grid grid-cols-12">
                <div className="xs:col-span-3 sm:col-span-2">
                  <ShieldCheckIcon className="w-12 h-12" />
                </div>
                <div className="xs:col-span-9 sm:col-span-10">
                  <p className="mb-1 font-medium md:text-lg">Video-on-Demand</p>
                  <p className="font-thin md:text-base">
                    Customise your concerts using our next-gen technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${firstLiveEvent?.media.cover})` }}
        className="bg-indigo-900 container-full lg:bg-cover"
      >
        <div className="w-full h-full bg-black bg-opacity-80">
          {events.live.length <= 0 && (
            <div className="py-6">
              <p className="my-20 text-2xl text-center">
                Currently, no live event
              </p>
            </div>
          )}
          {events.live.length > 0 && (
            <div className="container py-24 mx-auto text-gray-200 xs:px-2 md:px-6 lg:px-0">
              <div className="grid grid-cols-12 lg:gap-4">
                <div className="xs:col-span-12 sm:col-span-12 md:col-span-6">
                  <h2 className="flex items-center gap-2 mb-4">
                    <span className="font-semibold text-gray-100 truncate xs:text-2xl md:text-2xl lg:text-5xl">
                      {firstLiveEvent?.name} -
                    </span>
                    <span className="mt-1 text-xl bg-red-600 rounded-lg md:ml-4 xs:px-2 md:px-6">
                      Live
                    </span>
                  </h2>
                  <p className="font-light md:leading-5 lg:leading-8 md:text-md lg:text-lg">
                    Afrobeats streaming made easy!. Get ready to move to the
                    beat of Africa with our Afrobeat live streaming service.
                    We've got everything you need to satisfy your musical
                    cravings.
                  </p>
                </div>
                <div className="flex items-center pl-3 xs:col-span-12 sm:col-span-12 md:col-span-6 md:justify-center">
                  <Link href="events" className="flex items-center">
                    <PlayCircleIcon className="lg:h-20 md:h-12 xs:h-10" />
                    <p className="font-thin xs:text-xl md:text-lg lg:text-4xl xs:ml-4 md:ml-6">
                      Click to play
                    </p>
                  </Link>
                </div>
                <div className="col-span-12 pt-3 xs:pl-3 lg:pl-4">
                  <div className="flex items-center">
                    <UserGroupIcon className="xs:h-10 md:h-8" />
                    <p className="ml-4 font-thin">+ 20k are watching</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {events.live.length > 0 && (
            <div className="py-6 container-full md:px-6 lg:px-0">
              <div className="container mx-auto">
                <h2 className="mb-2 text-xl text-gray-200">Happening now!!!</h2>
                <Swiper
                  key={Math.random()}
                  // slidesPerView={4}
                  spaceBetween={15}
                  watchSlidesProgress={true}
                  autoplay
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                >
                  {events.live.map((event) => {
                    return (
                      <SwiperSlide key={Math.random()}>
                        <EventCard event={event} status={event.status} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </div>

      {events?.upcoming?.length > 0 && (
        <UpcomingEvent events={events.upcoming} />
      )}

      <div className="container-full">
        <div className="container mx-auto xs:px-2 md:px-6 lg:px-0 py-14">
          <div className="flex mb-8 text-slate-700 sm:items-center sm:justify-between xs:flex-col xs:gap-8">
            <h2 className="col-span-12 text-4xl font-semibold">
              Past Events<span className="text-green-600"></span>
            </h2>
            <Link
              className="text-blue-500 sm:text-right hover:text-blue-700"
              href={"/events?status=past"}
            >
              See all{" "}
            </Link>
          </div>
          <Swiper
            // slidesPerView={4}
            spaceBetween={10}
            watchSlidesProgress={true}
            autoplay
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {events.past.map((event) => {
              return (
                <SwiperSlide key={Math.random()}>
                  <EventCard
                    event={event}
                    status={EventStatusEnum.PAST}
                    isFullCard={true}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          {events.past.length <= 0 && (
            <p className="text-2xl text-center">Currently, no past event!</p>
          )}
        </div>
      </div>

      {/* <div className="container-full lg:bg-cover bg-[url(/assets/images/bg-image2.svg)]">
        <div className="w-full h-full bg-black bg-opacity-80">
          <div className="container py-24 mx-auto text-gray-200 xs:px-2 md:px-6 lg:px-0">
            <div className="grid grid-cols-12 gap-6">
              <h2 className="col-span-12 mb-2 text-4xl text-gray-200">
                Our Merch
              </h2>
              <div className="xs:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
                <MerchCard key={Math.random()} />
              </div>
              <div className="xs:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
                <MerchCard key={Math.random()} />
              </div>
              <div className="xs:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
                <MerchCard />
              </div>
              <div className="xs:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
                <MerchCard />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
}
