import React from "react";
import Layout from '../../components/layout'
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";

export default function inventoryPage() {
    console.log("ADJDJSJ")
    const [name, setName] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [qty, setQty] = React.useState("")

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("namechange");
        setName(event.target.value)
        
    }

    const onChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("namseeechange");
        setCategory(event.target.value)
    }
    
    const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("namechfsffsange");
        setPrice(event.target.value)
    }

    const onChangeQty = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("namechsfange");
        setQty(event.target.value)
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("namfdsffdsechange");
        event.preventDefault()
        console.log(name);
        console.log("Submitted")
    }

    return(
        <Layout>
            <div>
                <h1 className={"p-5"}> Add Item</h1>
            </div>

            
            <form onSubmit={onSubmit} className={"p-5"} >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_name" id="floating_name" onChange={onChangeName} value={name} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item Name</label>
                </div>

                <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select category</label>
                    <select id="category" onChange={onChangeCategory} value={category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="Food">Food</option>
                    <option value="Drink">Drink</option>
                    </select>
                </div>
                
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={onChangePrice} value={price} name="floating_price" id="floating_price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_qty" onChange={onChangeQty} value={qty} id="floating_qty" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_qty" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Qty</label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </Layout>
        
    )
}

