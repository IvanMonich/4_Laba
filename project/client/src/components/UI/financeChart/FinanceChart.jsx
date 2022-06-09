import React, {useState} from 'react';
import {Pie} from "react-chartjs-2";
import {ArcElement, Chart} from 'chart.js'

Chart.register(ArcElement);

const FinanceChart = props => {
    const { data, typeOfChart } = props

    const pieChartDataPlus = {
        labels: ["Одежда", "Поездки", "Еда", "Стипендия"],
        datasets: [{
            data: [data.plus.clothes, data.plus.trips, data.plus.food, data.plus.scholarship],
            label: "Categories rate",
            backgroundColor: ["#2FDE00", "#00A6B4", "#ff6600", "#ff6600"],
            hoverBackgroundColor: ["#175000", "#003350", "#993d00", "#993d00"]
        }]
    };

    const pieChartDataMinus = {
        labels: ["Одежда", "Поездки", "Еда", "Стипендия"],
        datasets: [{
            data: [data.minus.clothes, data.minus.trips, data.minus.food, data.minus.scholarship],
            label: "Categories rate",
            backgroundColor: ["#2FDE00", "#00A6B4", "#ff6600", "#ff6600"],
            hoverBackgroundColor: ["#175000", "#003350", "#993d00", "#993d00"]
        }]
    };

    return (
        <Pie
            type="pie"
            width={130}
            height={50}
            options={{
                title: {
                    display: true,
                    text: "COVID-19 Cases of Last 3 Months",
                    fontSize: 15
                },
                legend: {
                    display: true, //Is the legend shown?
                    position: "top" //Position of the legend.
                }
            }}
            data={typeOfChart ? pieChartDataPlus : pieChartDataMinus}
        />
    );

};

export default FinanceChart;