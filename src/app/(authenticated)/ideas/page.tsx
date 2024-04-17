"use client"

import { Input } from '@/components/ui/input';
import { HomeIcon } from 'lucide-react';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Idea from '@/components/Idea';
import Cookies from 'js-cookie'


const pages = [
    { name: 'Idea', href: '#', current: false },
    { name: 'List', href: '#', current: true },
]

const FeedPage = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [queryString, setQueryString] = useState("");

    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [sort, setSort] = useState('');

    const { data, isFetching, error, isLoading, isPlaceholderData } = useFetchIdeas(perPage, page, queryString);

    console.log(data?.results?.data.length);
    const ideas = data?.results?.data as Ideas[]
    const meta = data?.results?.meta

    const userCookie = Cookies.get('user');

    const user = userCookie ? JSON.parse(userCookie) : null;

    const canDeletePost = user?.role === 'Admin';

    const loadCategoryOptions = async (inputValue: string) => {
        const response = await getCategoryList(20, 1, inputValue)
        return response?.results?.data.map(item => ({ label: item.name, value: item.slug }));
    };

    const filterResult = () => {
        const params = new URLSearchParams(searchParams);
        params.set('search', `${keyword}`);
        params.set('anonymous', type === 'all' ? '' : type);
        params.set('category', `${category}`);
        params.set('sort', `${sort === 'all' ? '' : sort}`);
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


            <div className='mb-5 z-0 '>
                <div className='flex flex-wrap items-start gap-4 text-sm mb-5 z-0'>
                    <div className='flex flex-col'>
                        <Label>Keywords</Label>
                        <Input placeholder='Search here ...' className='h-10 w-72' onChange={(e) => setKeyword(e.target.value)} />
                    </div>
                    <div className='flex flex-col w-64'>
                        <Label className="mb-2">Type</Label>
                        <Select defaultValue='all' onValueChange={(value) => setType(value)}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="1">Anonymous</SelectItem>
                                <SelectItem value="0">Not Anonymous</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col w-64'>
                        <Label className="mb-2">Sort</Label>
                        <Select defaultValue='all' onValueChange={(value) => setSort(value)}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="popular">Sort by most popular</SelectItem>
                                <SelectItem value="views">Sort by most view</SelectItem>
                                <SelectItem value="comments">Sort by most comments</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col w-64'>
                        <Label>Category</Label>
                        <AsyncSelect
                            className="mt-2"
                            cacheOptions
                            loadOptions={loadCategoryOptions}
                            defaultOptions
                            onChange={(newValue: any) => {
                                setCategory(newValue.value as string)
                            }}
                        />
                    </div>
                    <div className='mt-5'>
                        <Button className='w-32 h-10' variant={'primary'} onClick={() => filterResult()} type='submit'>Filter</Button>
                    </div>
                </div>
            </div>


            {/* <div className='flex gap-4 text-sm mb-5'>
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
                            <SelectItem value="1">Anonymous</SelectItem>
                            <SelectItem value="0">Not Anonymous</SelectItem>
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
                            <SelectItem value="comments">Sort by most comment</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='mt-7'>
                    <Label />
                    <Button className='w-32' variant={'primary'} onClick={() => filterResult()} type='submit'>Filter</Button>
                </div>
            </div> */}

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
                <Idea idea={idea} key={idea.id} canDeletePost={canDeletePost} />
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