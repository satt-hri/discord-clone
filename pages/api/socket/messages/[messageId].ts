import { currentProfilePages } from "@/lib/current-profile-pages";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "POST" && req.method !== "PATCH") {
        return res.status(405).json({error:"Method not allowed"})
    }


    try {
        const profile = await currentProfilePages(req)
        const {messageId,serverId,channelId} = req.query;
        const {content} = req.body;

        if (!profile) {
            res.status(401).json({error:"Unauthorized"})
        }
        if (messageId) {
            
        }

        return res.status(200).send("ok")
    } catch (error) {
        console.log("[MessageId]",error);
        return res.status(500).json({error:"Internal Error"})
    }
}