"use client";

import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Spinner from "../ui/spinner";
import { Button } from "../ui/button";

interface FormInterface {
    title: string;
    buttonText: string;
    buttonLoadingText: string;
    onSubmit: () => void;
    onCancel: () => void;
    children: React.ReactNode;
    isSubmitting: boolean;
}

const pages = [
    { name: 'Categories', href: '#', current: false },
    { name: 'Create', href: '#', current: true },
]

const Form = ({ title, buttonText, onSubmit, children, isSubmitting, buttonLoadingText, onCancel }: FormInterface) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(() => {
        if (isLoading) return;
        onSubmit();
    }, [onSubmit, isLoading]);

    return (
        <div className="">
            <form onSubmit={onSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-5">
                        <div className="flex items-center justify-between gap-x-6">
                            <h2 className="text-xl font-bold leading-7 text-gray-900">{title}</h2>
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {children}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button variant={'outline'}
                        type="button"
                        className="mb-3"
                        onClick={() => onCancel()}
                        disabled={isSubmitting} >
                        Cancel
                    </Button>
                    <Button variant={'primary'}
                        type="submit"
                        className="mb-3 w-24"
                        disabled={isSubmitting} >
                        {isSubmitting ? (
                            <>
                                <Spinner width={5} height={5} className="mx-2" />
                                <span>{buttonLoadingText}</span>
                            </>
                        ) : (
                            `${buttonText}`
                        )}
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default Form;