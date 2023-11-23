"use client";
import { useAppSelector } from "@/store/hooks";
import React from "react";

interface JoinProps {
  onConnect: (username: string, persistent: boolean) => void;
}
const Join: React.FC<JoinProps> = ({ onConnect }) => {
  const uid = useAppSelector((state) => state.auth).data?.user?.firstName;

  const handleJoin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const persistent = true;
    if (uid) {
      onConnect(uid, persistent);
    }
  };
  return (
    <div className="w-full md:block xs:mt-5">
      <div className="flex flex-col">
        <button
          type="submit"
          className="px-10 py-2 text-white bg-blue-400 rounded-md"
          onClick={handleJoin}
        >
          Join the conversation
        </button>
      </div>
    </div>
  );
};

export default Join;
