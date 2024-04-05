"use client"

import useDeleteModal from "@/app/hooks/customs/useDeleteModal";
import useEditModal from "@/app/hooks/customs/useCategoryEditModal";
import { useFetchAcedamicYear } from "@/app/hooks/queries/useFetchAcademicYear";
import { Notification } from "@/types/AcademicYear";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useFetchNotification } from "@/app/hooks/queries/useFetchNotification";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification } from "@/routes/api";
import { cn } from "@/lib/utils";

const pages = [
    { name: 'Settings', href: '#', current: false },
    { name: 'Notifications', href: '#', current: true },
]

const Page = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const { data, isFetching, error, isLoading, isPlaceholderData } = useFetchNotification(perPage, page);
    const notifications = data?.notifications?.data as Notification[]
    const meta = data?.notifications?.meta

    const mutation = useMutation({
        mutationFn: (id: string) => {
            return readNotification(id);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['notifications'] })
        },
        onError: (error) => {
            console.log('error', error.message)
        },
        onSettled: () => {
        },
    })

    return (

        <>
            <div>
                <ol role="list" className="flex items-center space-x-1">
                    <li>
                        <div>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                <span className="sr-only">Home</span>
                            </a>
                        </div>
                    </li>
                    {pages.map((page) => (
                        <li key={page.name}>
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 flex-shrink-0 text-gray-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                                <a
                                    href={page.href}
                                    className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-700"
                                    aria-current={page.current ? 'page' : undefined}
                                >
                                    {page.name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
                <div className="flex items-center justify-between gap-x-6">
                    <h2 className="text-xl font-bold leading-7 text-gray-900 my-3">Notifications</h2>
                </div>
            </div >

            {
                isFetching && (
                    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="py-12 px-4 text-sm font-medium text-center text-gray-900">
                            Loading...
                        </div>
                    </div>
                )
            }

            <div className="mt-2 flow-root">
                <div>
                    {
                        notifications && notifications.map((notification: any) => (
                            // <div key={notification.id} className="flex items-center justify-between p-2 border-b border-gray-100 dark:border-gray-700">
                            //    <div className="flex items-center space-x-2">
                            //       <span className="text-sm font-medium">{notification.title}</span>
                            //       <span className="text-xs text-gray-500 dark:text-gray-400">{notification.dateTime}</span>
                            //    </div>
                            //    <br />
                            //    <p className="text-xs text-gray-500 dark:text-gray-400">{notification.body}</p>
                            // </div>
                            <div className={cn('flex items-start py-1 my-4 border-b border-gray-300 cursor-pointer hover:bg-gray-200 p-2 rounded-lg', notification.read ? '' : 'bg-gray-300')} key={notification.id} onClick={() => {
                                router.push(notification.link)
                                mutation.mutate(notification.id)
                            }}>
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
            </div >

            <div className="py-3">
                <nav
                    className="flex items-center justify-between bg-white px-0 py-3 sm:px-6"
                    aria-label="Pagination"
                >
                    <div className="hidden sm:block">
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{meta?.from}</span> to <span className="font-medium">{meta?.to}</span> of{' '}
                            <span className="font-medium">{meta?.total}</span> results
                        </p>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end">
                        <button
                            onClick={() => setPage((page) => page - 1)}
                            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:text-gray-400"
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                if (!isPlaceholderData && page < meta?.last_page) {
                                    setPage((page) => page + 1)
                                }
                            }}
                            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:text-gray-400"
                            disabled={page === meta?.last_page}
                        >
                            Next
                        </button>
                    </div>
                </nav>
            </div>


        </>





    )
}

export default Page;