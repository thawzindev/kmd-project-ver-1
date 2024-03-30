"use client"

import { Input } from '@/components/ui/input';
import { CheckCircleIcon, DownloadIcon, HeartIcon, HomeIcon, MessageCircleIcon, MoreHorizontalIcon, Paperclip, PaperclipIcon, ShareIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import Image from 'next/image';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFetchIdeas } from '@/app/hooks/queries/useFetchIdeas';
import React, { useState } from 'react';
import { Ideas } from '@/types/Idea';
import { Label } from '@/components/ui/label';
import AsyncSelect from 'react-select/async';
import { getCategoryList } from '@/routes/api';
import { any } from 'zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { set } from 'date-fns';
import toast from 'react-hot-toast';

const pages = [
    { name: 'Idea', href: '#', current: false },
    { name: 'List', href: '#', current: true },
]

const FeedPage = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [queryString, setQueryString] = useState("");

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [sort, setSort] = useState('');

    const { data, isFetching, error, isLoading, isPlaceholderData } = useFetchIdeas(perPage, page, queryString);

    console.log(data?.results?.data.length);
    const ideas = data?.results?.data as Ideas[]
    const meta = data?.results?.meta

    const loadCategoryOptions = async (inputValue: string) => {
        const response = await getCategoryList(20, 1, inputValue)
        return response?.results?.data.map(item => ({ label: item.name, value: item.slug }));
    };

    const filterResult = () => {
        const params = new URLSearchParams(searchParams);
        params.set('search', `${keyword}`);
        params.set('type', `${type}`);
        params.set('category', `${category}`);
        params.set('sort', `${sort}`);
        setQueryString(params.toString());
        router.push(`${pathname}?${params.toString()}`);
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
                    <h2 className="text-xl font-bold leading-7 text-gray-900 my-3">Ideas</h2>
                    <nav className="flex" aria-label="Breadcrumb">
                        <Link href="/ideas/create" className="bg-blue-600 px-3 py-2 rounded text-white text-sm">Create Idea</Link>
                    </nav>
                </div>
            </div >

            <div className='flex gap-4 text-sm mb-5'>
                <div>
                    <Label>Keywords</Label>
                    <Input placeholder='Search here ...' className='h-10 w-72' onChange={(e) => setKeyword(e.target.value)} />
                </div>
                <div className='mt-2'>
                    <Label>Type</Label>
                    <Select defaultValue='all' onValueChange={(value) => {
                        setType(value)
                    }}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="anonymous">Anonymous</SelectItem>
                            <SelectItem value="not_anonymous">Not Anonymous</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className=''>
                    <Label>Category</Label>
                    <AsyncSelect
                        className="mt-2 w-32"
                        cacheOptions
                        loadOptions={loadCategoryOptions}
                        defaultOptions
                        onChange={(newValue: any) => {
                            setCategory(newValue.value as string)
                        }}
                    />
                </div>
                <div className='mt-2'>
                    <Label className=''>Sort</Label>
                    <Select defaultValue='all' onValueChange={(value) => {
                        setSort(value)
                    }}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="popular">Sort by most popular</SelectItem>
                            <SelectItem value="views">Sort by most view</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='mt-7'>
                    <Label />
                    <Button className='w-32' variant={'primary'} onClick={() => filterResult()} type='submit'>Filter</Button>
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
                // eslint-disable-next-line react/jsx-key
                <div className="w-full mb-4 cursor-pointer" onClick={() => router.push(`/ideas/${idea.slug}`)}>
                    <div className="bg-white p-6 rounded-lg shadow-md mx-auto border border-gray-200">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold">{idea.title}</h2>
                            <MoreHorizontalIcon className="text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                            <Image className="aspect-square" alt="Sarrah" src={
                                idea.staff ? idea.staff.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYbWQRmPgmQIMT7oEJFZuFWoGPMhH59WUkyToaSfXsg&s"
                            } width={24} height={24} />
                            <div>
                                <div className="font-semibold">{idea.staff ? idea.staff.name : "Anonymous"}</div>
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
                        {idea.file && (
                            <div className="inline-flex items-center px-4 py-2 space-x-2 bg-gray-100 rounded-lg mt-5">
                                {idea.file && !['jpg', 'jpeg', 'png'].includes(idea.file.type.toString()) ? (
                                    <div className="inline-flex items-center px-4 py-2 space-x-2">
                                        <span className="font-medium text-gray-700">{idea.file.url.split('/').pop()?.replace(/\.[^/.]+$/, '')}.{idea.file.type.toString()}</span>
                                        <DownloadIcon className="text-gray-700" />
                                    </div>
                                ) : (
                                    <Image className="aspect-square" alt="Sarrah" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYbWQRmPgmQIMT7oEJFZuFWoGPMhH59WUkyToaSfXsg&s" width={240} height={200} />
                                )}

                            </div>
                        )}
                    </div>
                </div>
            ))}

            {
                (ideas && ideas.length === 0) && (
                    <div className=''>
                        <div className="py-12 px-4 text-sm font-medium text-center text-gray-900">
                            No Result Found
                        </div>
                    </div>
                )
            }


            {
                (meta && meta?.from) && <div className=" py-3">
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

            }

        </>
    )
}

export default FeedPage;