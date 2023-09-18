import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();

    // Check if the item exists but is hidden (deleted).
    if(req.method === 'POST'){
        const { body: data } = req;
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
    }
} 