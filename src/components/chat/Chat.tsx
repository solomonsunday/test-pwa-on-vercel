import { useEffect, useState } from "react";
import Join from "./JoinChat";
import Main from "./ChatMain";
import { renewAccessToken } from "./ascClient";
import { useAppSelector } from "@/store/hooks";

const Chat = () => {
  const username = useAppSelector((state) => state.auth).data?.user?.firstName;

  const [connected, setConnected] = useState(false);
  const [userId, setUserId] = useState("");

  const onConnect = async (userId: string) => {
    if (username) {
      renewAccessToken(username);
      setConnected(true);
      setUserId(username);
    }

    localStorage.setItem("userId", userId);
  };

  useEffect(() => {
    if (username) onConnect(username);
  }, []);

  return (
    // <div className="hidden w-auto h-full py-3 ml-10 overflow-auto border rounded-2xl border-slate-300 md:block">
    <div className="overflow-auto">
      {!connected && !userId && <Join onConnect={onConnect} />}
      {connected && userId && <Main />}
      {/* </div> */}
    </div>
  );
};
export default Chat;
