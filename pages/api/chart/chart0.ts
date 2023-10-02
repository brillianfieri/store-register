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
            const item = await prisma.$queryRaw`select cast(COALESCE(count(*), 0 ) as int) as total from transaction
            where date_part('month', (current_date)) = date_part('month', (transaction_date))`

            return res.status(200).send(item);
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
} 