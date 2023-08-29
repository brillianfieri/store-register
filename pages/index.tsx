import React, { useState } from "react";
import Layout from '../components/layout'
import { PrismaClient } from "@prisma/client";
import {InferGetServerSidePropsType } from "next";

export default function inventoryPage() {

    return(
        <Layout>
            <>
            <div className="grid grid-cols-1 gap-4">
                <div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
                <div className="col-start-1 col-end-3 bg-red-700">a</div>
                <div className="col-start-3 col-end-4 sm:col-start-1 bg-red-700">a</div>

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