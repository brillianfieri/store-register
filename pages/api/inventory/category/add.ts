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
        if(token && token?.role == 'admin'){
            const { body: data } = req;

            // Check if the item exists but is hidden (deleted).
            const items = await prisma.category.findFirst({
                where:{
                    name: {
                        equals: data.name,
                        mode: 'insensitive'
                    }
                    
                }
            })

            let newItem;

            if(!items){
                // Category does not exist.
                newItem = await prisma.category.create({
                    data:{
                        name: data.name,
                    }
                })
            }else{
                // Category exists, proceed to unhide the category and update the data.
                newItem = await prisma.category.update({
                    where:{
                        id: items.id
                    },
                    data:{
                        name: data.name,
                        delete_category: false
                    }
                })
            }
            return res.status(201).send(newItem);

        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
} 