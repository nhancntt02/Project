import React from 'react';
import { Bar } from 'react-chartjs-2';

const MyBarChart = ({ dataFromApi }) => {

  const arrayA = dataFromApi.filter(item => item.revenue > 0);

  // Bước 2: Lấy đại diện mỗi 3 ngày từ dataFromApi (mảng B)
  const arrayB = dataFromApi.filter((_, index) => index % 3 === 0);

  // Bước 3: Kết hợp mảng A và B
  const combinedArray = arrayB.reduce((acc, itemB) => {
    // Kiểm tra xem phần tử của A có trong B không
    const existsInA = arrayA.some(itemA => itemA.date === itemB.date);
    // Nếu không tồn tại trong A, thêm vào kết quả
    if (!existsInA) {
      acc.push(itemB);
    }
    return acc;
  }, [...arrayA]); // Khởi tạo bằng mảng A

  const sortedCombinedArray = combinedArray.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Lấy nhãn và doanh thu từ sortedCombinedArray
  const labels = sortedCombinedArray.map(item => item.date);
  const revenueData = sortedCombinedArray.map(item => item.revenue);

  const maxRevenue = Math.max(...revenueData);
  const yAxisMax = Math.ceil(maxRevenue / 10) * 10;
  // Dữ liệu mẫu cho biểu đồ
  const data = {
    labels: labels, // Nhãn của các cột
    datasets: [
      {
        label: 'Doanh thu', // Tên của dữ liệu
        data: revenueData, // Giá trị tương ứng với từng cột
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Màu nền của các cột
        borderColor: 'rgba(75, 192, 192, 1)', // Màu viền của các cột
        borderWidth: 1, // Độ dày của viền
      },
    ],
  };

  // Cấu hình tùy chọn cho biểu đồ
  const options = {
    responsive: true,// Biểu đồ sẽ thay đổi kích thước dựa trên kích thước container
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top', // Vị trí của chú thích
      },
      tooltip: {
        callbacks: {
          // Tùy chỉnh thông tin hiển thị tooltip nếu cần
          label: function (context) {
            const revenue = context.raw;
            return revenue === 0 ? 'Không có doanh thu' : `Doanh thu: ${revenue}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true, // Bắt đầu trục y từ 0
        min: 0, // Giá trị tối thiểu
        max: maxRevenue > 300000000 ? maxRevenue : 300000000, // Giá trị tối đa
        ticks: {
          stepSize: maxRevenue > 300000000 ? yAxisMax / 5 : 300000000 / 5, // Chia trục y thành 5 mục
        },
        title: {
          display: true,
        }
      },
      x: {
        title: {
          display: true,
        }
      }
    }
  };

  return (
    <div className='h-[400px]'>
      
        <Bar data={data} options={options} />
  
    </div>
  );
};

export default MyBarChart;
