"use client"

import Form from "@/components/forms/Form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { StaffSchema } from "@/schemas/StaffSchema";
import toast, { Toaster } from 'react-hot-toast';
import { createStaff, getDepartmentList } from "@/routes/api";
import { useFetchRole } from "@/app/hooks/queries/useFetchRoles";
import Select from 'react-select'
import { Label } from "@/components/ui/label";
import AsyncSelect from 'react-select/async';
import { useFetchDepartment } from "@/app/hooks/queries/useFetchDepartment";

type StaffSchemaType = z.infer<typeof StaffSchema>;

const Page = () => {

    const queryClient = new QueryClient()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<StaffSchemaType>({ resolver: zodResolver(StaffSchema) });

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return createStaff(payload);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['staffs'] })
            toast.success('Successfully created the new staff!', { duration: 2000 })
            router.push('/staffs')
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
            console.log('error', error.message)
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    })

    const onSubmit: SubmitHandler<StaffSchemaType> = async (data) => {
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
        // Convert FormData to plain object
        const formDataObject: any = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // Log formDataObject as JSON
        console.log(JSON.stringify(formDataObject));
        mutation.mutate(formData);
    }

    const submit = handleSubmit(onSubmit);

    const onCancel = () => {
        router.back()
    }

    const { data: rolesRaw, isLoading, error } = useFetchRole();

    const roles = rolesRaw?.results.map((role) => {
        return {
            label: role.name,
            value: role.name
        }
    })

    const { data: departmentsRaw } = useFetchDepartment();

    const departments = departmentsRaw?.results.map((department) => {
        return {
            label: department.name,
            value: department.name
        }
    })

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
                    <Label htmlFor={"Role"}>Department</Label>

                    {
                        <Select
                            options={departments}
                            className=""
                            {...register("department")}
                            onChange={(newValue: any) => {
                                setValue('department', newValue.value as string)
                            }}
                        />
                    }
                    {
                        errors.department && <p className="text-red-500 text-xs my-2">{errors.department.message}</p>
                    }

                </div>

                <div className="mt-2">
                    <Label htmlFor={"Role"}>Role</Label>

                    {
                        <Select
                            options={roles}
                            className=""
                            {...register("role")}
                            onChange={(newValue: any) => {
                                setValue('role', newValue.value as string)
                            }}
                        />
                    }
                    {
                        errors.role && <p className="text-red-500 text-xs my-2">{errors.role.message}</p>
                    }

                </div>

                <div className="mt-2">
                    <Input type="password" label="Password"
                        placeholder="Enter password ..."
                        error={errors.password && errors.password.message}
                        {...register("password")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="password" label="Confirm Password"
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
                    {/* <input name="file" type="file" {...register("avatar")} /> */}
                </div>


            </div>
        </Form>
    )

};

export default Page;