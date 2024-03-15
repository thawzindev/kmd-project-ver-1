"use client"

import React, { useState } from "react";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import Form from "@/components/forms/Form";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from 'react-hot-toast';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createAcademicYear } from "@/routes/api";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AcademicSchema = z.object({
    academic_year: z.string().min(4).max(20),
    start_date: z.string().min(4).max(20),
    closure_date: z.string().min(4).max(20),
    final_closure_date: z.string().min(4).max(20)
});

type AcademicSchemaType = z.infer<typeof AcademicSchema>;

const page = () => {

    const queryClient = new QueryClient()

    
    const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AcademicSchemaType>({ resolver: zodResolver(AcademicSchema) });

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return createAcademicYear(payload);
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

    const onSubmit: SubmitHandler<AcademicSchemaType> = (data) => {
        setIsSubmitting(true);
        console.log(data)
        mutation.mutate(data);
    }

    const submit = handleSubmit(onSubmit);


    return (
        <Form title="Create Academic Year" buttonText="Save" buttonLoadingText="Saving ..." onSubmit={submit} isSubmitting={isSubmitting}>
            <div className="sm:col-span-6">

                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholderText="Start Date"
                    showIcon
                    toggleCalendarOnIconClick
                    disabledKeyboardNavigation
                    isClearable
                />


                <div className="mt-2">
                    <Input type="text" label="Start Date"
                        autoFocus
                        placeholder="Enter academic year ..."
                        error={errors.academic_year && errors.academic_year.message}
                        {...register("academic_year")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="text" label="Start Date"
                        autoFocus
                        placeholder="Enter start date..."
                        error={errors.start_date && errors.start_date.message}
                        {...register("start_date")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="text" label="Final Closure Date"
                        autoFocus
                        placeholder="Enter final closure date..."
                        error={errors.final_closure_date && errors.final_closure_date.message}
                        {...register("final_closure_date")}
                        className="bg-gray-100"
                    />
                </div>

                <div className="mt-2">
                    <Input type="text" label="Closure Date"
                        autoFocus
                        placeholder="Enter closure date..."
                        error={errors.closure_date && errors.closure_date.message}
                        {...register("closure_date")}
                        className="bg-gray-100"
                    />
                </div>
            </div>
        </Form>
    )

}

export default page;