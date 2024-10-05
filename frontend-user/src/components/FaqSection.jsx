import React, { useState } from "react";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "Làm thế nào để đặt hàng?", answer: "Bạn có thể đặt hàng trực tuyến qua website bằng cách thêm sản phẩm vào giỏ hàng và tiến hành thanh toán." },
    { question: "Có thể hủy đơn hàng trong vòng bao lâu?", answer: "Bạn có thể hủy đơn hàng nếu nó chưa được xác nhận." },
    { question: "Có thể đánh giá sản phẩm không?", answer: "Bạn có thể đánh giá sản phẩm nếu đơn hàng đã hoàn thành trong vòng 15 ngày kế tiếp." },
    { question: "Phương thức thanh toán nào được chấp nhận?", answer: "Chúng tôi chấp nhận thanh toán bằng VNPay, MoMo hoặc COD(Thanh toán khi nhận hàng)." }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Câu hỏi thường gặp</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h3
              className="text-xl font-medium text-blue-600 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
            </h3>
            {openIndex === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
