import React from "react";
import { Doughnut } from "react-chartjs-2";

const MyDoughnutChart = (chartData) => {

    const data = chartData.chartData.data

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{chartData.chartData.label}</h2>
            <Doughnut
                data={data}
                width={60}
                height={30}
                options={{
                    plugins: {
                        // title: {
                        //     display: true,
                        //     text: chartData.chartData.label
                        // }
                    }
                }}
            />
        </div>
    );
}
export default MyDoughnutChart;