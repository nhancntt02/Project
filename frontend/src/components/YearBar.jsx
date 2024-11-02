import React from 'react';
import { Bar } from 'react-chartjs-2';

const YearBar = ({ dataApi }) => {
    const label = new Array(5).fill(0);

    const crurenYear = new Date().getFullYear();
    for (let index = 0; index < 5; index++) {
        label[index] = crurenYear -2 + index;
        
    }

    const datas = new Array(5).fill(0);
    dataApi.forEach(element => {
        const y = new Date(element.order?.order_date_comple).getFullYear();
        label.forEach((item, index) => {
            if (item === y) {
                datas[index] += element.io_quantity * element.io_price;
            }
        })
    });
    
    
    // Dữ liệu cho biểu đồ
    const data = {
        labels: label,
        datasets: [
            {
                label: 'Doanh thu',
                data: datas,
                backgroundColor: 'rgb(250, 180, 180, 1)', // Màu nền cột
                borderColor: 'rgb(252, 50, 50)',       // Màu viền cột
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
              text: 'Biểu đồ doanh thu theo năm',
              font: {
                size: 24
              }
            },
          },
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default YearBar;
