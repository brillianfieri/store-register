import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();

    if(req.method === 'POST'){
        const carts = await prisma.cart.findMany({
            include:{
                item:{
                    select:{
                        price: true
                    }
                }
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
                date: new Date(),
                totalPrice: price
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
        const deleteCarts = await prisma.cart.deleteMany()

        return res.status(201).send(newTransaction);
    }
}