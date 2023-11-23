import React, { useEffect, useState } from "react";
import { ChannelRepository } from "@amityco/ts-sdk";
import { useAppSelector } from "@/store/hooks";
import ChatRoom from "./components/ChatRoom";
import { renewAccessToken } from "./ascClient";
// channel for demo
const DEFAULT_CHANNEL_ID = "coventi-events";
// const subChannelId = '649562a30b7d3a8c92080852';
const Main: React.FC = () => {
  const [channelId, setChannelId] = useState(DEFAULT_CHANNEL_ID);
  const username = useAppSelector((state) => state.auth).data?.user?.firstName;
  useEffect(() => {
    setChannelId(DEFAULT_CHANNEL_ID);
    (async () => {
      if (username) await renewAccessToken(username);
      const token = await localStorage.getItem("chat-token");
      if (token) {
        const joined = await ChannelRepository.joinChannel(DEFAULT_CHANNEL_ID);
        console.log(joined, "user joined");
      }
    })();
  }, [channelId]);

  return (
    <div className="h-ful xs:mt-5">
      <ChatRoom channelId={channelId} />
    </div>
  );
};

export default Main;
