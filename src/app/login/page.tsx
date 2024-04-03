"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLoginData } from "@/lib/auth";
import { login } from "@/routes/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(20)
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const Page = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return login(payload);
        },
        onSuccess: async (data) => {
            await setLoginData(data);
            router.push('/dashboard')
        },
        onError: (error) => {
            console.log('error', error.message)
        },
        onSettled: () => {
            // setIsSubmitting(false);
        }
    })

    const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
        setIsSubmitting(true);
        mutation.mutate(data);
    }

    return (

        <div className="flex flex-col justify-center min-h-screen mx-auto max-w-sm">

            <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
                <div className="my-4">
                    <h1 className="text-3xl font-sans font-bold mb-3">EduGateways</h1>
                    {/* <h1 className="text-xl font-sans font-bold">WELCOME BACK</h1> */}
                    <h2 className="text-xs font-sans-serif text-gray-500">Welcome back! Please enter your details.</h2>
                </div>

                <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-1">
                        <Input type="text"
                            className=""
                            label="Email"
                            {...register("email")}
                            error={errors.email && errors.email.message}
                            placeholder="Enter your email"
                            autoFocus
                        />
                    </div>
                    <div className="mb-1 mt-3">
                        <Input type="password"
                            className=""
                            label="Password"
                            {...register("password")}
                            error={errors.password && errors.password.message}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* <div className="flex justify-between mb-5 mt-2">
                        <a href="#" className="text-blue-500 hover:underline text-sm font-sans">
                            Forgot password?
                        </a>
                    </div> */}

                    <Button variant={'primary'}
                        type="submit"
                        className="mb-3 w-full mt-5"
                        disabled={isSubmitting} >
                        {isSubmitting ? (
                            <>
                                <Spinner width={5} height={5} className="mx-2" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </Button>

                    {
                        mutation.isError && <p className="text-red-500 text-xs my-2">
                            {mutation.error.message}
                        </p>
                    }

                </form>

            </div>

        </div>
    )
}




export default Page;