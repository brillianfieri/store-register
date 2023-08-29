import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const { body: data } = req;
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
            newItem = await prisma.item.create({
                data:{
                    name: data.name,
                    category: data.category,
                    price: data.price,
                    qty: data.qty,
                    modified: new Date()
                }
            })
        }else{
            newItem = await prisma.item.update({
                where:{
                    id: items.id
                },
                data:{
                    name: data.name,
                    category: data.category,
                    price: data.price,
                    qty: data.qty,
                    modified: new Date(),
                    isDeleted: false
                }
            })
        }
        
        
        return res.status(201).send(newItem);
    }
} 