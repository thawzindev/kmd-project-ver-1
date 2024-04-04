"use client"

import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import useDeleteModal from "@/app/hooks/customs/useDeleteModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useCategoryEditModal from "@/app/hooks/customs/useCategoryEditModal";
import { useFetchReports } from "@/app/hooks/queries/useFetchReports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reportAction } from "@/routes/api";
import toast from "react-hot-toast";

const pages = [
    { name: 'Reports', href: '#', current: false },
    { name: 'List', href: '#', current: true },
]

const Page = () => {

    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const urlParams = searchParams.get('page') || 1;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(+urlParams);

    const editModal = useCategoryEditModal();
    const deleteModal = useDeleteModal();
    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: (report: any) => {
            return reportAction(report.id);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['reports'] })
            toast.success(`Successfully make an action.`, { duration: 2000 })
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    })

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('page', `${page}`);
        router.push(`${pathname}?${params.toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])


    const makeAction = (report: any) => {
        if (window.confirm('Are you sure you want to make action?')) {
            setIsSubmitting(true);
            mutation.mutate(report)
        }
    }



    const { data, isFetching, error, isLoading, isPlaceholderData } = useFetchReports(perPage, page);

    const reports = data?.results?.data

    const meta = data?.results?.meta

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
                    <h2 className="text-xl font-bold leading-7 text-gray-900 my-3">Reports</h2>
                </div>
            </div >

            {
                (isFetching || isSubmitting) && (
                    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="py-12 px-4 text-sm font-medium text-center text-gray-900">
                            Loading...
                        </div>
                    </div>
                )
            }


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
                                            Target
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Type
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Reason
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Reported By
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Action At
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {reports && reports.map((report: any, key: number) => (
                                        <tr key={report.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {meta?.from + key}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {report?.target?.title || report?.target?.content}
                                            </td>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                {report?.target?.type}
                                            </th>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {report?.reason}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {report?.reportedBy?.name}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {report?.actionAt}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                                <button onClick={() => makeAction(report)} className="text-indigo-600 hover:text-indigo-900 mx-2 disabled:text-gray-200" disabled={report?.actionAt}>
                                                    Make Action
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" py-3">
                <nav
                    className="flex items-center justify-between bg-white px-4 py-3 sm:px-6"
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