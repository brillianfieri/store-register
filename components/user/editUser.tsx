import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Modal from 'react-modal'
import {User} from '../type'
import {customStyles} from '../../styles/modal.css.js'
import Log from '../log/log'

const EditUser = ({user}: {user:User}) => {
   const [fname, setFname] = useState(user.name)
   const [username, setUsername] = useState(user.username)
   const [role, setRole] = useState(user.role)
   const [password, setPassword] = useState("")
//    const [itemQty, setItemQty] = useState(item.qty)

   const router = useRouter()

   const [isOpen, setIsOpen] = useState(false)

   const editClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setIsOpen(true)
   }

   const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault()

        const addUser = await fetch('/api/auth/edit', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user.id,
                name: fname,
                oldusername: user.username,
                username: username,
                password: password,
                role: role,

            }),
        })

        const addUserMsg = await addUser.json()

        // Error alert when the item has already been taken by another user.
        if(addUserMsg.hasOwnProperty("error")){
            alert("Error: the username has already taken!")
        }else{

            // Change log
            if(user.username != username){
                Log(`modified ${user.username}'s username to ${username}.`)
            }
            if(user.name != fname){
                Log(`modified ${user.username}'s name from ${user.name} to ${fname}.`)
            }
            if(user.role != role){
                Log(`modified ${user.username}'s role from ${user.role} to ${role}.`)
            }
            if(password != ""){
                Log(`modified ${user.username}'s password.`)
            }


            alert('Edit success!')
            setIsOpen(false)
            router.push('/admin/')
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
                    <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} name="username" id="username" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={fname}  onChange={(e) => setFname(e.target.value)} name="fname" id="fname" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <label htmlFor="fname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                </div>

                <div className="pb-4">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select category</label>
                    <select id="role" value={role}  onChange={(e) => setRole(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    </select>
                </div>
                
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
         </Modal>
      </div>
   )
}
export default EditUser