import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient()

    if(req.method === 'POST'){
        const token = await getToken({ req })
        if(token && token?.role == 'admin'){
            const { body: data } = req;

            // Check if the item exists but is hidden (deleted).
            const items = await prisma.item.findFirst({
                where:{
                    name: {
                        equals: data.name,
                        mode: 'insensitive'
                    }
                    
                }
            })

            let newItem;

            if(!items){
                // Item does not exist.
                newItem = await prisma.item.create({
                    data:{
                        name: data.name,
                        category_id: data.category_id,
                        price: data.price,
                        qty: data.qty,
                        modified: new Date()
                    }
                })
            }else{
                // Item exists, proceed to unhide the item and update the data.
                newItem = await prisma.item.update({
                    where:{
                        id: items.id
                    },
                    data:{
                        name: data.name,
                        category_id: data.category_id,
                        price: data.price,
                        qty: data.qty,
                        modified: new Date(),
                        delete_item: false
                    }
                })
            }
            return res.status(201).send(newItem);

        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
        
    }
} 