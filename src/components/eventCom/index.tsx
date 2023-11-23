	import React, { FC } from "react";

interface IEvent {
  title: string;
  date: string;
  alt: string;
  imageUrl: string;
}

const EventComponent: FC<IEvent> = ({ title, date, imageUrl, alt }) => {
  return (
    <>
      <div className="relative mb-5 transition duration-700 cursor-pointer group hover:shadow-sm hover:hover:scale-100 hover:-translate-y-1 md:space-y-0">
        <img
          src={imageUrl}
          alt={alt}
          className="px-3 rounded-2xl"
          width="310px"
          height="246px"
        />
        <div className="pl-3 space-y-3">
          <h2 className="font-sans text-2xl font-bold mt-7 bold">{title}</h2>
          <p className="font-bold text-green-800 text-md">
            {/* March 24rd, 2023; 4PM WAT +1 */}
            {date}
          </p>
        </div>
      </div>
    </>
  );
};

export default EventComponent;
