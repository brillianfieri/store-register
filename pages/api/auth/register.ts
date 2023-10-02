import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt';
import { getToken } from "next-auth/jwt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const { body: data } = req;

        const token = await getToken({ req })
        if(token && token?.role == 'admin'){
            const checkForUnique = await prisma.user.findUnique({
                where:{
                    username: data.username
                }
            })
            
            // Check if the username is already exist.
            if(checkForUnique){
                return res.status(401).send({ error: 'not unique' })
            }else{
                // Create user.
                const password = await hash(data.password, 15)
                const newUser = await prisma.user.create({
                    data:{
                        name: data.name,
                        username: data.username,
                        password: password,
                        role: data.role
                    }
                })
    
                return res.status(201).send(newUser);
            }
        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }

    }
} 