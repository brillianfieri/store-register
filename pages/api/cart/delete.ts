import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const { body: data } = req;
        const updateInventory = await prisma.item.update({
            where:{
                id:data.item_id
            },
            data:{
                qty:{
                    increment: data.qty
                }
            }
        })
        const newItem = await prisma.cart.delete({
            where:{
                id: data.id
            }
        })
        return res.status(200).send(newItem);
    }
} 