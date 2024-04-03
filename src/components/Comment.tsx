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
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteIdea, postCommentReaction, reportIdea } from "@/routes/api";
import { cn } from "@/lib/utils";
import { Ideas } from "@/types/Idea";

const Comment = ({ comment, idea }) => {

    const router = useRouter();
    const queryClient = useQueryClient();
    const [actionOpen, setActionOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const commentReactionMutation = useMutation({
        mutationFn: ({ commentId, ideaSlug, reaction }) => {
            return postCommentReaction(reaction, ideaSlug, commentId);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["comments"] });
            toast.success("Successfully reacted!", { duration: 2000 });
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 });
            console.log("error", error.message);
        },
        onSettled: () => { },
    });

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

    const createCommentReaction = (type: string, comment: any) => {
        if (comment?.currentReaction === "THUMBS_UP" && type === "THUMBS_DOWN") {
            toast.error("you have already thumb up. Please remove current reaction to thumb down.");
            return;
        } else if (comment?.currentReaction === "THUMBS_DOWN" && type === "THUMBS_UP") {
            toast.error("you have already thumb down. Please remove current reaction to thumb up.");
            return;
        }
        commentReactionMutation.mutateAsync({ commentId: comment.id, ideaSlug: idea.slug, reaction: type });
    };

    const submitReport = () => {
        setIsSubmitting(true)
        const payload = {
            reason: reportReason
        }
        reportMutation.mutate(payload)
    }

    return (
        <div className="flex space-x-3" key={comment.id}>


            <Image
                className="aspect-circle w-9 h-9"
                alt="Sarrah"
                src={comment?.staff?.avatar ? comment?.staff?.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYbWQRmPgmQIMT7oEJFZuFWoGPMhH59WUkyToaSfXsg&s"}
                width={9}
                height={9}
            />
            <div>
                <div className="flex justify-between items-start">
                    <div className="text-sm font-medium">{comment.isAnonymous !== true ? comment?.staff?.name : "Anonymous"}</div>
                    <DropdownMenu open={actionOpen} onOpenChange={setActionOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="xs">
                                <MoreHorizontalIcon className="text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuItem onClick={() => setModalOpen(true)}>
                                <AlertCircleIcon className="w-5 h-5 mr-2" />
                                Report
                            </DropdownMenuItem>
                            {/* <DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 hover:text-red-800"
                                    onClick={() => submitDeleteIdea()}
                                >
                                    <TrashIcon className="w-5 h-5 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="text-xs text-gray-500">{comment?.submittedAt}</div>


                <p className="mt-2 text-sm text-gray-700">{comment?.content}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500 gap-1">
                    <ThumbsUpIcon
                        className={cn(comment?.currentReaction === "THUMBS_UP" ? "fill-emerald-600" : "", "cursor-pointer")}
                        onClick={() => createCommentReaction("THUMBS_UP", comment)}
                    />
                    <span className="ml-1">{comment?.reactionsCount?.THUMBS_UP ?? 0}</span>
                    <ThumbsDownIcon
                        className={cn(comment?.currentReaction === "THUMBS_DOWN" ? "fill-red-400" : "", "cursor-pointer")}
                        onClick={() => createCommentReaction("THUMBS_DOWN", comment)}
                    />
                    <span className="ml-1">{comment?.reactionsCount?.THUMBS_DOWN ?? 0}</span>
                </div>
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

export default Comment;