"use client"

//eslint-disable react-hooks/rules-of-hooks
import React, { useState } from "react";
import { CalendarIcon, HomeIcon } from "lucide-react";
import Form from "@/components/forms/Form";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from 'react-hot-toast';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createAcademicYear } from "@/routes/api";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { AcademicSchema } from "@/schemas/AcademicSchema";


type AcademicSchemaType = z.infer<typeof AcademicSchema>;

const SettingPage = () => {

    const queryClient = new QueryClient()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<AcademicSchemaType>({ resolver: zodResolver(AcademicSchema) });

    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState<Date>()
    const [finalClosureDate, setFinalClosureDate] = useState<Date>()
    const [closureDate, setClosureDate] = useState<Date>()

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleInputClick = () => {
        console.log("CLick", showCalendar)
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

    const mutation = useMutation({
        mutationFn: (payload: any) => {
            return createAcademicYear(payload);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['settings'] })
            toast.success('Successfully created the new academic year!', { duration: 2000 })
            router.push('/academics')
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
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

    const onCancel = () => {
        router.back()
    }

    return (
        <Form title="Create Academic Year" buttonText="Save" buttonLoadingText="Saving ..." onSubmit={submit} isSubmitting={isSubmitting} onCancel={onCancel}>
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
                                    label="Final Final Closure Date"
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
                                    value={closureDate ? format(closureDate, 'yyyy-MM-dd') : ''}
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

                {/* <div className="mt-2">
                    <Input type="text" label="Closure Date"
                        autoFocus
                        placeholder="Enter closure date..."
                        error={errors.closure_date && errors.closure_date.message}
                        {...register("closure_date")}
                        className="bg-gray-100"
                    />
                </div> */}
            </div>
        </Form>
    )

}

export default SettingPage;