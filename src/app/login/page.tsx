"use client";

import { setLoginData } from "@/lib/auth";
import { login } from "@/routes/api";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { Erica_One } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface LoginInterface {
    email: string;
    password: string;
}

const Page = () => {

    const router = useRouter();

    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormErrors] = useState<Partial<LoginInterface>>({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const mutation = useMutation({
        mutationFn: (payload: LoginInterface) => {
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
        setFormErrors(validate(formValues))
        setIsSubmit(true);
        console.log(formError)
    }

    useEffect(() => {
        console.log(formError);
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log(formValues);
            const { email, password } = formValues;
            mutation.mutate({ email, password });
        }
    }, [formError]);

    const validate = (values: LoginInterface): Partial<LoginInterface> => {
        const errors: Partial<LoginInterface> = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            console.log("Invalid email:", values.email); // Debugging
            errors.email = "This is not a valid email format!";
        }

        if (!values.password) {
            errors.password = "Password is required!";
        }
        return errors
    }

    return (

        <div className="p-4 mx-auto w-full max-w-sm">
            {/* <pre>{JSON.stringify(formValues,undefined,2)}</pre> */}
            <div className="my-4">
                <h1 className="text-3xl font-sans font-bold">WELCOME BACK</h1>
                <h2 className="text-xs font-sans-serif text-gray-500">Welcome back! Please enter your details.</h2>
            </div>

            <form className="w-full mx-auto" onSubmit={onSubmit}>

                <div className="mb-1">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your email"
                        value={formValues.email}
                        onChange={handleChange} />
                </div>
                <p className="text-sm text-red-500">{formError.email}</p>

                <div className="mb-1 mt-3">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formValues.password}
                        onChange={handleChange} />
                </div>
                <p className="text-sm text-red-500 mb-3">{formError.password}</p>

                <div className="flex justify-between mb-5">
                    <label className="flex items-center text-sm font-sans">
                        <input type="checkbox" className="mr-2" />
                        Remember me
                    </label>
                    <a href="#" className="text-blue-500 hover:underline text-sm font-sans">Forgot password?</a>
                </div>

                <button type="submit" className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>

                <div className="flex justify-center mb-4">
                    <button className="flex justify-center bg-white border border-gray-400 hover:bg-gray-100 text-black px-4 py-2 rounded-lg text-sm w-full px-5 py-2.5 text-center font-medium">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#FFC107" d="M47.876 24.494c0-1.542-.124-2.993-.357-4.456H24v8.485h11.818a10.524 10.524 0 0 1-4.583 6.934v5.759h7.407c4.34-4.005 6.824-9.904 6.824-16.722z" />
                            <path fill="#FF3D00" d="M24 48c6.197 0 11.374-2.08 15.076-5.638l-7.407-5.759c-2.05 1.393-4.671 2.213-7.669 2.213-5.88 0-10.846-3.182-13.578-7.925H2.766v4.974A23.972 23.972 0 0 0 24 48z" />
                            <path fill="#4CAF50" d="M10.422 28.831a23.98 23.98 0 0 0 0-5.663v-4.974H2.766a23.937 23.937 0 0 0 0 15.201l7.656-5.564z" />
                            <path fill="#FF6D00" d="M24 9.379c3.336 0 6.391 1.153 8.784 3.423l6.586-6.586C35.37 2.779 30.336 0 24 0 11.045 0 0 11.045 0 24s11.045 24 24 24c6.337 0 11.371-2.779 15.37-7.236l-6.586-6.586c-2.384 2.269-5.448 3.423-8.784 3.423-6.627 0-12-5.373-12-12s5.373-12 12-12z" />
                        </svg>
                        Sign in with Google
                    </button>
                </div>

                <div className="flex justify-center">
                    <label htmlFor="noaccount" className="block mb-2 text-sm font-sans mr-2">Don't have an account?</label>
                    <a href="#" className="text-red-500 hover:underline text-sm font-sans">Sign up for free!</a>
                </div>

            </form>

            {!Object.keys(formError).length && mutation.isError ? (
                <div className="text-red-500">{mutation.error.message}</div>
            ) : null}
        </div>
    )
}

export default Page;