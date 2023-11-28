import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(request: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!params.serverId) {
            return new NextResponse("serverId is missing", { status: 400 })
        }

        const { name, imageUrl } = await request.json()

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name: name,
                imageUrl: imageUrl
            }
        })
        console.log(request.json())

        return NextResponse.json(server)

    } catch (error) {
        console.log("[SERVER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function DELETE(request:Request,{params}:{params:{serverId:string}}) {
    try {
        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauthorized",{status:401})
        }
        if(!params.serverId){
            return new  NextResponse("ServerId  is  Missing",{status:400})
        }
        const  server  = await db.server.delete({
            where:{
                id:params.serverId,
                profileId:profile.id
            }
        })

        return NextResponse.json(server)
    } catch (error) {
        console.log("Server Delete Error",error);
        return new  NextResponse("Internal Error",{status:500})
    }
    
}