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
import Heading from "./components/Heading";
import Form from "../forms/Form";
import { Input } from "../ui/input";
import { CategorySchema } from "@/schemas/CategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, updateCategory, updateDepartment } from "@/routes/api";
import { z } from "zod";
import { DepartmentSchema } from "@/schemas/DepartmentSchema";
import useDepartmentEditModal from "@/app/hooks/customs/useDepartmentEditModal";

type DepartmentSchemaType = z.infer<typeof DepartmentSchema>;

const EditDepartmentModal = () => {

    const queryClient = useQueryClient()
    const router = useRouter();
    const editModal = useDepartmentEditModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<DepartmentSchemaType>({ resolver: zodResolver(DepartmentSchema), defaultValues: { name: editModal.payload.name } });

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            return await updateDepartment(payload, editModal.payload.slug);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries('departments')
            toast.success('Successfully updated the department!', { duration: 2000 })
            router.push('/departments?page=1')
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editModal.payload.name])


    const onToggle = useCallback(() => {
        editModal.onClose();
    }, [editModal])

    const onSubmit: SubmitHandler<DepartmentSchemaType> = (data) => {
        setIsSubmitting(true);
        mutation.mutate(data);
    }

    const submit = handleSubmit(onSubmit);

    const bodyContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <Form title="Edit Department" buttonText="Update" buttonLoadingText="Updating ..." onSubmit={submit} isSubmitting={isSubmitting} onCancel={onToggle}>
                    <div className="sm:col-span-6">
                        <div className="mt-2">
                            <Input type="text" label="Name"
                                autoFocus
                                placeholder="Enter the Department name ..."
                                error={errors.name && errors.name.message}
                                {...register("name")}
                                className="bg-gray-100"
                            />
                        </div>
                    </div>
                </Form>
            </div>
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editModal.payload?.name])


    return (
        <Modal
            disabled={isSubmitting}
            isOpen={editModal.isOpen}
            title="Edit Department"
            actionLabel=""
            onClose={editModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        // footer={footerContent}
        />
    );
}

export default EditDepartmentModal;