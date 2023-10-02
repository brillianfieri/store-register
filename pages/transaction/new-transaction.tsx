import React, { useState } from "react";
import Layout from '../../components/layout'
import AddCart from '../../components/cart/addCart'
import { PrismaClient } from "@prisma/client";
import {InferGetServerSidePropsType } from "next";
import Checkout from "@/components/cart/checkout";
import DeleteCart from "@/components/cart/deleteCart";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]"

export default function inventoryPage({items, carts}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [search, setSearch] = useState('');

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        
    }

    

    return(
        <Layout>


            <div className="px-5 pt-5">
                <h1 className="text-2xl font-bold dark:text-white">Add Transaction</h1>
            </div>

            <div className="px-5 pt-3">
                <Link href='/transaction/' type="button"  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</Link>
            </div>

            <div className="pt-5 px-5 pb-5">
                <form>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" onChange={onChangeSearch} value={search} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Item..." required />
                    </div>
                </form>
            </div>

            {items.length ? 
                <div className={"px-5 pb-5 "}>
                    <div className="max-h-[40vh] overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="z-1 top-0 sticky text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="top-0 sticky">
                                    <th scope="col" className="px-6 py-3">
                                        Item
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last Updated
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.filter((item) => {
                                    if(item.qty >= 1){
                                        if(search.toLowerCase() === ''){
                                            return item;
                                        }else if(item.name.toLowerCase().includes(search) || item.category.name.toLowerCase().includes(search)){
                                            return item;
                                        }
                                    }
                                }).map((item: any) =>(
                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.category.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.qty.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.modified}
                                        </td>
                                        <td className="px-6 py-4">
                                            <AddCart item = {item} carts ={carts}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>  
            :
                <div className='flex items-center justify-center h-full pt-5'>
                    <p className="text-xl text-gray-700 dark:text-gray-400">No Item</p>
                </div>
            }
            

            {carts.length > 0 ? (
                <>
                <Checkout carts ={carts}/>
                <div className={"px-5 pb-5"}>
                    <div className="max-h-[40vh] overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="z-1 top-0 sticky text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="top-0 sticky">
                                    <th scope="col" className="px-6 py-3">
                                        Item
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map((cart: any) =>(
                                    <tr key={cart.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {cart.item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {cart.qty.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cart.item.price.toLocaleString()}
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                            <DeleteCart cart={cart}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </>) : null}

            

            
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

    const items = await prisma.item.findMany({
        where:{
            delete_item: false
        },include:{
            category:{
                select:{
                    id:true,
                    name: true,
                }
            }
        },orderBy:{
            name: "asc"
        }
    });

    items.map((item) => {
        // item.modified.get
        item.modified = item.modified.toLocaleString();
    });

    const carts = await prisma.cart.findMany({
        include:{
            item:{
                select:{
                    name: true,
                    price: true
                }
            }
        },where:{
            user_id: session?.user?.user_id
        },orderBy:{
            id: "desc"
        }
    });

    carts.map((cart) => {
        // item.modified.get
        cart.item.price = cart.item.price * cart.qty;
    });

    return {
        props: {
        items: items,
        carts: carts,
        },
    };
}