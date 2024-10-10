import React from 'react';

const ErrorNotification = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-center z-50">
      <p>Thêm thất bại!</p>
    </div>
  );
};

export default ErrorNotification;
