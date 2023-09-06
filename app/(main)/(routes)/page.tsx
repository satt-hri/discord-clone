import { ModeToggle } from "@/components/mode-toogle";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle></ModeToggle>
    </div>
  );
}
