import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { RefreshCw } from "lucide-react";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {

    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Metchod not allowed" })
        }
        const profile = await currentProfilePages(req)
        const { content, fileUrl } = req.body;
        const { conversationId } = req.query;

        if (!profile) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        if (!conversationId) {
            return res.status(400).json({ error: "Conversation ID missing" })
        }
        if (!content) {
            return res.status(400).json({ error: "Content missing" });
        }
        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [{
                    memberOne: {
                        profileId: profile.id
                    }
                }, {
                    memberTwo: {
                        profileId: profile.id
                    }
                }]
            },
            include: {
                memberOne: {
                    include: { profile: true }
                },
                memberTwo: {
                    include: { profile: true }
                }
            }
        })

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" })
        }

        const member = 

    } catch (error) {
        console.log('DIRECT_MESSAGE_ERROR', error);
        return res.status(500).json({ message: "Internal Error" })
    }

}