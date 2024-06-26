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
import { createCategory, updateCategory } from "@/routes/api";
import { z } from "zod";
import useCategoryEditModal from "@/app/hooks/customs/useCategoryEditModal";

type CategorySchemaType = z.infer<typeof CategorySchema>;

const EditCategoryModal = () => {

    const queryClient = useQueryClient()
    const router = useRouter();
    const editModal = useCategoryEditModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<CategorySchemaType>({ resolver: zodResolver(CategorySchema), defaultValues: { name: editModal.payload.name } });

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            return await updateCategory(payload, editModal.payload.slug);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries('categories')
            toast.success('Successfully updated the category!', { duration: 2000 })
            router.push('/categories?page=1')
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

    const onSubmit: SubmitHandler<CategorySchemaType> = (data) => {
        setIsSubmitting(true);
        mutation.mutate(data);
    }

    const submit = handleSubmit(onSubmit);

    const bodyContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <Form title="Edit Category" buttonText="Update" buttonLoadingText="Updating ..." onSubmit={submit} isSubmitting={isSubmitting} onCancel={onToggle}>
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
            </div>
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editModal.payload?.name])


    return (
        <Modal
            disabled={isSubmitting}
            isOpen={editModal.isOpen}
            title="Edit Category"
            actionLabel=""
            onClose={editModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        // footer={footerContent}
        />
    );
}

export default EditCategoryModal;