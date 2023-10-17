import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const memmber = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId,
    },
  });

  if (!channel || !memmber) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] h-full flex flex-col">
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type="channel"
      />
      <div className="flex-1">XXXXXXXXXXXXXXXXXXXXXXX</div>
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  );
};

export default ChannelIdPage;
