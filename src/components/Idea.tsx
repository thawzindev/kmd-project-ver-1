'use client';

import React, { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertCircleIcon, DownloadIcon, MessageCircleIcon, MoreHorizontalIcon, ThumbsDownIcon, ThumbsUpIcon, TrashIcon } from "lucide-react";
import { Ideas } from "@/types/Idea";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteIdea, reportIdea } from "@/routes/api";

const Idea = (idea: Ideas) => {

    const router = useRouter();

    const queryClient = useQueryClient();

    const [actionOpen, setActionOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const reportMutation = useMutation({
        mutationFn: (payload: any) => {
            return reportIdea(idea.slug, payload);
        },
        onSuccess: async (data) => {
            toast.success('Reported this idea', { duration: 2000 })
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setReportReason('')
            setModalOpen(false)
            setIsSubmitting(false)
        },
    })

    const ideaDeleteMutation = useMutation({
        mutationFn: () => {
            return deleteIdea(idea.slug);
        },
        onSuccess: async (data) => {
            toast.success('Deleted the idea', { duration: 2000 })
            queryClient.invalidateQueries({ queryKey: ['ideas'] })
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setReportReason('')
            setModalOpen(false)
            setIsSubmitting(false)
        },
    })

    const submitReport = () => {
        setIsSubmitting(true)
        const payload = {
            reason: reportReason
        }
        reportMutation.mutate(payload)
    }

    const submitDeleteIdea = () => {
        if (window.confirm('Are you sure you want to delete this idea?')) {
            setIsSubmitting(true)
            ideaDeleteMutation.mutate()
        }
    }



    return (
        <div className="w-full mb-4" >
            <div className="bg-white p-4 rounded-lg shadow-md mx-auto border border-gray-200">
                <div className="flex justify-between items-start">

                    <div className="flex items-center space-x-4 mt-1" onClick={() => router.push(`/ideas/${idea.slug}`)}>
                        <Image className="aspect-square w-full h-auto" alt="Image" src={
                            idea.staff ? idea.staff.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYbWQRmPgmQIMT7oEJFZuFWoGPMhH59WUkyToaSfXsg&s"
                        }
                            fill={true}
                        />
                        <div>
                            <div className="font-semibold">{idea.staff ? idea.staff.name : "Anonymous"}</div>
                            <div className="text-xs text-gray-500">{idea.submittedAt}</div>
                        </div>
                    </div>


                    {/* <MoreHorizontalIcon className="text-gray-400" /> */}
                    <DropdownMenu open={actionOpen} onOpenChange={setActionOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontalIcon className="text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuItem onClick={() => setModalOpen(true)}>
                                <AlertCircleIcon className="w-5 h-5 mr-2" />
                                Report
                            </DropdownMenuItem>
                            {
                                idea.isOwner && (
                                    <DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 hover:text-red-800"
                                            onClick={() => submitDeleteIdea()}
                                        >
                                            <TrashIcon className="w-5 h-5 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                )
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>


                <h2 className="text-2xl mt-2 font-bold cursor-pointer"
                    onClick={() => router.push(`/ideas/${idea.slug}`)}
                >
                    {idea.title}
                </h2>

                <p className="my-2 text-gray-700" onClick={() => router.push(`/ideas/${idea.slug}`)}>
                    {idea.content}
                </p>
                <small className="px-2 bg-blue-200 rounded text-gray-700" onClick={() => router.push(`/ideas/${idea.slug}`)}>
                    {idea.category?.name}
                </small>
                <div className="flex items-center space-x-2 mt-4 cursor-pointer"
                    onClick={() => router.push(`/ideas/${idea.slug}`)}
                >
                    <ThumbsUpIcon className="text-gray-400" />
                    <span className="text-gray-700">{idea.reactionsCount.THUMBS_UP?.toString()}</span>
                    <ThumbsDownIcon className="text-gray-400" />
                    <span className="text-gray-700">{idea.reactionsCount.THUMBS_DOWN?.toString()}</span>
                    <MessageCircleIcon className="text-gray-400" />
                    <span className="text-gray-700">{idea.commentsCount?.toString()}</span>
                    {/* <ShareIcon className="text-gray-400" />
                            <span className="text-gray-700">2k</span> */}
                </div>
                {idea.file && (
                    <div className="inline-flex items-center px-2 py-1 space-x-2 bg-gray-100 rounded-lg mt-5">
                        {idea.file && !['jpg', 'jpeg', 'png'].includes(idea.file.type.toString()) ? (
                            <div className="inline-flex items-center px-2 py-1 space-x-2">
                                <span className="font-medium text-gray-700">{idea.file.url.split('/').pop()?.replace(/\.[^/.]+$/, '')}.{idea.file.type.toString()}</span>
                                <DownloadIcon className="text-gray-700 cursor-pointer"
                                    onClick={() => {
                                        window.open(idea.file.url, '_blank')
                                    }}
                                />
                            </div>
                        ) : (
                            <Image className="aspect-square" alt="Sarrah" src={idea.file.url} width={240} height={200} />
                        )}

                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Report Reason
                                        </h3>
                                        <div className="mt-2">
                                            <textarea value={reportReason} onChange={(e) => setReportReason(e.target.value)} className="w-full p-2 border border-gray-300 rounded"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={submitReport} disabled={isSubmitting}>
                                    Submit
                                </button>
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => setModalOpen(false)} disabled={isSubmitting}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Idea;