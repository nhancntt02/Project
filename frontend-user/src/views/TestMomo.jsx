import React, { useState } from 'react';
import axiosClient from '../axios-client';


export default function PaymentForm() {
  const [amount, setAmount] = useState(0);

  const handlePayment = async () => {
    try {
      const response = await axiosClient.post('/momo-payment', {
        amount: amount
      });

      if (response.data && response.data.payUrl) {
        window.location.href = response.data.payUrl; // Redirect to MoMo payment page
      }
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Thanh toán qua MoMo</h2>
      <input
        type="number"
        className="border p-2 mb-4 w-full"
        placeholder="Nhập số tiền"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handlePayment}
        className="px-6 py-2 bg-green-600 text-white rounded-lg"
      >
        Thanh toán
      </button>
    </div>
  );
};


