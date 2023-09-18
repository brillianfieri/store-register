// popup -> https://www.tutorialspoint.com/how-to-add-popup-in-nextjs#:~:text=We%20can%20add%20a%20Popup,the%20design%20of%20our%20website.

import router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {Category} from '../../type'
import {customStyles} from '../../../styles/modal.css.js'
import EditCategory from './editCategory'
import DeleteCategory from './deleteCategory'


const IndexCategory = ({categories}: {categories: Category[]}) => {
    const [isOpen, setIsOpen] = useState(false)

   const editClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setIsOpen(true)
   }
 

   const handleAddCategory = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()

      // Check if the category is already exist.
      let isNotUnique = categories.find((category, idx) => {
         if (category.name.toLowerCase() == event.target.floating_category.value.toLowerCase()) {
            return true;
         }
      });

      if(isNotUnique){
         // Display an 'Category already exists' alert.
         alert("The name is already exist!")
         return false
      }else{
         // Add the category to the list.
         const response = await fetch('/api/inventory/category/add', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name: event.target.floating_category.value,
            }),
            })

         const result = await response.json()
   
         alert(event.target.floating_category.value+ ' added to the inventory list.')
         router.push('/inventory')
        }
    }
      

   return (
      <div>
         <div>
         <button onClick={editClicked} type="button"  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Category</button>
            {/* <button onClick={editClicked} type="button"  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button> */}
         </div>


         <Modal className='' isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <div className="p-5 bg-white dark:bg-gray-900">
                <form onSubmit={handleAddCategory} className="p-5 bg-white dark:bg-gray-900">
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_category" id="floating_category"  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Add Category</label>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>

                <div className='max-h-72 overflow-y-auto overflow-x-auto'>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="z-10 top-0 sticky text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="top-0 sticky">
                                <th scope="col" className="top-0 sticky px-6 py-3">
                                    Category Name
                                </th>
                                <th scope="col" className="top-0 sticky px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category: any) =>(
                                <tr key={category.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <EditCategory category={category} categories={categories}/>
                                    </th>
                                    <td className="px-6 py-4">
                                        <DeleteCategory category={category}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>



            </div>
            {/* <form onSubmit={handleSubmit} className="p-5 bg-white dark:bg-gray-900" >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={itemName}  onChange={(e) => setItemName(e.target.value)} name="floating_name" id="floating_name" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item Name</label>
                </div>

                <div className="pb-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select category</label>
                    <select id="category" value={itemCategory}  onChange={(e) => setItemCategory(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="Food">Food</option>
                    <option value="Drink">Drink</option>
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
            </form> */}
         </Modal>
      </div>
   )
}
export default IndexCategory