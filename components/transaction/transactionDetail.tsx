import {Transaction} from '../type'


const TransactionDetail = ({selectedTransaction}: {selectedTransaction: Transaction}) => {

   return (
        
        <div className={"px-5 pb-5"}>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Item Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedTransaction.transaction_details.map((detail: any) =>(
                            <tr key={detail.item_id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {detail.item.name}
                                </th>
                                <td className="px-6 py-4">
                                    {detail.qty.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    {(detail.current_price*detail.qty).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
   )
}
export default TransactionDetail
