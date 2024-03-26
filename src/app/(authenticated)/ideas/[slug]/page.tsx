"use client"

import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {

    const { slug } = useParams();


    return (
        <>
            <h1>Detail - {slug}</h1>
        </>
    )

}

export default Page;