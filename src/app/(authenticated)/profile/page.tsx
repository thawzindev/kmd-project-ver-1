"use client"

import { useFetchProfile } from "@/app/hooks/queries/useFetchProfile";
import { Profile } from "@/types/Profile";
import { Edit } from "lucide-react";
import Image from "next/image";


const Page = () => {

    const { data, isFetching, error, isLoading, isPlaceholderData } = useFetchProfile();
    const profile = data?.result as Profile[]
    const meta = data?.results?.meta

    console.log({profile})

    return (

        <div className="p-10">
            {profile && profile ? (
                <>
                    <div className="relative p-16 rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto">
                        <Edit className="absolute top-2 right-2 gray-400 z-10 my-14 mx-6" />
                        <div className="flex flex-col space-y-1.5 pb-0">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        className="aspect-square"
                                        alt="User"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYbWQRmPgmQIMT7oEJFZuFWoGPMhH59WUkyToaSfXsg&s"
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
        </div>

    )

}

export default Page;