import React, { useState } from "react";
import Layout from '../../components/layout'
import AddInventory from '../../components/inventory/addInventory'
import EditInventory from '../../components/inventory/editInventory'
import DeleteInventory from "@/components/inventory/deleteInventory";
import { PrismaClient } from "@prisma/client";
import {InferGetServerSidePropsType } from "next";

export default function inventoryPage({items}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [search, setSearch] = useState('')

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        
    }

    
    return(
        <Layout>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-bold dark:text-white">Inventory</h1>
            </div>

            <div className="px-5 pt-1.5">
                <AddInventory items = {items}/>
            </div>

            <div className={"pt-1 px-5 pb-2"}>
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

            <div className={"px-5 pb-5 overflow-y:auto"}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
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
                                
                                if(item.delete_item == false){
                                    if(search.toLowerCase() === ''){
                                        return item;
                                    }else if(item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search)){
                                        return item;
                                    }
                                }
                            }).map((item: any) =>{
                                let fontColor = '';
                                if(item.qty <= 0){
                                    fontColor = 'text-amber-700'
                                }else{
                                    fontColor='text-gray-900 dark:text-white'
                                }
                                
                                return (
                                <tr key={item.id} className={`${fontColor} bg-white border-b dark:bg-gray-900 dark:border-gray-700`}>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </th>
                                    <td className={'px-6 py-4'}>
                                        {item.category}
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
                                        <EditInventory item = {item} items = {items} />
                                        <DeleteInventory item = {item} />
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>
        
    )
}

const prisma = new PrismaClient();

export async function getServerSideProps() {
    const items = await prisma.item.findMany({
        where:{
            delete_item: false
        },orderBy:{
            name: "asc"
        }
    });


    items.map((item) => {
        // item.modified.get
        item.modified = String(item.modified.toLocaleString());
    });

    return {
        props: {
        items: items,
        },
    };
}