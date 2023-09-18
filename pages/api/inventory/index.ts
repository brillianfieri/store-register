import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        const items = await prisma.item.findMany({
            where:{
                delete_item: false
            },
            include:{
                category:{
                    select:{
                        id:true,
                        name: true,
                    }
                }
            }
        });

        const categories = await prisma.category.findMany({
            where:{
                delete_category:false
            }
        });
        res.status(200).send([items, categories]);
    }
} 