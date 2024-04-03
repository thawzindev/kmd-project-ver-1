"use client"

import Form from "@/components/forms/Form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createIdea, getCategoryList } from "@/routes/api";
import { IdeaSchema } from "@/schemas/IdeaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import AsyncSelect from 'react-select/async';
import { Switch } from "@/components/ui/switch";
import { useCreateIdeaMutation } from "@/app/hooks/mutations/useCreateIdeaMutation";
import { Checkbox } from "@/components/ui/checkbox";

type IdeaSchemaType = z.infer<typeof IdeaSchema>;

const Page = () => {

    const queryClient = new QueryClient()

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<IdeaSchemaType>({ resolver: zodResolver(IdeaSchema) });

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return createIdea(payload);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['ideas'] })
            toast.success('Successfully created the new idea!', { duration: 2000 })
            router.push('/ideas')
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    })

    const onSubmit: SubmitHandler<IdeaSchemaType> = async (data) => {
        const fileUpload = data.file[0];
        let file = fileUpload === undefined ? null : fileUpload;

        const formData = new FormData();

        if (file) {
            formData.append('file', file);
        }

        delete data.file;

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const typedKey = key as keyof IdeaSchemaType;
                formData.append(typedKey, data[typedKey]);
            }
        }

        const formDataObject: any = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        setIsSubmitting(true)

        mutation.mutate(formData);
    }

    const loadCategoryOptions = async (inputValue: string) => {
        const response = await getCategoryList(35, 1)
        return response?.results?.data.map(item => ({ label: item.name, value: item.slug }));
    };


    const submit = handleSubmit(onSubmit);

    const onCancel = () => {
        router.back()
    }

    return (

        <Form title="Create Idea" buttonText="Post" buttonLoadingText="Posting ..." onSubmit={submit} isSubmitting={isSubmitting} onCancel={onCancel}>
            <div className="sm:col-span-6">
                <div className="mt-2">
                    <Input type="text" label="Title"
                        autoFocus
                        placeholder="Enter title ..."
                        error={errors.title && errors.title.message}
                        {...register("title")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-3">
                    <Label htmlFor={"Category"}>Select Category</Label>
                    <AsyncSelect
                        className="mt-2"
                        cacheOptions
                        loadOptions={loadCategoryOptions}
                        defaultOptions
                        {...register("category")}
                        onChange={(newValue: any) => {
                            setValue('category', newValue.value as string)
                        }}
                    />
                    {
                        errors.category && <p className="text-red-500 text-xs my-2">{errors.category && errors.category.message}</p>
                    }

                </div>

                {/* <div className="mt-2">
                    <Input type="text" label="Content"
                        autoFocus
                        placeholder="Enter content ..."
                        error={errors.content && errors.content.message}
                        {...register("content")}
                        className="bg-gray-100"
                    />
                </div> */}
                <div className="mt-2">
                    <Label htmlFor={"Content"}>Content</Label>
                    <textarea
                        rows={8} className="mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Content ..."
                        error={errors.content && errors.content.message}
                        {...register("content")}
                    />
                    {
                        errors.category && <p className="text-red-500 text-xs my-2">{errors.content && errors.content.message}</p>
                    }
                </div>

                <div className="mt-2">
                    <Input type="file" label="Select File"
                        placeholder="Select File"
                        error={errors.file && errors.file.message}
                        {...register("file")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="flex items-center space-x-2 mt-10">
                    {
                        <Switch
                            {...register("is_anonymous", { value: "0" })}
                            onCheckedChange={(newValue: any) => {
                                setValue('is_anonymous', newValue ? "1" : "0")
                            }}
                        />
                    }
                    <Label htmlFor="is_anonymous">Post anonymously</Label>

                    {
                        errors.is_anonymous && <p className="text-red-500 text-xs my-2">{errors.is_anonymous.message}</p>
                    }
                </div>

                <div className="mt-10">
                    <div className="items-top flex space-x-2">
                        <Checkbox id="terms1" {...register("terms_and_conditions")} onCheckedChange={(newValue) => {
                            setValue('terms_and_conditions', newValue ? "1" : "0")
                        }} />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                            <p className="text-sm text-muted-foreground">
                                You agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>

                    {
                        errors.terms_and_conditions && <p className="text-red-500 text-xs my-2">{errors.terms_and_conditions.message}</p>
                    }
                </div>

            </div>
        </Form>

    )
}

export default Page;