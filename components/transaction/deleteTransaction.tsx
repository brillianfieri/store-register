// popup -> https://www.tutorialspoint.com/how-to-add-popup-in-nextjs#:~:text=We%20can%20add%20a%20Popup,the%20design%20of%20our%20website.

import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Modal from 'react-modal'
import {Transaction} from '../type'
import {customStyles} from '../../styles/modal.css.js'

const DeleteInventory = ({transaction}: {transaction: Transaction}) => {


   const router = useRouter()

   const [isOpen, setIsOpen] = useState(false)

   const deleteClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setIsOpen(true)
   }

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault()

      const response = await fetch('/api/transaction/delete', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            id: transaction.id
         }),
       })
   
      const result = await response.json()
      alert('Delete success.')
      setIsOpen(false)
      router.push('/transaction/')
  }

   return (
      <div>
         <div>
                <button onClick={deleteClicked} type="button"  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
         </div>


         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <form onSubmit={handleSubmit} className='p-5 bg-white dark:bg-gray-900'>
               <div>
                  <h2 className='text-xl font-bold dark:text-white pb-5'>
                     Delete this transaction?
                  </h2>

                  <div className='text-lg dark:text-white'>
                     <text className='font-bold'>
                        Transaction date: &nbsp;
                     </text>
                     <text>
                        {String(transaction.transaction_date)}
                     </text>
                  </div>

                  <div className='text-lg dark:text-white'>
                     <text className='font-bold'>
                        Total price: &nbsp;
                     </text>
                     <text>
                        {transaction.total_price}
                     </text>
                  </div>

               </div>
               
               <div>
                  <h3 className='text-lg font-bold dark:text-white pt-5'>
                     Item list:
                  </h3>
               </div>

               <div>
                  {transaction.transaction_details.map((detail: any) =>(
                     <div className='text-lg dark:text-white'>
                        {detail.item.name} ({detail.qty}) 
                     </div>
                  ))}
               </div>
               
               <div className='pt-5 flex flex-direction-row content-center justify-center'>
                  <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>

               </div>

            </form>
         </Modal>
      </div>
   )
}
export default DeleteInventory