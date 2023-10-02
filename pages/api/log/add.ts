import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const token = await getToken({ req })
        if(token){
            const { body: data } = req;
            const newLog = await prisma.log.create({
                data:{
                    log_date: new Date(),
                    user_id: token?.user_id as number,
                    message: data.message
                }
            })
            
            res.status(200).send(newLog);
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
        
    }
}