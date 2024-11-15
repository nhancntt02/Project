import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true, // hiển thị các chấm dưới slider
    infinite: true, // slider sẽ lặp vô hạn
    speed: 500,
    slidesToShow: 2, // số lượng hình hiển thị cùng lúc
    slidesToScroll: 1, // số lượng hình sẽ scroll khi bấm next/prev
    autoplay: true,
    autoplaySpeed: 2000, // 2 giây tự động chuyển ảnh
    arrows: true, // hiển thị nút next/prev
  };

  // Các ảnh mẫu cho slider
  const images = [
    "https://i.imgur.com/bNH1y0l.jpeg",
    "https://i.imgur.com/1Qt8LDC.jpeg",
    "https://i.imgur.com/pga6KXk.jpeg",
    "https://i.imgur.com/6kPNbev.jpeg",
    "https://i.imgur.com/ufkSH1A.jpeg",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-6 bg-blue-100 ">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
