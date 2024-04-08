"use client";

import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
import React, { useEffect } from "react";
import { usePathname } from 'next/navigation'

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname()

    // console.log(pathname)

    useEffect(() => {
        const path = pathname.split("/");

        if (path.length === 3 && path[2] === 'create') {
            document.title = `Create ${path[1].charAt(0).toUpperCase() + path[1].slice(1)}`
        } else {
            const current = path[path.length - 1];
            console.log('current', current);
            console.log(current.charAt(0).toUpperCase() + current.slice(1))

            document.title =
                pathname === "/"
                    ? "Dashboard"
                    : current.charAt(0).toUpperCase() + current.slice(1);
        }


    }, [pathname]);

    return (
        <>
            <Sidebar />
            <div className="md:pl-64 flex flex-col">
                <div className="sticky top-0 flex-shrink-0 flex h-16 bg-white z-20">
                    <Navbar />
                </div>
                <div className="content p-6">
                    {children}
                </div>
            </div>
        </>
    )
}

export default AuthenticatedLayout;