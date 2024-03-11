"use client"

import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useFetchCategories } from "@/app/hooks/queries/useFetchCategories";

const pages = [
    { name: 'Categories', href: '#', current: false },
    { name: 'List', href: '#', current: true },
]

const Page = () => {

    const perPage = 20

    const { data, isFetching, error, isLoading } = useFetchCategories(perPage);

    const categories = data?.results?.data

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
                    <h2 className="text-xl font-bold leading-7 text-gray-900 my-3">Categories</h2>
                    <nav className="flex" aria-label="Breadcrumb">
                        <Link href="/categories/create" className="bg-blue-600 px-3 py-2 rounded text-white text-sm">Create Category</Link>
                    </nav>
                </div>
            </div >


            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            #
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {categories && categories.map((category, key) => (
                                        <tr key={category.slug}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {key + 1}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {category.name}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only">, {category.name}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="float-right py-3">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>


        </>

    )
}

export default Page;