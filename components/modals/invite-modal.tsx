"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/user-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

export const InviteModal = () => {

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "invite"
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center justify-center mt-2 gap-x-2">
            <Input className="bg-zinc-300/50"></Input>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
