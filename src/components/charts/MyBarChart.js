import React from "react";
import { Bar } from "react-chartjs-2";

const MyBarChart = (chartData) => {

    const data = chartData.chartData.data

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{chartData.chartData.label}</h2>
            <Bar
                data={data}
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
export default MyBarChart;