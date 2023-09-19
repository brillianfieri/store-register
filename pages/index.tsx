import React, { useState } from "react";
import Layout from '../components/layout'
import Chart0 from "../components/chart/chart0";
import Chart1 from "../components/chart/chart1";
import Chart2 from "../components/chart/chart2";
import Chart3 from "../components/chart/chart3";
import Chart4 from "../components/chart/chart4";


export default function dashboard() {
    const currMonth = new Date().toLocaleString('default', {month: 'long'})
    const currYear = parseInt(new Date().toLocaleString('default', {year: 'numeric'}))

    return(
        <Layout>
            <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-5">
                <div className="md:col-start-1 md:col-end-2">
                    <div className="">
                        <div className="md:h-10 py-2 px-3 block bg-slate-100 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900 ">
                            <h5 className="text-lg md:truncate font-bold tracking-tight text-gray-900 dark:text-white">Total Transaction ({currMonth} {currYear})</h5>
                        </div>
                        <div className="flex justify-center flex-col text-center  h-64 md:h-72 py-2 px-3 block bg-white  border-transparent rounded-b-lg drop-shadow-lg  dark:bg-gray-800">
                            <Chart0/>
                        </div>
                    </div>
                </div>
                <div className="md:col-start-2 md:col-end-4">
                    <div className="">
                        <div className="md:h-10 py-2 px-3 block bg-slate-100 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900 ">
                            <h5 className="text-lg md:truncate font-bold tracking-tight text-gray-900 dark:text-white">Gross Sales ({currYear-2} - {currYear})</h5>
                        </div>
                        <div className="h-64 md:h-72 py-2 px-3 block bg-white  border-transparent rounded-b-lg drop-shadow-lg  dark:bg-gray-800">
                            <Chart1/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-5 pb-5">
                <div className="md:col-start-1 md:col-end-3">
                    <div className="">
                        <div className="md:h-10 py-2 px-3 block bg-slate-100 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900 ">
                            <h5 className="text-lg md:truncate font-bold tracking-tight text-gray-900 dark:text-white">Item Sold ({currMonth} {currYear})</h5>
                        </div>
                        <div className="md:h-72 py-2 px-3 grid grid-cols-1 md:grid-cols-2 block bg-white border-transparent rounded-b-lg drop-shadow-lg  dark:bg-gray-800">
                            <div className="md:col-start-1 md:col-end-2"><Chart2/></div>
                            <div className="md:col-start-2 md:col-end-3"><Chart3/></div>
                            
                        </div>
                    </div>
                </div>
                <div className="md:col-start-3 md:col-end-4">
                    <div className="">
                        <div className="md:h-10 py-2 px-3 block bg-slate-100 border-transparent rounded-t-lg drop-shadow-lg  dark:bg-gray-900 ">
                            <h5 className="text-lg md:truncate font-bold tracking-tight text-gray-900 dark:text-white">Sales by Category ({currMonth} {currYear})</h5>
                        </div>
                        <div className="h-64 md:h-72 py-2 px-3 block bg-white  border-transparent rounded-b-lg drop-shadow-lg  dark:bg-gray-800">
                            <Chart4/>
                        </div>
                    </div>
                </div>
            </div>
            </>
            
        </Layout>
        
    )
}