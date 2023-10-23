"use client";

import { useChatQuery } from "@/hooks/use-chat-query";
import { Member, Message, Profile } from "@prisma/client";
import { Fragment } from "react";

type MessageWithMemberWithProfile = Message & {
  member: Member & { 
    profile: Profile 
  };
};
interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const { data } = useChatQuery({ queryKey, apiUrl, paramKey, paramValue });
  debugger;
  console.log("テスト", data);

  return (
    <div className="flex-1">
      {data?.pages.map((group, i) =>
        group.items.map((item:MessageWithMemberWithProfile,j:number) => {
          return (
            <Fragment key={j}>
              {j}-{item.content}
              <br />
            </Fragment>
          );
        })
      )}
    </div>
  );
};

export default ChatMessages;
