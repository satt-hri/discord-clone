
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server"
const MESSAGES_BATCH = 20;

export async function GET(request: Request) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(request.url)
        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!channelId) {
            return new NextResponse("channelId  missing", { status: 400 })
        }

        let messages: Message[] = []

        if (cursor) {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                // cursor: {
                //     id: cursor
                // },
                where: {
                    channelId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    content: "desc",
                }
            })
            //console.log(messages);
        } else {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    channelId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    content: "desc",
                }
            })

        }
        let nextCursor = null;
        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id
        }
        return NextResponse.json({
            items: messages,
            nextCursor
        })

    } catch (error) {
        console.log("[Message_get]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}