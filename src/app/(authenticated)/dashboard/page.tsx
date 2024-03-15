"use client"

import WelcomeModal from "@/components/modals/WelcomeModal";
import React from "react";

const page = () => {

    const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ", "&"))
    const user = JSON.parse(cookieObj.get("user") as string)
    const firstLogin = JSON.parse(cookieObj.get("firstLogin") as string)


    return (
        <div>
            {
                firstLogin && <WelcomeModal />
            }

            <h1>Dashboard {JSON.stringify(user)}</h1>
            <h1>First Login {JSON.stringify(firstLogin)}</h1>
        </div>
    )
}

export default page;