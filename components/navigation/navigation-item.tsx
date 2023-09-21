"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={() => {}} className="group relative flex items-center">
        <div
          className={cn(
            "absolut left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        >
          server
        </div>
      </button>
    </ActionTooltip>
  );
};
