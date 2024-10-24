import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title
} from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title
);

const getDaysInMonth = (month, year) => {
    // Sử dụng đối tượng Date để tính số ngày trong tháng
    return new Date(year, month, 0).getDate();
};

const getDaysArray = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const daysArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day + 1);
        daysArray.push(date.toISOString().substr(0, 10));
    }

    return daysArray;
};

const ChartDashBoard = ({ orders, month }) => {

    const currentYear = new Date().getFullYear();
    const daysArray = getDaysArray(month, currentYear);
    let arrayA = [];
    orders.map(order => {
        arrayA.push(order.order_date_confirm);
    })

    const arrayB = daysArray.filter((_, index) => index % 6 === 0);
    const combinedArray = arrayB.reduce((acc, itemB) => {
        // Kiểm tra xem phần tử của A có trong B không
        const existsInA = arrayA.some(itemA => itemA === itemB);
        // Nếu không tồn tại trong A, thêm vào kết quả
        if (!existsInA) {
            acc.push(itemB);
        }
        return acc;
    }, [...arrayA]);

    combinedArray.sort((a, b) => {
        return new Date(a) - new Date(b);
    });

    let datas = new Array(combinedArray.length).fill(0);

    orders.map(order => {
        const date = order.order_date_confirm;
        const index = combinedArray.indexOf(date); // Tìm chỉ số của date trong combinedArray
        if (index !== -1) { // Nếu tìm thấy chỉ số
            datas[index] = order.order_total_money; // Gán giá trị order.order_total_money cho datas[index]
        }
    })

    console.log(datas.length);
    const data = {
        labels: combinedArray,
        datasets: [
            {
                label: 'Doanh thu cửa hàng',
                data: datas,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Biểu đồ Doanh Thu ',
                font: {
                    size: 20
                }
            }
        }
    };

    return (
        <div className="w-full h-full">
            <Line data={data} options={options} />
        </div>
    );
}

export default ChartDashBoard;