import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        const token = await getToken({ req })
        if(token){
            const carts = await prisma.cart.findMany({
                include:{
                    item:{
                        select:{
                            name: true,
                            price: true
                        }
                    }
                },where:{
                    user_id: token?.user_id as number
                }
            });
            res.status(200).send(carts);
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
}