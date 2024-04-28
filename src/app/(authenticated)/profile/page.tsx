"use client"

import { useFetchProfile } from "@/app/hooks/queries/useFetchProfile";
import { ProfileUpdateSchema } from "@/schemas/ProfileUpdateSchema";
import { Profile } from "@/types/Profile";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfile } from "@/routes/api";

type ProfileSchemaType = z.infer<typeof ProfileUpdateSchema>;

const Page = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<ProfileSchemaType>({ resolver: zodResolver(ProfileUpdateSchema) });

    const { data, isFetching, error, isLoading, isPlaceholderData } = useFetchProfile();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const profile = data?.result as Profile
    // const meta = data?.results?.meta

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            console.log(payload)
            if (payload.password === "") {
                delete payload.password;
                delete payload.password_confirmation;
            }
            if (!payload.avatar) {
                delete payload.avatar;
            }
            return updateProfile(payload);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["profile"] })
            toast.success('Successfully updated the profile!', { duration: 2000 })
        },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 })
        },
        onSettled: () => {
            setIsSubmitting(false);
            setModalOpen(false);
        },
    })

    useEffect(() => {
        setValue('name', profile?.name as string)
    }, [modalOpen])


    console.log({ profile })

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const onSubmit: SubmitHandler<ProfileSchemaType> = (data) => {

        setIsSubmitting(true);

        if (data.password === '' && data.password_confirmation === '') {
            delete data.password;
            delete data.password_confirmation;
        }

        if (data.avatar) {
            const fileUpload = data.avatar[0];
            let file = fileUpload === undefined ? null : fileUpload;

            const formData = new FormData();

            if (file) {
                formData.append('avatar', file);
            }

            delete data.avatar;

            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const typedKey = key as keyof ProfileSchemaType;
                    formData.append(typedKey, data[typedKey]);
                }
            }

            const formDataObject: any = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });

            mutation.mutate(formData);

        } else {
            mutation.mutate(data);
        }

    }

    const submit = handleSubmit(onSubmit);

    return (

        <div className="p-10">
            {profile && profile ? (
                <>
                    <div className="relative p-8 rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto">
                        <Edit onClick={() => toggleModal()} className="cursor-pointer hover:bg-gray-200 absolute top-2 right-2 gray-400 z-10 my-14 mx-6" />
                        <div className="flex flex-col space-y-1.5 pb-0">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        className="aspect-square"
                                        alt="User"
                                        src={profile?.avatar}
                                        width={60}
                                        height={60} />
                                </div>
                                <div className="text-lg font-bold">{profile?.name}</div>
                                <div className="text-sm text-center">{profile?.email}</div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 items-center text-sm">
                                <div className="font-medium">Username</div>
                                <div className="text-right">{profile?.username}</div>
                                <div className="col-span-2 border-t border-gray-100 dark:border-gray-800"></div>
                            </div>
                            <div className="grid grid-cols-2 items-center text-sm">
                                <div className="font-medium">Email</div>
                                <div className="text-right">{profile?.email}</div>
                            </div>
                            <div className="grid grid-cols-2 items-center text-sm">
                                <div className="font-medium">Department</div>
                                <div className="text-right">{profile?.department?.name}</div>
                            </div>
                            <div className="grid grid-cols-2 items-center text-sm">
                                <div className="font-medium">Last login</div>
                                <div className="text-right">{profile?.lastLoggedInAt}</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {isFetching && (
                        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                            <div className="py-12 px-4 text-lg font-medium text-center text-gray-900">Loading...</div>
                        </div>
                    )}
                </>
            )}

            {modalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Report Reason
                                        </h3>
                                        <div className="mt-2">
                                            <Input type="text" label="Name"
                                                autoFocus
                                                placeholder="Enter the name ..."
                                                error={errors.name && errors.name.message}
                                                {...register("name")}
                                                className="bg-gray-100"
                                            />
                                        </div>

                                        <div className="mt-2">
                                            <Input type="file" label="Select Profile Image"
                                                placeholder="Select Profile Picture ..."
                                                error={errors.avatar && errors.avatar.message}
                                                {...register("avatar")}
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
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-blue-200" onClick={submit} disabled={isSubmitting}>
                                    Update
                                </button>
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => toggleModal()} disabled={isSubmitting}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )

}

export default Page;