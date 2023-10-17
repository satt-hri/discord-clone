import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[]
}


import { Server as NexServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io"

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NexServer & {
            io: SocketIOServer
        }
    }
}