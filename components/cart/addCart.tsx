import { useRouter } from 'next/router'
import {Item, Cart} from '../type'


const AddCart = ({item, carts}: {item: Item, carts:Cart[]}) => {
   const router = useRouter()
   let isExist = false;
   let existCartItem: Cart;
    
    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Get the new inventory qty for the selected item.
        const newItemQty = item.qty-parseInt(event.target.cartQty.value)
        
        // Check if the selected item is already in the cart.
        carts.filter(function (carts_: any) {
            if(item.id == carts_.item_id){
                isExist = true;
                existCartItem = carts_;
            }
            
        });

        // Update the inventory qty for the selected item.
        const editInvenResponse = await fetch('/api/inventory/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                qty: newItemQty
            }),
        })

        const editInvenResult = await editInvenResponse.json()
        
        if(isExist == true){
            // Update cart qty if the item already exist.
            const addCart = await fetch('/api/cart/edit', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: existCartItem.id,
                    item_id: existCartItem.item_id,
                    qty: parseInt(event.target.cartQty.value as string) + existCartItem.qty
                }),
            })
        }else{
            // Add the item to the cart.
            const addCart = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item_id: item.id,
                    qty: parseInt(event.target.cartQty.value)
                }),
            })
        }
        
        // Reset the qty input field value.
        event.target.cartQty.value = null
   

      alert(item.name + ' added to the cart.')
      router.push('/transaction/new-transaction/')
  }

   return (
      <div>
         <div>
            <form onSubmit={handleSubmit} >
                <div className='pb-5'>
                    <input type="number" min="1" max={item.qty} name="cartQty" id="cartQty" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

                </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Item</button>
            </form>
         </div>
      </div>
   )
}
export default AddCart
