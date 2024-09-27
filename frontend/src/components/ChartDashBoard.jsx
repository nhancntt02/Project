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


const ChartDashBoard = () => {
    const [orders, setOrders] = useState([]);
    const [datas, setData] = useState([]);
    useEffect(() => {
        getOrderComple();

    }, []);

    const getOrderComple = async () => {
        try {
            const res = await axiosClient.get('/ordercomple');
            setOrders(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (orders) {
            addData();
        }

    }, [orders]);

    const addData = () => {
        const monthlyData = new Array(12).fill(0);

        orders.forEach((order) => {
            const month = new Date(order.order_date_comple).getMonth();
            monthlyData[month] += order.order_total_money;
        });

        setData(monthlyData);
    }


    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Sales',
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
              text: 'Biểu đồ Doanh Thu năm 2024',  
              font: {
                size: 20            
              }
            }
          }
    };

    return (
        <div className="w-full h-full border border-black">
            <Line data={data} options={options} />
        </div>
    );
}

export default ChartDashBoard;