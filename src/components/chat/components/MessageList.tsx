import React, { useRef, useState, useEffect } from "react";

import { MessageRepository } from "@amityco/ts-sdk";

// Get current userID from the user object
const currentUserId = "Wondah";

// Get current subchanel from event id
const subChannel = "649562a30b7d3a8c92080852";
function getFirstLetter(creatorId: string) {
  if (!creatorId) return ""; // Handle the case when creatorID is undefined or empty

  const firstLetter = creatorId.charAt(0).toUpperCase();
  return firstLetter;
}

export const MessageList: React.FC = (subChannelId) => {
  const [messages, setMessages] = useState<any[]>([]);

  const collection = useRef<any>(null);

  useEffect(() => {
    collection.current = MessageRepository.getMessages(
      { subChannelId: subChannel },
      ({ data: messages, onNextPage, hasNextPage, loading, error }) => {
        setMessages(messages.reverse());
      }
    );
  }, [subChannelId]);
  return (
    <div className="w-auto h-full py-3 overflow-auto border sm:w-auto rounded-2xl border-slate-300 md:block">
      <div className="sticky px-4 py-2 ">
        <p className="font-extrabold">Live chat</p>
      </div>
      <div className="border border-slate-200"></div>
      <div className=" overflow-auto md:max-h-[31rem] max-h-[25rem]">
        {messages.map((message) => {
          const { creatorId, data } = message;
          const userID = creatorId;
          const { text } = data;
          return (
            <div
              className={`flex flex-col py-2 my-3 mx-3  ${
                userID === currentUserId ? "self" : ""
              }`}
              key={message.messageId}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center w-8 h-8 bg-red-400 rounded-full">
                  <span className="font-bold">{getFirstLetter(userID)}</span>
                </div>
                <div className="text-[#000000] px-2 w-[90%]">
                  <span className="font-bold"> {userID}</span>
                  <p>{text}</p>
                </div>
              </div>
              <div className="max-w-full text-gray-400"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
