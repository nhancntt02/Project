import React from 'react';
import { Bar } from 'react-chartjs-2';

const QuarterlyBar = ({ dataApi }) => {
    const datas = new Array(4).fill(0);
    dataApi.forEach(element => {
        const m = new Date(element.order?.order_date_comple).getMonth();
        if(m >=0 && m<=2 ){
            datas[0] += element.io_quantity * element.io_price;
        } else if(m >=3 && m<=5 ) {
            datas[1] += element.io_quantity * element.io_price;
        } else if(m >=6 && m<=8 ) {
            datas[2] += element.io_quantity * element.io_price;
        } else {
            datas[3] += element.io_quantity * element.io_price;
        }
        
    });
    
    
    // Dữ liệu cho biểu đồ
    const data = {
        labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
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
              text: 'Biểu đồ doanh thu theo quý',
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

export default QuarterlyBar;
