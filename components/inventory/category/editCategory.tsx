// import { useRouter } from 'next/router'
import router from 'next/router'
import {Category} from '../../type'
import React, { useState } from 'react'


const EditCategory = ({category, categories}: {category: Category, categories:Category[]}) => {
    const [categoryId, setCategoryId] = useState(category.id)
    const [categoryName, setCategoryName] = useState(category.name)
 
    // const router = useRouter()
 
    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
       event.preventDefault()
 
       // Check if the modified name is not the same as the other categories' name.
       let isNotUnique = categories.find((ctg, idx) => {
          if (ctg.name.toLowerCase() == categoryName.toLowerCase() && category.name.toLowerCase() != categoryName.toLowerCase()) {
             return true;
          }
       });
 
       if(isNotUnique){
          // The new item name is not unique.
          alert("The name is already exist!")
          return false
       }else{
          // Update the category data.
          const response = await fetch('/api/inventory/category/edit', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({
              id: categoryId,
              name: categoryName,
           }),
           })
 
          const result = await response.json()
 
          alert('Edit success!')
          router.push('/inventory/')
       }
  }

   return (
      <div>
         <div>
            <form onSubmit={handleSubmit} >
                <div className="relative w-full mb-6 group">
                    <input type="text" value={categoryName}  onChange={(e) => setCategoryName(e.target.value)} name="floating_category" id="floating_category" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    {/* <label htmlFor="floating_category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Name</label> */}
                </div>
                {/* <div className='pb-5'>
                    <input type="string" name="category_name" value={category.name} id="category_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

                </div> */}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </form>
         </div>
      </div>
   )
}
export default EditCategory
