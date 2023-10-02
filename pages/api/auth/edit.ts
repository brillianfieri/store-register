import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { hash } from 'bcrypt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const token = await getToken({ req })
        if(token && token?.role == 'admin'){
            const { body: data } = req;

            const checkForUnique = await prisma.user.findMany({
                where:{
                    username: {
                        equals: data.username,
                        not:{
                            equals: data.oldusername,
                        } 
                    }
                }
            })
            
            // Check if the username is already exist.
            if(checkForUnique.length > 0){
                return res.status(401).send({ error: 'not unique' })
            }else{
                // Create user.
                let newData = null
                if(data.password != ""){
                    const password = await hash(data.password, 15)
                    newData = {
                        name: data.name,
                        username: data.username,
                        role: data.role,
                        password:password
                    }

                }else{
                    newData = {
                        name: data.name,
                        username: data.username,
                        role: data.role,
                    }
                }
                const newUser = await prisma.user.update({
                    where:{
                        id: data.id
                    },
                    data: newData
                })
    
                return res.status(201).send(newUser);
            }

        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
} 