"use-client";
import React, { useState } from "react";
import { MessageRepository, MessageContentType } from "@amityco/ts-sdk";

interface MessageComposerProps {
  channelId: string;
}
export const MessageComposer: React.FC<MessageComposerProps> = ({
  channelId,
}) => {
  const [uniqueKey, setUniqueKey] = useState<string>(createUniqueKey());

  const resetState = () => {
    setUniqueKey(createUniqueKey());
  };
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    async function createTextMessage(text: any) {
      const textMessage = {
        subChannelId: "649562a30b7d3a8c92080852",
        dataType: MessageContentType.TEXT,
        data: {
          text: text,
        },
        tags: ["tag1", "tag2"],
        metadata: {
          data: uniqueKey,
        },
      };
      const { data: message } = await MessageRepository.createMessage(
        textMessage
      );
      return message;
    }
    const { text } = Object.fromEntries(new FormData(e.currentTarget));
    let msg = createTextMessage(text);

    console.log(msg);
    e.currentTarget.reset();
    resetState();
  };
  return (
    <div className="flex items-center py-3 mt-3 rounded-lg bg-bg-transparent">
      <form
        onSubmit={sendMessage}
        className="flex items-center justify-between w-full"
      >
        <input
          className="w-full px-3 py-3 bg-transparent border rounded-lg outline-none focus:outline-none border-slate-200"
          type="text"
          name="text"
          placeholder="Say something..."
          autoComplete="off"
          autoCorrect="off"
        />
      </form>
    </div>
  );
};

function createUniqueKey() {
  return `${Math.random().toString(16)}.${Date.now()}`;
}
