import { Input } from '@/components/ui/input';
import { CheckCircleIcon, HeartIcon, HomeIcon, MessageCircleIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
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
                        <Link href="/ideas/create" className="bg-blue-600 px-3 py-2 rounded text-white text-sm">Create Idea</Link>
                    </nav>
                </div>
            </div >

            {/* <div className="header py-2">
                    <h1 className='text-xl font-bold'>Discussions</h1>
                </div> */}

            <div className='flex gap-4 text-sm'>
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

            <div className="mx-auto py-4">
                <Feed />
                <Feed />
                <Feed />
                <Feed />
                <Feed />
                <Feed />
            </div>

        </>
    )
}

export default FeedPage;