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
        if(token && token?.role == 'admin'){
            const carts = await prisma.user.findMany({
                select:{
                    name: true,
                    username: true,
                }
            });
            res.status(200).send(carts);
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
}