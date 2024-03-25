"use client"

import { Input } from '@/components/ui/input';
import { CheckCircleIcon, HeartIcon, HomeIcon, MessageCircleIcon, MoreHorizontalIcon, Paperclip, PaperclipIcon, ShareIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import Image from 'next/image';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Feed from '@/components/Feed';
import Link from 'next/link';
import { useFetchIdeas } from '@/app/hooks/queries/useFetchIdeas';
import React, { useState } from 'react';
import { Ideas } from '@/types/Idea';

const pages = [
    { name: 'Idea', href: '#', current: false },
    { name: 'List', href: '#', current: true },
]

const FeedPage = () => {

    const discussions = [
        {
            id: 1,
            title: 'Atque perspiciatis et et aut ut porro voluptatem blanditiis?',
            href: '#',
            author: { name: 'Leslie Alexander', href: '#' },
            date: '2d ago',
            dateTime: '2023-01-23T22:34Z',
            status: 'active',
            totalComments: 24,
            commenters: [
                {
                    id: 12,
                    name: 'Emma Dorsey',
                    imageUrl:
                        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                {
                    id: 6,
                    name: 'Tom Cook',
                    imageUrl:
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                {
                    id: 4,
                    name: 'Lindsay Walton',
                    imageUrl:
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                {
                    id: 16,
                    name: 'Benjamin Russel',
                    imageUrl:
                        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                {
                    id: 23,
                    name: 'Hector Gibbons',
                    imageUrl:
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            ],
        },
        {
            id: 4,
            title: 'Voluptatum ducimus voluptatem qui in eum quasi consequatur vel?',
            href: '#',
            author: { name: 'Lindsay Walton', href: '#' },
            date: '5d ago',
            dateTime: '2023-01-20T10:04Z',
            status: 'resolved',
            totalComments: 8,
            commenters: [
                {
                    id: 10,
                    name: 'Emily Selman',
                    imageUrl:
                        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                {
                    id: 11,
                    name: 'Kristin Watson',
                    imageUrl:
                        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            ],
        }
    ]

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const { data, isFetching, error, isLoading, isPlaceholderData } = useFetchIdeas(perPage, page);
    const ideas = data?.results?.data as Ideas[]
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
                    <h2 className="text-xl font-bold leading-7 text-gray-900 my-3">Ideas</h2>
                    <nav className="flex" aria-label="Breadcrumb">
                        <Link href="/ideas/create" className="bg-blue-600 px-3 py-2 rounded text-white text-sm">Create Idea</Link>
                    </nav>
                </div>
            </div >

            <div className='flex gap-4 text-sm mb-5'>
                <Input placeholder='Search here ...' />
                <div>
                    <Select defaultValue='created_date'>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="created_date">Sort by Created Date</SelectItem>
                            <SelectItem value="latest_comment">Sort by Latest Comment</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* <div className="mx-auto py-4">
                <Feed />
                <Feed />
            </div> */}

            {
                isFetching && (
                    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="py-12 px-4 text-sm font-medium text-center text-gray-900">
                            Loading...
                        </div>
                    </div>
                )
            }

            {(ideas && !isFetching) && ideas.map((idea, key) => (
                <div className="w-full mb-4">
                    <div className="bg-white p-6 rounded-lg shadow-md mx-auto border border-gray-200">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold">{idea.title}</h2>
                            <MoreHorizontalIcon className="text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                            <Image className="aspect-square" alt="Sarrah" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYbWQRmPgmQIMT7oEJFZuFWoGPMhH59WUkyToaSfXsg&s" width={24} height={24} />
                            <div>
                                <div className="font-semibold">{idea.staff?.name}</div>
                                <div className="text-xs text-gray-500">{idea.submittedAt}</div>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-700">
                            {idea.content}
                        </p>
                        <div className="flex items-center space-x-2 mt-4">
                            <ThumbsUpIcon className="text-gray-400" />
                            <span className="text-gray-700">{idea.reactionsCount.THUMBS_UP?.toString()}</span>
                            <ThumbsDownIcon className="text-gray-400" />
                            <span className="text-gray-700">{idea.reactionsCount.THUMBS_DOWN?.toString()}</span>
                            <MessageCircleIcon className="text-gray-400" />
                            <span className="text-gray-700">{idea.commentsCount?.toString()}</span>
                            {/* <ShareIcon className="text-gray-400" />
                            <span className="text-gray-700">2k</span> */}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-1">
                                <PaperclipIcon className="text-gray-400" />
                                <span className="text-blue-600">Ideas.pdf</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">{idea.category?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}



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

export default FeedPage;