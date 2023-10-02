import React, { useState } from "react";
import Layout from '../../components/layout'
import { PrismaClient } from "@prisma/client";
import {InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]"
import AddUser from "@/components/user/addUser";
import DeleteUser from "@/components/user/deleteUser";
import EditUser from "@/components/user/editUser";
import DisplayUser from "@/components/user/displayUser";
import DisplayLog from "@/components/log/displayLog";

export default function adminPage({users, sessionusername, logs}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [adminMenu,setAdminMenu] = useState("user");

    const userClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setAdminMenu("user");
     }
     const logClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setAdminMenu("log");
     }

    return(
        <Layout>

            {/* <td className="px-6 py-4 md:flex"> */}

            <div className="px-5 pt-5 flex">
                <button onClick={userClicked}> <h1 className={adminMenu == "user" ? "text-2xl font-bold text-black text-opacity-100 dark:text-white mr-3" : "text-2xl font-bold text-black text-opacity-30 dark:text-opacity-30 dark:text-white mr-3"}>User</h1> </button>
                <button onClick={logClicked}><h1 className={adminMenu == "log" ? "text-2xl font-bold text-black text-opacity-100 dark:text-white mr-3" : "text-2xl font-bold text-black text-opacity-30 dark:text-opacity-30 dark:text-white mr-3"}>Log</h1></button>
            </div>

            {adminMenu == "user" ? <DisplayUser users = {users} sessionusername= {sessionusername}/> : <DisplayLog logs = {logs}/>}

            
            

            
        </Layout>
        
    )
}

const prisma = new PrismaClient();

export async function getServerSideProps(context: any) {

    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    )

    const users = await prisma.user.findMany({
        where:{
            delete_user: false
        },select:{
            id:true,
            name:true,
            username:true,
            role:true,
        }
        ,orderBy:{
            name: "asc"
        }
    });

    const logs = await prisma.log.findMany({
        include:{
            user:{
                select:{
                    username: true
                }
            }
        },orderBy:{
            log_date:"desc"
        }
    })

    logs.map((log) => {
        // item.modified.get
        log.log_date = log.log_date.toLocaleString();
    });


    return {
        props: {
            sessionusername:session?.user?.username,
            users: users,
            logs: logs
        },
    };
}