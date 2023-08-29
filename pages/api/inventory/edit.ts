import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const { body: data } = req;
        const newItem = await prisma.item.update({
            where:{
                id: data.id
                
            },
            data: {
                name: data.name,
                category: data.category,
                price: data.price,
                qty: data.qty,
                modified: new Date()
            },
        })
        return res.status(200).send(newItem);
    }
} 