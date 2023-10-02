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
            const newItem = await prisma.category.update({
                where:{
                    id: data.id
                    
                },
                data: {
                    name: data.name,
                },
            })
            return res.status(200).send(newItem);

        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
} 