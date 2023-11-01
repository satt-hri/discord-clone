"use client";

import axios from "axios";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/user-modal-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === "deleteMessage";

  const onClick = async () => {
    try {
      setIsloading(true);
      const url = qs.stringifyUrl({
        url: apiUrl as string,
        query
      });

      await axios.delete(url);
      onClose();

    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this ?<br />

            メッセージが削除される
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4 ">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant={"primary"} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
