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
            
            const checkCart = await prisma.cart.findMany({
                where:{
                    item_id: data.item_id,
                    user_id: token?.user_id as number
                }
            })

            if(checkCart.length == 0){

                try{
                    const [updateItem, newTransaction] = await prisma.$transaction([
                        prisma.item.update({
                            where:{
                                id: data.item_id,
                                qty:{
                                    gte: data.qty
                                }
                            },
                            data: {
                                qty: {
                                    decrement: data.qty
                                },
                                modified: new Date()
                            },
                        }),
    
                        prisma.cart.create({
                            data:{
                                item_id: data.item_id,
                                qty: data.qty,
                                user_id: token?.user_id as number
                            }
                        })
    
                    ])
                    return res.status(201).send(newTransaction);
                }catch(e){
                    return res.status(401).send({ error: 'No item' }) 
                }

            }else{

                try{
                    const [updateItem, newTransaction] = await prisma.$transaction([
                        prisma.item.update({
                            where:{
                                id: data.item_id,
                                qty:{
                                    gte: data.qty
                                }
                            },
                            data: {
                                qty: {
                                    decrement: data.qty
                                },
                                modified: new Date()
                            },
                        }),
    
                        prisma.cart.updateMany({
                            where:{
                                item_id: data.item_id,
                                user_id: token?.user_id as number
                            },
                            data: {
                                item_id: data.item_id,
                                qty:{
                                    increment: data.qty
                                }
                            },
                        })
    
                    ])
    
                    return res.status(201).send(newTransaction);
                }catch(e){
                    return res.status(401).send({ error: 'No item' }) 
                }

            }

        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
} 