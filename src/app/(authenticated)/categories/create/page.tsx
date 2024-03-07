"use client"

import Form from "@/components/forms/Form";
import { HomeIcon, PhoneOutgoingIcon, UserCircleIcon } from "lucide-react";
import React from "react";

const page = () => {

    const pages = [
        { name: 'Categories', href: '#', current: false },
        { name: 'Create', href: '#', current: true },
    ]

    const onSubmit = () => {
        return;
    }

    return (
        <Form title="Create Category" buttonText="Create" onSubmit={onSubmit}>
            <div className="sm:col-span-6">
                <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        placeholder="Enter category name"
                    />
                </div>
            </div>
        </Form>
    )
}

export default page;