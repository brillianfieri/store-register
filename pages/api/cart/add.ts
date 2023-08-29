import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const { body: data } = req;
        const newItem = await prisma.cart.create({
            data:{
                item_id: data.item_id,
                qty: data.qty,
            }
        })
        return res.status(201).send(newItem);
    }
} 