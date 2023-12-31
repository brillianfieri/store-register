import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {Item, Cart} from '../type'
import Log from '../log/log'


const Checkout = ({carts}: {carts:Cart[]}) => {
   const router = useRouter()
    
    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()

      // Check if the cart is empty.
      if(carts.length < 1){
         alert("Cart is empty!")
         return false
      }else{
         // Proceed to checkout.
         const checkout = await fetch('/api/transaction/checkout', {
               method: 'POST'
         })

         const checkoutRes = await checkout.json()

         // Change log
         Log(`checkout the cart and created transaction #${checkoutRes.id}.`)

         alert('Checkout success.')
         router.push('/transaction/')
      }
    }

   return (
      <div>
         <div className=''>
            <form onSubmit={handleSubmit} className={"px-5 pb-5"} >
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Checkout</button>
            </form>
         </div>
      </div>
   )
}
export default Checkout
