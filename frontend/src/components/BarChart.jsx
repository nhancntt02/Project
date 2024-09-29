import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Dữ liệu mẫu cho biểu đồ
  const data = {
    labels: ['1 Sao', '2 Sao', '3 Sao', '4 Sao', '5 Sao'], // Nhãn của các cột
    datasets: [
      {
        label: 'Số lượng sao', // Tên của dữ liệu
        data: [0, 0, 2, 0, 3], // Giá trị tương ứng với từng cột
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Màu nền của các cột
        borderColor: 'rgba(75, 192, 192, 1)', // Màu viền của các cột
        borderWidth: 1, // Độ dày của viền
      },
    ],
  };

  // Cấu hình tùy chọn cho biểu đồ
  const options = {
    responsive: true, // Biểu đồ sẽ thay đổi kích thước dựa trên kích thước container
    plugins: {
      legend: {
        position: 'top', // Vị trí của chú thích
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê số sao đánh giá của cửa hàng', 
      },
    },
  };

  return (
    <div className="">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
