import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        const currYear = parseInt(new Date().toLocaleString('default', {year: 'numeric'}))
        const currMonth = parseInt(new Date().toLocaleString('default', {month: 'numeric'}))

        let graph1Data = []

        // Loop to get the total transactions per month for the past three years.
        for(let a=currYear-2; a <= currYear; a++){
            let newData:any = await prisma.$queryRaw`
            SELECT CAST(COALESCE(sum_t, 0) AS INT) as total_transaction from (
                SELECT generate_series AS month_number FROM GENERATE_SERIES(1,12)
            ) AS gen_month
            left join (
                SELECT extract(month from date_trunc('month', transaction_date))as t_month, sum(total_price) as sum_t
                FROM transaction
                where extract(year from date_trunc('month', transaction_date)) = ${a}
                GROUP BY date_trunc('month', transaction_date)
                ORDER BY date_trunc('month', transaction_date)
            ) AS transaction_list
            on transaction_list.t_month = gen_month.month_number
            `;

            newData = newData.map(function(f:any, idx:number){
                if(idx+1 > currMonth && currYear == a){
                    return null;
                }else{
                    return f.total_transaction;
                }
                
            });
            if(currYear == a){
                graph1Data.push({
                    label: a,
                    data: newData,
                })
            }else{
                graph1Data.push({
                    label: a,
                    borderDash: [4, 5],
                    data: newData,
                })
            }


            
            
        }

        // The data is arranged based on chartjs template.
        const finalData = {
            labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            datasets: graph1Data
          }

        res.status(200).send(finalData);
    }
} 