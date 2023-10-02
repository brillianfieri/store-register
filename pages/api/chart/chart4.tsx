import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if(req.method === 'GET'){
        const token = await getToken({ req })
        if(token && token?.role == 'admin'){
                const item:[] = await prisma.$queryRaw`
                select category.name as label, cast(COALESCE(sum, 0) as Int) as data from category
                join(select category_id, sum(transaction_detail.qty) from item
                    join transaction_detail
                    on item.id = transaction_detail.item_id
                    join transaction
                    on transaction.id = transaction_detail.transaction_id
                    where delete_item = false 
                    and extract(month from transaction_date) = date_part('month', (SELECT current_date))
                    group by category_id) as a
                on category.id = a.category_id
                where delete_category = false
                order by data
            `

            const label = item.map(function(f: { label: [String]; }){return (f.label);});
            const data = {
                label: 'Total Sold',
                data:item.map(function(f: { data: [number]; }){return (f.data);})
            }

            const finalData= {
                labels: label,
                datasets: [data]
            };

            return res.status(200).send(finalData);

        }else{
            return res.status(401).send({ error: 'Unauthorized' })
        }
    }
} 