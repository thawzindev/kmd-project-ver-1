"use client";

import { setLoginData } from "@/lib/auth";
import { login } from "@/routes/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginInterface {
    email: string;
    password: string;
}

const Page = () => {

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (payload) => {
            return login(payload);
        },
        onSuccess: async (data) => {
            console.log('success', data)
            await setLoginData(data);
            router.push('/')
        },
        onError: (error) => {
            console.log('error', error.message)
        }
    })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;

        mutation.mutate({ email, password });
    }

    return (

        <div className="p-4">


            <div className="my-4 text-xl font-bold">
                <h2>Login</h2>
            </div>
            <form className="w-full mx-auto" onSubmit={onSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>

            {mutation.isError ? (
                <div>An error occurred: {mutation.error.message}</div>
            ) : null}
        </div>
    )
}

export default Page;