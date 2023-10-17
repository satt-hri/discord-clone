import {Server as NetServer} from 'http'
import {NextApiRequest} from "next"
import {Server as ServerIO} from "socket.io"

import { NextApiResponseServerIo } from '@/types'

const ioHander =(req:NextApiRequest,res:NextApiResponseServerIo) =>{
    if (!res.socket.server.io) {
        const path = "/api/socket/io"
        //@ts-ignore
        const httpServer :NetServer  = res.socket.server;
        const io = new ServerIO(httpServer,{
            path:path,
            addTrailingSlash:false
        })
        res.socket.server.io = io;
    }
    res.end()
}
export default ioHander