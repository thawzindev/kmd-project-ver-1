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
import { createCategory, updateAcademic, updateCategory } from "@/routes/api";
import { z } from "zod";
import useAcademicEditModal from "@/app/hooks/customs/useAcademicEditModal";
import { AcademicSchema } from "@/schemas/AcademicSchema";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"

type AcademicSchemaType = z.infer<typeof AcademicSchema>;

const EditAcademicModal = () => {

    const queryClient = useQueryClient()
    const router = useRouter();
    const editModal: any = useAcademicEditModal();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState<Date>()
    const [finalClosureDate, setFinalClosureDate] = useState<Date>()
    const [closureDate, setClosureDate] = useState<Date>()

    const handleInputClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleCalendarSelect = (selectedDate: Date, field: string) => {
        if (field === "start_date") {
            setStartDate(selectedDate);
            setValue("start_date", format(selectedDate, 'yyyy-MM-dd'))
        } else if (field === "final_closure_date") {
            setFinalClosureDate(selectedDate);
            setValue("final_closure_date", format(selectedDate, 'yyyy-MM-dd'))
        } else if (field === "closure_date") {
            setClosureDate(selectedDate)
            setValue("closure_date", format(selectedDate, 'yyyy-MM-dd'))
        }
        setShowCalendar(false);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<AcademicSchemaType>({ resolver: zodResolver(AcademicSchema) });

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            return await updateAcademic(editModal.payload.id, payload);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['academics'] })
            toast.success('Successfully updated the academic!', { duration: 2000 })
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

        console.log(editModal.payload)
        setValue('name', editModal.payload.name as string)
        setValue('start_date', editModal.payload.startDate as string)
        setValue('closure_date', editModal.payload.closureDate as string)
        setValue('final_closure_date', editModal.payload.finalClosureDate as string)

        setStartDate(editModal.payload.startDate)
        setClosureDate(editModal.payload.closureDate)
        setFinalClosureDate(editModal.payload.finalClosureDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editModal.payload.id])


    const onToggle = useCallback(() => {
        editModal.onClose();
    }, [editModal])

    const onSubmit: SubmitHandler<AcademicSchemaType> = (data) => {
        setIsSubmitting(true);
        mutation.mutate(data);
    }

    const submit = handleSubmit(onSubmit);

    const bodyContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <Form title="Edit Academic" buttonText="Update" buttonLoadingText="Updating ..." onSubmit={submit} isSubmitting={isSubmitting} onCancel={onToggle}>
                    <div className="sm:col-span-6">
                        <div className="mt-2">
                            <Input type="text" label="Academic Year"
                                autoFocus
                                placeholder="Enter academic year ..."
                                error={errors.name && errors.name.message}
                                {...register("name")}
                                className="bg-gray-100"
                            />
                        </div>

                        <div className="mt-2 w-full">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            label="Start Date"
                                            readOnly
                                            placeholder="Select start date..."
                                            value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                                            onClick={handleInputClick}
                                            className="bg-gray-100"
                                            {...register("start_date")}
                                            error={errors.start_date && errors.start_date.message}
                                        />
                                        {/* <CalendarIcon className="absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5 text-gray-400 cursor-pointer" onClick={handleInputClick} /> */}
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent className="w-full" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onDayClick={(selectedDate) => handleCalendarSelect(selectedDate, "start_date")}
                                        initialFocus
                                    />
                                </PopoverContent>

                            </Popover>
                        </div>

                        <div className="mt-2 w-full">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            label="Final Closure Date"
                                            readOnly
                                            placeholder="Select final closure date..."
                                            value={finalClosureDate ? format(finalClosureDate, 'yyyy-MM-dd') : ''}
                                            onClick={handleInputClick}
                                            className="bg-gray-100 w-full px-4 py-2 pr-10 rounded-lg focus:outline-none"
                                            {...register("final_closure_date")}
                                            error={errors.final_closure_date && errors.final_closure_date.message}
                                        />
                                        {/* <CalendarIcon className="absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5 text-gray-400 cursor-pointer" onClick={handleInputClick} /> */}
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent className="w-full" align="start">
                                    <Calendar
                                        mode="single"
                                        onDayClick={(selectedDate) => handleCalendarSelect(selectedDate, "final_closure_date")}
                                        initialFocus
                                    />
                                </PopoverContent>

                            </Popover>
                        </div>


                        <div className="mt-2 w-full">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            label="Closure Date"
                                            readOnly
                                            placeholder="Select closure date..."
                                            // value={closureDate ? format(closureDate, 'yyyy-MM-dd') : ''}
                                            onClick={handleInputClick}
                                            className="bg-gray-100 w-full px-4 py-2 pr-10 rounded-lg focus:outline-none"
                                            {...register("closure_date")}
                                            error={errors.closure_date && errors.closure_date.message}
                                        />
                                        {/* <CalendarIcon className="absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5 text-gray-400 cursor-pointer" onClick={handleInputClick} /> */}
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent className="w-full" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={closureDate}
                                        onDayClick={(selectedDate) => handleCalendarSelect(selectedDate, "closure_date")}
                                        initialFocus
                                    />
                                </PopoverContent>

                            </Popover>
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
            title="Edit Academic"
            actionLabel=""
            onClose={editModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        // footer={footerContent}
        />
    );
}

export default EditAcademicModal;