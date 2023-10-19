import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand"

export type ModalType = "createServer" | "invite" | "edit" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deletChannle" | "editChannel" | "messageFile"

interface ModalData {
    server?: Server;
    channel?: Channel
    channelType?: ChannelType
    apiUrl?:string
    query?:Record<string,any>
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type: type, data: data }),
    onClose: () => set({ isOpen: false, type: null, data: {} })
}))