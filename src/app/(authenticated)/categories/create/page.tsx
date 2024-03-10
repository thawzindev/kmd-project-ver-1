"use client"

import Form from "@/components/forms/Form";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCategory } from "@/routes/api";
import { Input } from "@/components/ui/input";

const CategorySchema = z.object({
    name: z.string().min(4).max(20)
});

type CategorySchemaType = z.infer<typeof CategorySchema>;

const Page = () => {

    const pages = [
        { name: 'Categories', href: '#', current: false },
        { name: 'Create', href: '#', current: true },
    ]

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CategorySchemaType>({ resolver: zodResolver(CategorySchema) });

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return createCategory(payload);
        },
        onSuccess: async (data) => {
            router.push('/categories')
        },
        onError: (error) => {
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        }
    })

    const onSubmit: SubmitHandler<CategorySchemaType> = (data) => {
        setIsSubmitting(true);
        console.log(data)
        mutation.mutate(data);
    }

    const submit = handleSubmit(onSubmit);


    return (
        <Form title="Create Category" buttonText="Save" buttonLoadingText="Saving ..." onSubmit={submit} isSubmitting={isSubmitting}>
            <div className="sm:col-span-6">
                <div className="mt-2">
                    <Input type="text" label="Name"
                        autoFocus
                        placeholder="Enter the category name ..."
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