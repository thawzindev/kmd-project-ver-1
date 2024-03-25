"use client"

import Form from "@/components/forms/Form";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCategory, createDepartment } from "@/routes/api";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from 'react-hot-toast';
import { CategorySchema } from "@/schemas/CategorySchema";

type CategorySchemaType = z.infer<typeof CategorySchema>;

const Page = () => {

    const queryClient = useQueryClient()

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CategorySchemaType>({ resolver: zodResolver(CategorySchema) });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return createDepartment(payload);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries('departments')
            toast.success(data?.message, { duration: 2000 })
            router.push('/departments?page=1')
        },
        onError: (error) => {
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    })

    const onSubmit: SubmitHandler<CategorySchemaType> = (data) => {
        setIsSubmitting(true);
        console.log(data)
        mutation.mutate(data);
    }

    const onCancel = () => {
        router.back()
    }

    const submit = handleSubmit(onSubmit);


    return (
        <Form title="Create Department" buttonText="Save" buttonLoadingText="Saving ..." onSubmit={submit} isSubmitting={isSubmitting} onCancel={onCancel}>
            <div className="sm:col-span-6">
                <div className="mt-2">
                    <Input type="text" label="Name"
                        autoFocus
                        placeholder="Enter the department name ..."
                        error={errors.name && errors.name.message}
                        {...register("name")}
                        className="bg-gray-100"
                    />
                </div>
            </div>
        </Form>
    )
}

export default Page;