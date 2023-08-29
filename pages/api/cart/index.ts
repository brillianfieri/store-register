import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        const carts = await prisma.cart.findMany({
            include:{
                item:{
                    select:{
                        name: true,
                        price: true
                    }
                }
            }
        });
        res.status(200).send(carts);
    }
}