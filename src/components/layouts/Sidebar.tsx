/* eslint-disable */

"use client";

import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { AlignJustifyIcon, CogIcon, LogOutIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { removeLoginData } from '@/lib/auth'
import { Permissions } from '@/types/LoginResponse'
import Icon from '../icons/Icon'

const Sidebar = () => {

    // const document = window.document

    const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ", "&"))
    const navigations = JSON.parse(cookieObj.get("sidebar") as string) as Permissions[];

    const permissions = navigations?.filter((item) => {
        return item.permissions.includes('/')
    })

    const router = useRouter()
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [current, setCurrent] = useState(permissions?.find((item) => item.url === pathname))

    useEffect(() => {
        setCurrent(permissions.find((item) => item.url === pathname))
        //eslint-disable-next-line
    }, [pathname])


    const logout = () => {
        removeLoginData();
        router.push('/login')
    }

    return (
        <>
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <AlignJustifyIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 overflow-auto bg-[#F9F9F9] lg:border-r lg:border-gray-200 lg:pt-1 lg:pb-1">

                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-[#F9F9F9]" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                        <div className="flex h-16 shrink-0 items-center">
                                            {/* <Image
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt="Your Company"
                                            width={32}
                                            height={32}
                                        /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                                                <rect width="256" height="256" fill="none"></rect>
                                                <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                                <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                            </svg>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {permissions?.map((item) => (
                                                            <li key={item.title}>
                                                                <Link
                                                                    href={item.url}
                                                                    className={cn(
                                                                        current?.url === item.url || current?.url === '/dashboard'
                                                                            ? 'bg-gray-50 text-indigo-600'
                                                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    {/* eslint-disabled-next-line */}
                                                                    {/* <Icon name={item.icon} className={cn(
                                                                        current?.url === item.url || current?.url === '/dashboard' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                                        'h-6 w-6 shrink-0'
                                                                    )} /> */}
                                                                    {item.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>

                                                <hr />

                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-3">
                                                        {/* <li>
                                                            <Link
                                                                href={"/settings"}
                                                                className={cn(
                                                                    pathname === '/settings'
                                                                        ? 'bg-gray-50 text-indigo-600'
                                                                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                )}
                                                            >
                                                                <CogIcon
                                                                    className={cn(
                                                                        pathname === '/settings' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                                        'h-6 w-6 shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                Academic Settings
                                                            </Link>
                                                        </li> */}
                                                        <li>
                                                            <button
                                                                onClick={() => logout()}
                                                                className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-400 hover:bg-red-50 hover:text-red-600 w-full"
                                                            >
                                                                <LogOutIcon
                                                                    className="h-6 w-6 shrink-0 text-red-400 group-hover:text-red-600"
                                                                    aria-hidden="true"
                                                                />
                                                                Logout
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>


                {/* Static sidebar for desktop */}
                <div className="hidden lg:block md:block lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 h-full">
                        <div className="flex h-16 shrink-0 items-center">
                            {/* <Image
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                            width={32}
                            height={32}
                        /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                                <rect width="256" height="256" fill="none"></rect>
                                <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                            </svg>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-3">
                                        {permissions?.map((item) => (
                                            <li key={item.title}>
                                                <Link
                                                    href={item.url}
                                                    className={cn(
                                                        current?.url === item.url || current?.url === '/dashboard'
                                                            ? 'bg-gray-50 text-indigo-600'
                                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    {/* <item.icon
                                                        className={cn(
                                                            current?.url === item.url ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    /> */}
                                                    {/* <Icon name={item.icon} className={cn(
                                                        current?.url === item.url || current?.url === '/dashboard' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                        'h-6 w-6 shrink-0'
                                                    )} /> */}
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <hr />
                                <li>
                                    <ul role="list" className="-mx-2 space-y-3">
                                        {/* <li>
                                            <Link
                                                href={"/settings"}
                                                className={cn(
                                                    pathname === '/settings'
                                                        ? 'bg-gray-50 text-indigo-600'
                                                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <CogIcon
                                                    className={cn(
                                                        pathname === '/settings' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                        'h-6 w-6 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                Academic Settings
                                            </Link>
                                        </li> */}
                                        <li>
                                            <button
                                                onClick={() => logout()}
                                                className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-400 hover:bg-red-50 hover:text-red-600 w-full"
                                            >
                                                <LogOutIcon
                                                    className="h-6 w-6 shrink-0 text-red-400 group-hover:text-red-600"
                                                    aria-hidden="true"
                                                />
                                                Logout

                                            </button>
                                        </li>
                                    </ul>
                                </li>


                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
