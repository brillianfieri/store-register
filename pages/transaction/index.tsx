import React, { useState } from "react";
import Layout from '../../components/layout'
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import {InferGetServerSidePropsType } from "next";
import TransactionDetail from "@/components/transaction/transactionDetail";
import DeleteTransaction from "@/components/transaction/deleteTransaction";
import { useSession } from "next-auth/react";

export default function inventoryPage({transactions}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const { data: session } = useSession()

    return(
        <Layout>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-bold dark:text-white">Transaction</h1>
            </div>

            <div className="px-5 pt-3">
                <Link href='/transaction/new-transaction' type="button"  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Transaction</Link>
            </div>
            
            {transactions.length ?
                <div className=" p-5">
                    <div className="max-h-96 overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="top-0 sticky text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="top-0 sticky">
                                    <th scope="col" className="top-0 sticky px-6 py-3">
                                        Transaction ID
                                    </th>
                                    <th scope="col" className="top-0 sticky px-6 py-3">
                                        User
                                    </th>
                                    <th scope="col" className="top-0 sticky px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="top-0 sticky px-6 py-3">
                                        Total Price
                                    </th>
                                    {session?.user?.role === "admin" ?
                                        <th scope="col" className="top-0 sticky px-6 py-3">
                                            Action
                                        </th> : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction: any) =>(
                                    <tr key={transaction.id} onClick={()=>{setSelectedTransaction(transaction)}} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {transaction.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {transaction.user.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {transaction.transaction_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {transaction.total_price.toLocaleString()}
                                        </td>
                                        {session?.user?.role === "admin" ?
                                            <td className="px-6 py-4">
                                                <DeleteTransaction transaction={transaction}/>
                                            </td>: null
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            :
                <div className='flex items-center justify-center h-full pt-5'>
                    <p className="text-xl text-gray-700 dark:text-gray-400">No Transaction</p>
                </div>
            }
            
            {selectedTransaction ? <TransactionDetail selectedTransaction = {selectedTransaction}/> : null}
            
        </Layout>
        
    )
}

const prisma = new PrismaClient();

export async function getServerSideProps() {
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
            },
            user:{
                select:{
                    name:true
                }
            }
        }
        ,orderBy:{
            transaction_date: "desc"
        }
    });

    transactions.map((transaction) => {
        // item.modified.get
        transaction.transaction_date = transaction.transaction_date.toLocaleString();
    });

    return {
        props: {
            transactions: transactions,
        },
    };
}