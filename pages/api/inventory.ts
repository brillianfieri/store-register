import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        console.log("doe")
        const items = await prisma.item.findMany();
        console.log(items)
        res.status(200).json(items);
        // return res.send(items);
    }else if(req.method === 'POST'){
        const { body: data } = req;
        const newItem = await prisma.item.create({data})
        return res.status(201).send(newItem);
    }
} 