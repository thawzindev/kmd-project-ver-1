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
import { CategorySchema } from "@/schemas/CategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStaff, updateCategory } from "@/routes/api";
import { z } from "zod";
import useStaffEditModal from "@/app/hooks/customs/useStaffEditModal";
import { StaffEditSchema } from "@/schemas/StaffSchema";

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
        setValue('password', "")
        setValue('password_confirmation', "")

    }, [editModal.payload.name])


    const onToggle = useCallback(() => {
        editModal.onClose();
    }, [editModal])

    const onSubmit: SubmitHandler<StaffSchemaType> = (data) => {
        setIsSubmitting(true);
        mutation.mutate(data);
    }

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