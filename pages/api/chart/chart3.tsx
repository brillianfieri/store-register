import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        const item:[] = await prisma.$queryRaw`
            select item.name as label, cast(COALESCE(sum, 0) as Int) as data from item
            left join (
                select name, sum(transaction_detail.qty) from item
                join transaction_detail
                on item.id = transaction_detail.item_id
                join transaction
                on transaction.id = transaction_detail.transaction_id
                where delete_item = false 
                and extract(month from transaction_date) = date_part('month', (SELECT current_date))
                group by name) as a
            on item.name = a.name
            order by data
            limit 5
        `

        const label = item.map(function(f: { label: [String]; }){return (f.label);});
        console.log(label)
        const data = {
            label: 'Total Sold',
            data:item.map(function(f: { data: [number]; }){return (f.data);})
        }
        console.log(data)

        const finalData= {
            labels: label,
            datasets: [data]
        };

        return res.status(200).send(finalData);
    }
} 