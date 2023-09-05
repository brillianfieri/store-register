import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { defaults } from 'chart.js';
import { PrismaClient } from "@prisma/client";
import {InferGetServerSidePropsType } from "next";



export default function chart1 () {
    const [reload, setReload] = useState(0);
    let darkMode: MediaQueryList | null = null

    function setColor(isDark: Boolean){
        if(isDark){
            defaults.color = "rgb(255,255,255)";
        }else{
            defaults.color = "rgb(0,0,0)";
        }
    }
    
    useEffect(()=>{
        darkMode = window.matchMedia("(prefers-color-scheme: dark)")

        if(darkMode != null){

          setColor(darkMode.matches)

        const themeChanged = (e: any) => {
          console.log(e.matches)
            setColor(e.matches)
            setReload(Math.random())
          }
        darkMode.addEventListener("change", themeChanged);

        return () => darkMode!.removeEventListener("change", themeChanged); 
        }

    },[]);

  const [chartData, setChartData] = useState();

  
  useEffect(() => { 
    async function fetchChart() {
        const res = await fetch('/api/chart/chart1');
        let data = await res.json();
        setChartData(data);
    }
    fetchChart();
  }, []);
  if(!chartData){
    return (<div></div>)
  }else{
    return (
        <Line key={reload}
          data = {chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true
          }} 
        />
    );
  }
  };
