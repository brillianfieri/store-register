import React, { useEffect, useState } from "react";


export default function chart0() {
    const [chartData, setChartData] = useState('')

    useEffect(() => { 
        async function fetchChart() {
            const res = await fetch('/api/chart/chart0');
            const data = await res.json();
            setChartData(data[0].total);
        }
        fetchChart();
      }, []);

    if(!chartData){
        return(
            <div>
                <p className="text-8xl text-gray-700 dark:text-gray-400">{String(0)}</p>
            </div>
        )
    }else{
        return(
            <>
                <p className="text-8xl text-gray-700 dark:text-gray-400">{String(chartData)}</p>
            </>
           
        )

    }

}
