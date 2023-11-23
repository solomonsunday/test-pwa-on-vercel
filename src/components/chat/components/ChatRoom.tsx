import React, { useState, useEffect } from "react";
import { MessageList } from "./MessageList";
import { MessageComposer } from "./MessageComposer";
const hiddenProp =
  typeof document !== "undefined" &&
  ["hidden", "msHidden", "webkitHidden"].find((prop) => prop in document);
const visibilityEvent =
  hiddenProp &&
  {
    hidden: "visibilitychange",
    msHidden: "msvisibilitychange",
    webkitHidden: "webkitvisibilitychange",
  }[hiddenProp];

interface ChatRoomProps {
  channelId: string;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ channelId }) => {
  const [key, setKey] = useState(Date.now());

  const refreshKey = () => {
    navigator.onLine && // internet is back
      typeof document !== "undefined" && // page is not hidden
      setKey(Date.now());
  };

  useEffect(() => {
    typeof window !== "undefined" &&
      window.addEventListener("online", refreshKey);
    visibilityEvent &&
      typeof document !== "undefined" &&
      document.addEventListener(visibilityEvent, refreshKey);

    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("online", refreshKey);
      visibilityEvent &&
        typeof document !== "undefined" &&
        document.removeEventListener(visibilityEvent, refreshKey);
    };
  }, []);

  return (
    <div key={key} className="flex flex-col justify-between w-full h-full">
      <MessageList />
      <MessageComposer channelId={channelId} />
    </div>
  );
};

export default ChatRoom;
