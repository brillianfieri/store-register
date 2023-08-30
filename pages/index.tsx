import React, { useState } from "react";
import Layout from '../components/layout'
import { PrismaClient } from "@prisma/client";
import {InferGetServerSidePropsType } from "next";

export default function inventoryPage() {
    const currMonth = new Date().toLocaleString('default', {month: 'long'})
    const currYear = new Date().toLocaleString('default', {year: 'numeric'})

    return(
        <Layout>
            <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-5">
                <div className="md:col-start-1 md:col-end-2">
                    <div className="">
                        <div className="md:h-10 py-2 px-3 block bg-slate-100 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900 ">
                            <h5 className="text-lg md:truncate font-bold tracking-tight text-gray-900 dark:text-white">Total Transaction - {currMonth} {currYear}</h5>
                        </div>
                        <div className="h-64 py-2 px-3 block bg-white  border-transparent rounded-b-lg drop-shadow-lg  dark:bg-gray-800">
                            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </div>
                </div>
                <div className="md:col-start-2 md:col-end-4">
                    <div className="">
                        <div className="md:h-10 py-2 px-3 block bg-slate-100 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900 ">
                            <h5 className="text-lg md:truncate font-bold tracking-tight text-gray-900 dark:text-white">Total Transaction - {currYear}</h5>
                        </div>
                        <div className="h-64 py-2 px-3 block bg-white  border-transparent rounded-b-lg drop-shadow-lg  dark:bg-gray-800">
                            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-5">
                <div className="md:col-start-1 md:col-end-3">
                    <div className="">
                        <div className="md:h-10 py-2 px-3 block bg-slate-100 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900 ">
                            <h5 className="text-lg md:truncate font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </div>
                        <div className="h-64 py-2 px-3 block bg-white  border-transparent rounded-b-lg drop-shadow-lg  dark:bg-gray-800">
                            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </div>
                </div>
                <div className="md:col-start-3 md:col-end-4">
                    <div className="">
                        <div className="md:h-10 py-2 px-3 block bg-slate-100 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900 ">
                            <h5 className="text-lg md:truncate font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </div>
                        <div className="h-64 py-2 px-3 block bg-white  border-transparent rounded-b-lg drop-shadow-lg  dark:bg-gray-800">
                            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="grid grid-cols-6 gap-4">
            <div className="col-start-2 col-span-4 bg-red-700">01</div>
            <div className="col-start-1 col-end-4 bg-red-700">02</div>
            <div className="col-start-4 col-end-7 bg-red-700">03</div> */}
            {/* <div className="col-start-5 col-end-6 bg-red-700">04</div> */}
            {/* </div> */}
            </>
            
        </Layout>
        
    )
}