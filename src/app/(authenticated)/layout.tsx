"use client";

import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
import React from "react";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
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