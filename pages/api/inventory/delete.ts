import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const { body: data } = req;

        const modifiedCart = await prisma.cart.deleteMany({
            where:{
                item_id: data.id
            }
        });

        const newItem = await prisma.item.update({
            where:{
                id: data.id
                
            },
            data: {
                isDeleted: true
            },
        })
        return res.status(200).send(newItem);
    }
} 