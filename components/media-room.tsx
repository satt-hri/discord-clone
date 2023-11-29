"use client";

import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export function MediaRoom({ chatId, video, audio }: MediaRoomProps) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [token, setToken] = useState("");
  useEffect(() => {
    //if (!user?.firstName || !user?.lastName) return;
    if (!user) return ;
    //const name = `${user.firstName} ${user.lastName}`;
    const name = "quickstart-user";
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${user?.username}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user, chatId]);

  if (token === "") {
    return <div className="flex flex-col items-center justify-center flex-1">
      <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading</p>
    </div>;
  }

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
