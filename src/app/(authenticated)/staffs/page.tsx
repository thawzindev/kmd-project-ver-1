"use client"

import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useFetchCategories } from "@/app/hooks/queries/useFetchCategories";
import { useFetchStaffs } from "@/app/hooks/queries/useFetchStaffs";
import { Staff } from "@/types/Staff";
import useDeleteModal from "@/app/hooks/customs/useDeleteModal";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleStaffStatus, toggleStaffVisibility } from "@/routes/api";
import toast from "react-hot-toast";
import useStaffEditModal from "@/app/hooks/customs/useStaffEditModal";
import { Badge } from "@/components/ui/badge";
import Cookies from 'js-cookie'

const pages = [
    { name: 'Staffs', href: '#', current: false },
    { name: 'List', href: '#', current: true },
]

const Page = () => {

    const sidebarCookie = Cookies.get('sidebar');

    const sidebarPermission = sidebarCookie ? JSON.parse(sidebarCookie) : null;

    const permission = sidebarPermission.find((per) => per.url === '/staffs');

    console.log(permission)

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const editModal = useStaffEditModal();
    const deleteModal = useDeleteModal();

    const queryClient = useQueryClient();

    const { data, isFetching, error, isLoading, isPlaceholderData } = useFetchStaffs(perPage, page);
    const staffs = data?.results?.data as Staff[]
    const meta = data?.results?.meta
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: (staff: Staff) => {
            return toggleStaffStatus(staff.id, staff.disabledAt ? 'enable' : 'disable');
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['staffs'] })
            toast.success(`Successfully update the status`, { duration: 2000 })
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    })

    const commentVisibleMutation = useMutation({
        mutationFn: (staff: Staff) => {
            return toggleStaffVisibility(staff.id, 'comments');
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['staffs'] })
            toast.success(`Successfully updated the comments visiblity.`, { duration: 2000 })
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    })

    const ideaVisibleMutation = useMutation({
        mutationFn: (staff: Staff) => {
            return toggleStaffVisibility(staff.id, 'ideas');
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['staffs'] })
            toast.success(`Successfully updated the ideas visiblity.`, { duration: 2000 })
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    })


    const updateStaffStatus = (staff: Staff): void => {
        if (window.confirm(`Are you sure you want to ${staff.disabledAt ? 'enable' : 'disable'} ${staff.name}?`)) {
            setIsSubmitting(true);
            mutation.mutate(staff)
        }
    }

    const toggleVisibility = (staff: Staff, toggleType: string): void => {
        if (window.confirm(`Are you sure you want to ${staff.isCommentsHidden ? 'turn on' : 'turn off'} ${toggleType} visibility for ${staff.name}?`)) {
            setIsSubmitting(true);
            toggleType === 'comments' ? commentVisibleMutation.mutate(staff) : ideaVisibleMutation.mutate(staff)
        }
    }

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
                    <h2 className="text-xl font-bold leading-7 text-gray-900 my-3">Staffs</h2>
                    <nav className="flex" aria-label="Breadcrumb">
                        <Link href="/staffs/create" className="bg-blue-600 px-3 py-2 rounded text-white text-sm">Create Staff</Link>
                    </nav>
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
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Username
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Role
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Department
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Additional
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {(staffs) && staffs.map((staff, key) => (
                                        <tr key={key}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 pl-4 bg-gray-100">
                                                {meta?.from + key}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-left text-sm font-medium text-gray-900 pl-4">
                                                {staff.name}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-left text-sm font-medium text-gray-900 pl-4">
                                                {staff.email}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-left text-sm font-medium text-gray-900 pl-4">
                                                {staff.username}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-left text-sm font-medium text-gray-900 pl-4">
                                                {staff.role}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-left text-sm font-medium text-gray-900 pl-4">
                                                {staff.department?.name}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-left text-sm font-medium text-gray-900 pl-4 space-x-2">
                                                <Badge variant={staff.isCommentsHidden ? 'destructive' : 'secondary'}>
                                                    {staff.isCommentsHidden ? 'Comments Hidden' : 'Comments Visible'}
                                                </Badge>
                                                <Badge variant={staff.isIdeasHidden ? 'destructive' : 'secondary'}>
                                                    {staff.isIdeasHidden ? 'Ideas Hidden' : 'Ideas Visible'}
                                                </Badge>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                                {
                                                    permission.permissions.includes('/update') && (
                                                        <>
                                                            <button onClick={() => editModal.onOpen(staff)} className="text-indigo-600 hover:text-indigo-900 mx-2">
                                                                Edit<span className="sr-only">, {staff.name}</span>
                                                            </button>

                                                            <button onClick={() => updateStaffStatus(staff)} className={cn('mx-2', staff.disabledAt ? "text-emerald-500" : "text-orange-600")}>
                                                                {
                                                                    staff.disabledAt ? 'Enable' : 'Disable'
                                                                }
                                                            </button>
                                                        </>
                                                    )
                                                }
                                                {
                                                    permission.permissions.includes('/toggle-visibility') && (
                                                        <>
                                                            <button onClick={() => toggleVisibility(staff, 'comments')} className={cn('mx-2', staff.isCommentsHidden ? "text-emerald-500" : "text-orange-600")}>
                                                                {
                                                                    staff.isCommentsHidden ? 'Turn On Comments Visibility' : 'Turn Off Comments Visibility'
                                                                }
                                                            </button>
                                                            <button onClick={() => toggleVisibility(staff, 'ideas')} className={cn('mx-2', staff.isIdeasHidden ? "text-emerald-500" : "text-orange-600")}>
                                                                {
                                                                    staff.isIdeasHidden ? 'Turn On Ideas Visibility' : 'Turn Off Ideas Visibility'
                                                                }
                                                            </button>
                                                        </>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >

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