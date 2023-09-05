// Navbar & Footer layout: Flowbite

// import { Collapse } from "flowbite";
import Link from "next/link"
import { useEffect, useState } from "react"
// import type { CollapseOptions, CollapseInterface } from "flowbite";

export default function Layout({children}:{children:any}) {
  const [menu, setMenu] = useState(false)

  function menuClicked(){
    const menuTarget = (document.getElementById('navBarList') as HTMLFormElement)
    if(menuTarget != null){
      if(menu == false){
        menuTarget.style.display = "block";
        setMenu(true);
      }else{
        menuTarget.style.display = "none";
        setMenu(false);
      }
      
    }

  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mx-auto px-6 py-4">
          <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Store Register</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" onClick={()=>{menuClicked()}} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          <div id="navBarList" className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</Link>
              </li>
              <li>
                <Link href="/transaction/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Transaction</Link>
              </li>
              <li>
                <Link href="/inventory/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Inventory List</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <main>{children}</main>
    </>
  )
}
