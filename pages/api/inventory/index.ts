import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        const items = await prisma.item.findMany({
            where:{
                isDeleted: false
            }
        });
        res.status(200).send(items);
    }
} 