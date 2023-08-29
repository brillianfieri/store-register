import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();

    if(req.method === 'GET'){
        const item = await prisma.item.findFirst({
            where:{
                id: parseInt(req.query.id as string)
            }
        })

        return res.status(200).send(item);
    }
} 