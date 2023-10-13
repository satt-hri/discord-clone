import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { channelId: string } }) {
    try {
        const { searchParams } = new URL(request.url)
        const serverId = searchParams.get("serverId")

        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!params.channelId) {
            return new NextResponse("channelId is  Missing", { status: 400 })
        }
        if (!serverId) {
            return new NextResponse("serverId is  Missing", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general"
                        }
                    }
                }
            }
        })
        return NextResponse.json(server);

    } catch (error) {
        console.log("Channle Del Error", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(request: Request, { params }: { params: { channelId: string } }) {
    try {
        const { searchParams } = new URL(request.url)
        const serverId = searchParams.get("serverId")
        const { name, type } = await request.json()

        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!params.channelId) {
            return new NextResponse("channelId is  Missing", { status: 400 })
        }
        if (!serverId) {
            return new NextResponse("serverId is  Missing", { status: 400 })
        }
        if (name === "general") {
            return new NextResponse("channel name  can not be  general", { status: 400 })
        }


        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    update:{
                        where:{
                            id:params.channelId,
                            NOT:{
                                name:"general"
                            }
                        },
                        data:{
                            name,
                            type
                        }
                    }
                }
            }
        })
        return NextResponse.json(server);
    } catch (error) {
        console.log("Channle Del Error", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}