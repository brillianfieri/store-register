import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Modal from 'react-modal'
import {Item, Category} from '../type'
import {customStyles} from '../../styles/modal.css.js'

const AddInventory = ({items, categories}: {items: Item[], categories:Category[]}) => {
   const router = useRouter()

   console.log(categories)

   const [isOpen, setIsOpen] = useState(false)

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()

      // Check if the item is already exist.
      let isNotUnique = items.find((item, idx) => {
         if (item.name.toLowerCase() == event.target.floating_name.value.toLowerCase()) {
            return true;
         }
      });

      if(isNotUnique){
         // Display an 'Item already exists' alert.
         alert("The name is already exist!")
         return false
      }else{
         // Add the item to inventory.
         const response = await fetch('/api/inventory/add', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name: event.target.floating_name.value,
               category_id: parseInt(event.target.category.value),
               price: parseInt(event.target.floating_price.value),
               qty: parseInt(event.target.floating_qty.value)
            }),
            })

         const result = await response.json()
   
         alert(event.target.floating_name.value+ ' added to the inventory list.')
         setIsOpen(false)
         router.push('/inventory/')
      }
  }

   return (
      <>
         <div>
            <button onClick={() => setIsOpen(true)} type="button"  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Item</button>
         </div>

         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>

            {categories.length ? 
               <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white dark:bg-gray-900" >
                  <div className="relative z-0 w-full mb-6 group">
                     <input type="text" name="floating_name" id="floating_name"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                     <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item Name</label>
                  </div>

                  <div className="pb-4">
                     <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select category</label>
                     <select id="category"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                     {categories.map((category: any) =>(
                        <option value={category.id}>{category.name}</option>
                     ))}
                     </select>
                  </div>
                  
                  <div className="relative z-0 w-full mb-6 group">
                     <input type="number" min="0" name="floating_price" id="floating_price" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                     <label htmlFor="floating_price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                     <input type="number" min="0" name="floating_qty" id="floating_qty" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                     <label htmlFor="floating_qty" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Qty</label>
                  </div>

                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
               </form>
            
            :<form className="p-5 rounded-xl bg-white dark:bg-gray-900" >
               <div>
                  <h2 className='flex flex-direction-row content-center justify-center text-xl font-bold dark:text-white pb-5'>
                     Error: No Category
                  </h2>

                  <div className='flex flex-direction-row justify-center content-center'>
                     <text className='text-lg dark:text-white'>
                        Add category first on 'Edit Category'.
                     </text>
                  </div>

                  
               </div>
               
               <div className='pt-5 flex flex-direction-row content-center justify-center'>
                  <button onClick={() => setIsOpen(false)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Back</button>


               </div>

            </form>}
            
            
         </Modal>
      </>
   )
}
export default AddInventory
