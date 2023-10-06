import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server"
export async function POST(request:Request) {
    try {
        const profile = await currentProfile();
        const {searchParams}  = new URL(request.url)
        const serverId = searchParams.get("serverId");
        if (!profile) {
            return new NextResponse("Unauthorized",{status:401})
        }
        if(!serverId){
            return new NextResponse("Server Id missing",{status:400});
        }

        const {name ,type} = await request.json();
        if (name === "general") {
            return new NextResponse("Name can not be 'general'",{status:400})
        }

        const server = await db.server.update({
            where:{
                id:serverId,
                members:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels:{
                    create:{
                        profileId:profile.id,
                        name,
                        type
                    }
                }
            }
        })
        return NextResponse.json(server)
        
    } catch (error) {
        console.log("Channel_POST",error);
        return  new NextResponse("Internal Error",{status:500})
    }
}