import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    // Kiểm tra xem script đã được thêm chưa
    const scriptId = "kommunicate-script";
    if (!document.getElementById(scriptId)) {
      const kommunicateSettings = { 
        "appId": "ae4423c99bd623e5b595ea2887433d23", 
        "popupWidget": true, 
        "automaticChatOpenOnNavigation": true 
      };

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      script.id = scriptId; // Gán ID cho script để kiểm tra sau này

      // Thêm script vào head
      const head = document.getElementsByTagName("head")[0];
      head.appendChild(script);

      // Cấu hình Kommunicate
      window.kommunicate = window.kommunicate || {};
      window.kommunicate._globals = kommunicateSettings;

      // Hàm cleanup khi component unmount
      return () => {
        head.removeChild(script);
      };
    }
  }, []); // [] đảm bảo chỉ chạy một lần khi component mount

  return null; // Không render gì ra giao diện
};

export default ChatWidget;
