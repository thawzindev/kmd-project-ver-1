'use client';

import { useCallback, useState, useMemo, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Form from "../forms/Form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStaff, updateCategory } from "@/routes/api";
import { z } from "zod";
import useStaffEditModal from "@/app/hooks/customs/useStaffEditModal";
import { StaffEditSchema } from "@/schemas/StaffSchema";
import { Label } from "../ui/label";
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import { useFetchRole } from "@/app/hooks/queries/useFetchRoles";
import { useFetchDepartment } from "@/app/hooks/queries/useFetchDepartment";

type StaffSchemaType = z.infer<typeof StaffEditSchema>;

const EditStaffModal = () => {

    const queryClient = useQueryClient()
    const router = useRouter();
    const editModal = useStaffEditModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<StaffSchemaType>({ resolver: zodResolver(StaffEditSchema) });

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            if (payload.password === "") {
                delete payload.password;
                delete payload.password_confirmation;
            }
            return await editStaff(editModal.payload.id, payload);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["staffs"] })
            toast.success('Successfully updated the staff!', { duration: 2000 })
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
        },
        onSettled: () => {
            setIsSubmitting(false);
            onToggle()
        },
    })

    useEffect(() => {
        setValue('name', editModal.payload.name as string)
        setValue('role', editModal.payload.role as string)
        setValue('department', editModal.payload.department?.slug as string)
        // setValue('password', "")
        // setValue('password_confirmation', "")

        console.log(editModal.payload.department?.slug)

    }, [editModal.payload.name])


    const onToggle = useCallback(() => {
        editModal.onClose();
    }, [editModal])

    const onSubmit: SubmitHandler<StaffSchemaType> = (data) => {
        setIsSubmitting(true);
        mutation.mutate(data);
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

    const submit = handleSubmit(onSubmit);

    const bodyContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <Form title="Edit Staff" buttonText="Update" buttonLoadingText="Updating ..." onSubmit={submit} isSubmitting={isSubmitting} onCancel={onToggle}>
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

                        <div className="mt-2">
                            <Label htmlFor={"Role"}>Department</Label>

                            {
                                <Select
                                    options={departments}
                                    className=""
                                    {...register("department")}
                                    onChange={(newValue: any) => {
                                        console.log(newValue)
                                        setValue('department', newValue.value as string)
                                    }}
                                    value={departments?.find((department) => department.value === editModal.payload?.department?.slug)}
                                    defaultValue={editModal.payload?.department?.slug}
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
                                    value={roles?.find((role) => role.value === editModal.payload.role)}
                                    defaultValue={editModal.payload.role}
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

                    </div>
                </Form>
            </div>
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editModal.payload.name, editModal.payload.id])


    return (
        <Modal
            disabled={isSubmitting}
            isOpen={editModal.isOpen}
            title="Edit Staff"
            actionLabel=""
            onClose={editModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        // footer={footerContent}
        />
    );
}

export default EditStaffModal;