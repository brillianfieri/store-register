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

            const deleteTransaction = await prisma.transaction.delete({
                where:{
                    id: data.id
                }
            })
            return res.status(200).send(deleteTransaction);

        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
} 