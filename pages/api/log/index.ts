import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        const token = await getToken({ req })
        if(token && token?.role == 'admin'){
            const newLog = await prisma.log.findMany();
        
            res.status(200).send(newLog);
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
}