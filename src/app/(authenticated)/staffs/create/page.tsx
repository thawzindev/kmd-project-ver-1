"use client"

import Form from "@/components/forms/Form";
import { Input } from "@/components/ui/input";
import { AcademicSchema } from "@/schemas/AcademicSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { StaffSchema } from "@/schemas/StaffSchema";
import toast, { Toaster } from 'react-hot-toast';
import { createStaff } from "@/routes/api";

type StaffSchemaType = z.infer<typeof StaffSchema>;

const page = () => {

    const queryClient = new QueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<StaffSchemaType>({ resolver: zodResolver(StaffSchema) });

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return createStaff(payload);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['settings'] })
            toast.success('Successfully created the new academic year!', { duration: 2000 })
            router.push('/settings')
        },
        onError: (error) => {
            toast.success(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    })

    const onSubmit: SubmitHandler<StaffSchemaType> = async (data) => {
        
        // setIsSubmitting(true);
        // // console.log(data)

        // mutation.mutate(data);

     // Extracting the first file from the FileList
    const avatarFile = data.avatar[0];

    // Creating a FormData object to correctly format the avatar field
    const formData = new FormData();

    // Appending the avatar file to the FormData object
    formData.append('avatar', avatarFile);

    // Removing the avatar field from the data object
    delete data.avatar;

    // Adding the rest of the fields to the FormData object
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            // Asserting that key is keyof StaffSchemaType to resolve the TypeScript error
            const typedKey = key as keyof StaffSchemaType;
            formData.append(typedKey, data[typedKey]);
        }
    }

    // Calling the API with the formatted data
    mutation.mutate(formData);
    }

    const submit = handleSubmit(onSubmit);

    const onCancel = () => {
        router.back()
    }

    return (
        <Form title="Create Staff" buttonText="Save" buttonLoadingText="Saving ..." onSubmit={submit} isSubmitting={isSubmitting} onCancel={onCancel}>
            <div className="sm:col-span-6">

                <div className="mt-2">
                    <Input type="text" label="Name"
                        autoFocus
                        placeholder="Enter name ..."
                        error={errors.name && errors.name.message}
                        {...register("name")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="text" label="Email"
                        placeholder="Enter email ..."
                        error={errors.email && errors.email.message}
                        {...register("email")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="text" label="Department"
                        placeholder="Enter department ..."
                        error={errors.department && errors.department.message}
                        {...register("department")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="text" label="Role"
                        placeholder="Enter role ..."
                        error={errors.role && errors.role.message}
                        {...register("role")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="text" label="Password"
                        placeholder="Enter password ..."
                        error={errors.password && errors.password.message}
                        {...register("password")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="text" label="Confirm Password"
                        placeholder="Confirm password ..."
                        error={errors.password_confirmation && errors.password_confirmation.message}
                        {...register("password_confirmation")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="file" label="Avatar"
                        placeholder="Select profile"
                        error={errors.avatar && errors.avatar.message}
                        {...register("avatar")}
                        className="bg-gray-100"
                    />
                </div>


            </div>
        </Form>
    )

};

export default page;