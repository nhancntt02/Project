import React, { useState, useEffect } from 'react';
import { FaMicrophone } from "react-icons/fa";
const VoiceSearch = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  useEffect(() => {
    // Cấu hình Recognition
    recognition.lang = 'vi-VN'; // Thiết lập ngôn ngữ (tiếng Việt)
    recognition.interimResults = false; // Chỉ lấy kết quả cuối cùng
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript); // Gọi hàm tìm kiếm
    };
    recognition.onend = () => setIsListening(false);
  }, [recognition, onSearch]);

  const handleStartListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const handleStopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return (
    <div className="">
      <button
        onClick={isListening ? handleStopListening : handleStartListening}
        className={`px-2 py-2 text-white rounded-full ${isListening ? 'bg-blue-500' : 'bg-blue-500'} hover:bg-opacity-90 transition-all`}
      >
        {isListening ? <FaMicrophone size={20} className='text-red-500' /> : <FaMicrophone size={20} />}
      </button>
    </div>

  );
};

export default VoiceSearch;
