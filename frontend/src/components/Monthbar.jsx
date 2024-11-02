import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthBar = ({ dataApi }) => {
    const datas = new Array(12).fill(0);
    dataApi.forEach(element => {
        const m = new Date(element.order?.order_date_comple).getMonth();
        datas[m] += element.io_quantity * element.io_price;
    });
    
    
    // Dữ liệu cho biểu đồ
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng ', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu',
                data: datas,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Màu nền cột
                borderColor: 'rgba(75, 192, 192, 1)',       // Màu viền cột
                borderWidth: 1,
            },
        ],
    };

    // Cấu hình biểu đồ
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
              position: 'bottom', // Vị trí của chú thích
            },
            title: {
              display: true,
              text: 'Biểu đồ doanh thu theo tháng',
            },
          },
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default MonthBar;
