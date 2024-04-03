"use client";

import React from 'react'
import Image from 'next/image';
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import { format, set } from 'date-fns';
import { BellIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getNotifications, markAllNotificationAsRead } from '@/routes/api';
import Link from 'next/link';

const Navbar = () => {

   const [allNotificationAsRead, setAllNotificationAsRead] = React.useState(false)
   const [sheetOpen, setSheetOpen] = React.useState(false)

   const closeSheet = () => {
      console.log('close sheet');
      setSheetOpen(false);
   }

   const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ", "&"))
   const user = JSON.parse(cookieObj.get("user") as string)

   const { data: markAllAsReadResp } = useQuery({
      queryKey: [`noti-read-all`],
      queryFn: () => markAllNotificationAsRead(),
      retry: false,
      enabled: allNotificationAsRead
   });

   const perPage = 5;

   const { data, error, isLoading } = useQuery({
      queryKey: ['notifications'],
      queryFn: () => getNotifications(perPage),
      retry: false,
      refetchInterval: 5000,
   });

   const markAllAsRead = () => {
      setAllNotificationAsRead(true)
      setSheetOpen(false)
   }


   return (

<<<<<<< HEAD
      <nav className="bg-white dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
=======
      <nav className="bg-gray-200 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
>>>>>>> 5bbb308dc27ce6d0e5e2a7823a457a94ad45123f
         <div className="max-w-screen-full flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
               {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"> */}
               {/* <Image src={'/images/logo/logo-color.png'} width={32} height={32} alt="EduGateways Logo" /> */}
               <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EduGateways</span>
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">


               <Sheet>
                  <SheetTrigger>
                     <button type="button" className="text-blue-700 bg-gray-300 font-medium rounded-lg text-sm px-2 py-2 text-center" onClick={() => {
                        setSheetOpen(!sheetOpen)
                     }}>
                        <BellIcon className="w-5 h-5" />
                        {/* {data?.unread_count && ( */}
                        <span className="absolute top-2 right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                           {data?.unread_count || 0}
                        </span>
                        {/* )} */}
                     </button>
                  </SheetTrigger>
                  <SheetContent>
                     <SheetHeader>
                        <SheetTitle>
                           Notifications
                           <span>
                              <button className='underline ml-3 text-sm text-blue-600' onClick={() => markAllAsRead()}>Mark all as read</button>
                           </span>
                        </SheetTitle>
                        <SheetDescription className='h-full'>
                           <div>
                              {
                                 data?.notifications?.data && data?.notifications?.data.map((notification: any) => (
                                    <div className="flex items-start py-1 my-4 border-b border-gray-300 cursor-pointer hover:bg-gray-200 p-2" key={notification.id}>
                                       <div className="w-0 flex-1 pt-0.5">
                                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                          <p className="mt-1 text-sm text-gray-500">{notification.body}</p>
                                       </div>
                                       <div className="ml-4 flex flex-shrink-0">
                                          <p>{notification.dateTime}</p>
                                       </div>
                                    </div>
                                 ))
                              }
                           </div>
                           <div className='mx-auto text-center mt-10'>
                              <Link href="/notifications" className='mx-2 my-2 bg-gray-200 p-3 w-screen hover:bg-gray-300 rounded-md'>See Previous Notifications</Link>
                           </div>
                        </SheetDescription>
                     </SheetHeader>
                  </SheetContent>
               </Sheet>


               <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
               </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
               {/* <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                     <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                  </li>
                  <li>
                     <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                  </li>
                  <li>
                     <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                  </li>
                  <li>
                     <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                  </li>
               </ul> */}

               Last Login - {format(new Date(user?.lastLoggedInAt), 'dd-MM-yyyy hh:mm:ss a')}
            </div>
         </div>
      </nav>
   )
}


export default Navbar;