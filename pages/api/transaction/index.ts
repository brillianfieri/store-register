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
            const transactions = await prisma.transaction.findMany({
                include:{
                    transaction_details:{
                        include:{
                            item:{
                                select:{
                                    name: true,
                                    price: true,
                                }
                            }
                        }
                    }
                }
            });
            res.status(200).json(transactions);
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
}