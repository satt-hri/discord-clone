import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  imageUrl?: string;
  className?: string;
}

const UserAvatar = ({ imageUrl, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>NO</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
