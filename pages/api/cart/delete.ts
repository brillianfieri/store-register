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
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
} 