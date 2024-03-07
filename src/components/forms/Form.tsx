"use client";

import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface FormInterface {
    title: string;
    buttonText: string;
    onSubmit: () => void;
    children: React.ReactNode;
}

const pages = [
    { name: 'Categories', href: '#', current: false },
    { name: 'Create', href: '#', current: true },
]

const Form = ({ title, buttonText, onSubmit, children }: FormInterface) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(() => {
        if (isLoading) return;
        onSubmit();
    }, [onSubmit, isLoading]);

    return (
        <div className="">
            <form onSubmit={onSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="flex items-center justify-between gap-x-6">
                            <h2 className="text-xl font-bold leading-7 text-gray-900">Create Category</h2>
                            <nav className="flex" aria-label="Breadcrumb">
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
                            </nav>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {children}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => router.back()}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {buttonText}
                    </button>
                </div>
            </form>
        </div >
    )
}

export default Form;