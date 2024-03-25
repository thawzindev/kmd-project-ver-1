"use client";

import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import EditCategoryModal from "../modals/EditCategoryModal";
import DeleteModal from "../modals/DeleteModal";
import EditDepartmentModal from "../modals/EditDepartmentModal";

const Providers = ({ children, ...props }: ThemeProviderProps) => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 6 * 10000
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <main className="min-h-screen bg-[#FFFFFF]">
                {/* <Sidebar />
                <div className="md:pl-64 flex flex-col">
                    <div className="sticky top-0 flex-shrink-0 flex h-16 bg-white">
                        <Navbar />
                    </div>
                    <div className="content p-6"> */}
                {children}
                {/* </div>
                </div> */}
                <Toaster />
                <EditCategoryModal />
                <EditDepartmentModal />
                <DeleteModal />
            </main>
        </QueryClientProvider >
    )
}

export default Providers;