import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Modal from 'react-modal'
import {Category, Item} from '../type'
import {customStyles} from '../../styles/modal.css.js'

const EditInventory = ({item, items, categories}: {item: Item, items:Item[], categories:Category[]}) => {
   const [itemId, setItemId] = useState(item.id)
   const [itemName, setItemName] = useState(item.name)
   const [itemCategory, setItemCategory] = useState(item.category.id)
   const [itemPrice, setItemPrice] = useState(item.price)
   const [itemQty, setItemQty] = useState(item.qty)

   const router = useRouter()

   const [isOpen, setIsOpen] = useState(false)

   const editClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setIsOpen(true)
   }

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()

      // Check if the modified name is not the same as the other items' name.
      let isNotUnique = items.find((itm, idx) => {
         if (itm.name.toLowerCase() == itemName.toLowerCase() && item.name.toLowerCase() != itemName.toLowerCase()) {
            return true;
         }
      });

      if(isNotUnique){
         // The new item name is not unique.
         return false
      }else{
         // Update the item data.
         const response = await fetch('/api/inventory/edit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             id: itemId,
             name: itemName,
             category_id: parseInt(itemCategory),
             price: parseInt(itemPrice),
             qty: parseInt(itemQty)
          }),
          })

         const result = await response.json()

         alert('Edit success!')
         setIsOpen(false)
         router.push('/inventory/')
         
      }
      
  }

   return (
      <div>
         <div>
            <button onClick={editClicked} type="button"  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
         </div>


         <Modal className='' isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <form onSubmit={handleSubmit} className="p-5 bg-white dark:bg-gray-900" >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={itemName}  onChange={(e) => setItemName(e.target.value)} name="floating_name" id="floating_name" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item Name</label>
                </div>

                <div className="pb-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select category</label>
                    <select id="category" value={itemCategory}  onChange={(e) => setItemCategory(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {categories.map((category: any) =>(
                        <option value={category.id}>{category.name}</option>
                     ))}
                    </select>
                </div>
                
                <div className="relative z-0 w-full mb-6 group">
                    <input type="number" value={itemPrice} min="0" onChange={(e) => setItemPrice(parseInt(e.target.value))} name="floating_price" id="floating_price" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="floating_price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="number" value={itemQty} min="0" onChange={(e) => setItemQty(parseInt(e.target.value))} name="floating_qty" id="floating_qty" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_qty" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Qty</label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
         </Modal>
      </div>
   )
}
export default EditInventory