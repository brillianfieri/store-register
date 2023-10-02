import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Modal from 'react-modal'
import {Item} from '../type'
import {customStyles} from '../../styles/modal.css.js'
import Log from '../log/log'

const DeleteInventory = ({item}: {item: Item}) => {

   const router = useRouter()

   const [isOpen, setIsOpen] = useState(false)


   const deleteClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      // Display a modal to confirm the action.
      setIsOpen(true)
   }

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()

      // Delete the item from inventory.
      const response = await fetch('/api/inventory/delete', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
          id: item.id
       }),
       })

      const result = await response.json()

      // Change log
      Log(`removed ${item.name} from the inventory list.`)

      alert(item.name + ' has been removed from the inventory.')
      setIsOpen(false)
      router.push('/inventory/')
  }

   return (
      <div>
         <div>
                <button onClick={deleteClicked} type="button"  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2">Delete</button>
         </div>


         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white dark:bg-gray-900" >
               <div className='flex flex-direction-row content-center justify-center'>
                  <div>
                     <h2 className='text-xl font-bold dark:text-white pb-5'>
                        Delete this item?
                     </h2>

                     <div className='text-lg dark:text-white'>
                        <text className='font-bold'>
                           Item name: &nbsp;
                        </text>
                        <text>
                           {item.name}
                        </text>
                     </div>

                     <div className='text-lg dark:text-white'>
                        <text className='font-bold'>
                           Category: &nbsp;
                        </text>
                        <text>
                           {item.category.name}
                        </text>
                     </div>

                     <div className='text-lg dark:text-white'>
                        <text className='font-bold'>
                           Price: &nbsp;
                        </text>
                        <text>
                           {item.price}
                        </text>
                     </div>

                     <div className='text-lg dark:text-white'>
                        <text className='font-bold'>
                           Qty: &nbsp;
                        </text>
                        <text>
                           {item.qty}
                        </text>
                     </div>

                  </div>
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