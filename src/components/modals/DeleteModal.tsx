'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import useDeleteModal from "@/app/hooks/customs/useDeleteModal";
import Modal from "./Modal";
import Heading from "./components/Heading";
import { Button } from "../ui/button";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/routes/api";
import { getDeleteFun } from "@/lib/utils";

const DeleteModal = () => {

    const queryClient = useQueryClient();

    const router = useRouter();
    const deleteModal = useDeleteModal();
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname()

    const mutation = useMutation({
        mutationFn: async (slug: string) => {
            const deleteFun = getDeleteFun(pathname);
            await deleteFun(slug);
        },
        onSuccess: async (data) => {
            console.log('no error')
            await queryClient.invalidateQueries()
            toast.success('Successfully deleted!', { duration: 2000 })
            router.push(pathname)
        },
        onError: (error) => {
            console.log('error happened')
            toast.error(error.message, { duration: 2000 })
        },
        onSettled: () => {
            setIsLoading(false);
        },
    })

    const onDelete = async (slug: string) => {
        setIsLoading(true);
        mutation.mutate(slug)
        setIsLoading(false);
        onToggle();
    }

    const onToggle = useCallback(() => {
        deleteModal.onClose();
    }, [deleteModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Are you sure want to delete this?"
            />

            <div className="space-x-4">
                <Button variant={'outline'}>Cancel</Button>
                <Button variant={'destructive'} onClick={() => onDelete(deleteModal.slug)}>Delete</Button>
            </div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={deleteModal.isOpen}
            title={deleteModal.name}
            actionLabel=""
            onClose={deleteModal.onClose}
            onSubmit={() => { }}
            body={bodyContent}
        // footer={footerContent}
        />
    );
}

export default DeleteModal;