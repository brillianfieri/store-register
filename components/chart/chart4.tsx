import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import { defaults } from 'chart.js';



export default function chart3 () {
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
        const res = await fetch('/api/chart/chart4');
        let data = await res.json();
        setChartData(data);
    }
    fetchChart();
  }, []);

  if(!chartData){
    return (<div></div>)
  }else{
    return (
        <Doughnut key={reload}
          data = {chartData}
          options={{
            indexAxis: 'y',
            maintainAspectRatio: false,
            responsive: true,
            elements: {
                arc: {
                    borderWidth: 0
                }
            }
          }} 
        />
    );
  }
  };
