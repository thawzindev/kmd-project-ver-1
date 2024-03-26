"use client"

import { useFetchStatistics } from "@/app/hooks/queries/useFetchStatistics";
import WelcomeModal from "@/components/modals/WelcomeModal";
import React from "react";
import MyBarChart from "../../../components/charts/MyBarChart"
import MyDoughnut from "../../../components/charts/MyDoughnutChart"
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

const Page = () => {

    Chart.register(CategoryScale);


    const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ", "&"))
    const user = JSON.parse(cookieObj.get("user") as string)
    const firstLogin = JSON.parse(cookieObj.get("firstLogin") as string)

    const { data, isLoading, error } = useFetchStatistics();

    // const barChartData = data?.charts

    console.log(data?.stats)

    return (
        <div>
            {
                firstLogin && <WelcomeModal />
            }

            <h1 className="text-xl mb-5">Welcome back 👋, {user.name}</h1>
            {/* <h1>First Login {JSON.stringify(firstLogin)}</h1>  */}


            <div className="grid grid-cols-4 gap-4 mb-5">
                {
                    data?.stats && (
                        Object.entries(data.stats).map(([key, stat]) => {
                            return (
                                <div key={key} className="bg-gray-200 p-5 rounded-lg shadow-sm">
                                    <h1 className="text-lg font-bold">{stat.label}</h1>
                                    <h1 className="text-3xl font-bold">{stat.value}</h1>
                                </div>
                            )
                        })
                    )
                }
            </div>

            <hr />

            <div className="grid grid-cols-2 gap-2 mt-5 h-1/3">
                {
                    data?.charts && (
                        data?.charts.map((chart) => {
                            if (chart.type === 'bar') {
                                return <MyBarChart key={chart.id} chartData={chart} />
                            } else {
                                return <MyDoughnut key={chart.id} chartData={chart} />
                            }
                        })
                    )
                }
            </div>


        </div>
    )
}

export default Page;