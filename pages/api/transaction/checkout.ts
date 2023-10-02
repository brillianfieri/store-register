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
            const carts = await prisma.cart.findMany({
                include:{
                    item:{
                        select:{
                            price: true
                        }
                    }
                },where:{
                    user_id: token?.user_id as number
                }
            });
    
            let price = 0;
    
            
            // Sum total price
            carts.map((cart) => {
                price = price + (cart.qty * cart.item.price);
            })
    
            // Create new transaction
            const newTransaction = await prisma.transaction.create({
                data:{
                    transaction_date: new Date(),
                    total_price: price,
                    user_id: token?.user_id as number
                }
            })
    
            // Add all transaction detail
    
            carts.map(async (cart) => {
                const addTransaction = await prisma.transaction_detail.create({
                    data: {
                        transaction_id: newTransaction.id,
                        item_id: cart.item_id,
                        qty: cart.qty,
                        current_price: cart.item.price
                    }
                });
            })
            
            // Empty shopping cart
            const deleteCarts = await prisma.cart.deleteMany({
                where:{
                    user_id: token?.user_id as number
                }
            })
    
            return res.status(201).send(newTransaction);
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
        
    }
}