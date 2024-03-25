"use client";

import React from 'react'
import Image from 'next/image';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from 'date-fns';

const Navbar = () => {

   const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ", "&"))
   const user = JSON.parse(cookieObj.get("user") as string)


   return (
      <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="mx-6 flex h-14 max-w-screen-full items-center">
            <div className="mr-4 hidden md:flex">
               {/* <a className="mr-6 flex items-center space-x-2" href="/">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                     <rect width="256" height="256" fill="none"></rect>
                     <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                     <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                  </svg>
                  <span className="hidden font-bold sm:inline-block">Group 11</span>
               </a> */}
               <nav className="flex items-center gap-6 text-sm">

                  <p>
                     Last Login - {format(new Date(user.lastLoggedInAt), 'dd-MM-yyyy hh:mm:ss a')}
                  </p>
                  {/* <Link className="transition-colors hover:text-foreground/80 text-gray-600 font-bold" href="/feeds">Feeds</Link>
                  <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/categories">Admins</Link>
                  <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/feeds">Departments</Link>
                  <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/feeds">QA Coordinator</Link>
                  <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/feeds">Staffs</Link> */}
                  {/* <a className="transition-colors hover:text-foreground/80 text-foreground" href="/docs/components">Components</a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/themes">Themes</a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/examples">Examples</a>
            <a className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block" href="https://github.com/shadcn-ui/ui">GitHub</a> */}
               </nav>
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R96la:" data-state="closed">
               <svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M3 5H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M3 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M3 19H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
               </svg>
               <span className="sr-only">Toggle Menu</span>
            </button>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
               <div className="w-full flex-1 md:w-auto md:flex-none">


                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <Image src="https://static.vecteezy.com/system/resources/previews/014/194/216/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg" alt="shadcn/ui" width={40} height={40} />
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <DropdownMenuLabel>Testing</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>

                           {/* <div className='text-red-400'>
                              <SignOutButton />
                           </div> */}
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
         </div>
      </header>
   )
}


export default Navbar;