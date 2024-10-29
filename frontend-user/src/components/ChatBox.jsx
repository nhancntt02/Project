import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import axiosClient from '../axios-client';
import { FaPlus, FaRegUser, FaSearch, FaTimes } from 'react-icons/fa';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState();
    const user_id = localStorage.getItem('userId');
    const  endOfMessagesRef = useRef();
    useEffect(() => {
        getRooms();
        // Lấy tin nhắn hiện tại từ API
        axiosClient.get('/messages').then(response => {
            setMessages(response.data);

        });

        // Thiết lập Pusher
        const pusher = new Pusher('7cc8350ff20e4890424d', {
            cluster: 'ap1',
        });


        const channel = pusher.subscribe('Chat');
        channel.bind('App\\Events\\MessageSent', function (data) {
            setMessages(prevMessages => [...prevMessages, data.message]);
        });
        return () => {
            channel.unsubscribe('Chat');
        };
    }, []);


    const getRooms = async () => {

        try {
            const res = await axiosClient.get(`/room/${user_id}`)
            setRoom(res.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        const payload = {
            message: message,
            room_id: room[0].room_id
        }
        console.log(payload);
        await axiosClient.post('/messages', payload);

        setMessage('');
    };

    const formatTime = (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };



    useEffect(() => {
        // Mỗi khi danh sách messages thay đổi, cuộn xuống cuối
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            <div>
                <div className=" h-screen">
                    <div className=" flex flex-col bg-gray-100">
                        <div className="flex-1">
                            <div className='flex justify-between items-center bg-white border'>
                                <div className=" px-4 py-2">
                                    <h2 className=" text-black text-lg font-semibold ">Admin</h2>
                                </div>
                            </div>
                            <div className="px-2 h-[300px] w-[320px] overflow-auto pt-2">
                                {messages.length > 0 &&
                                    messages
                                        .filter((m) => m.room_id == room[0].room_id)
                                        .map((msg, index) => (
                                            msg.user_id == user_id ? (
                                                <div ref={endOfMessagesRef} key={index} className="mb-2 flex justify-end">
                                                    <div className='bg-white p-2 border rounded-md max-w-[230px]'>
                                                        <div className="text-gray-900 mb-1 ">
                                                            {msg.message}
                                                        </div>
                                                        <div className='text-gray-600 text-xs'>
                                                            {formatTime(msg.created_at)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div ref={endOfMessagesRef} key={index} className="mb-2 flex gap-2 justify-start">
                                                    <div className="bg-white p-2 border rounded-md max-w-[230px]">
                                                        <div className="text-gray-900 mb-1 ">
                                                            {msg.message}
                                                        </div>
                                                        <div className='text-gray-600 text-xs'>
                                                            {formatTime(msg.created_at)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))}
                            </div>
                        </div>

                        {/* Form gửi tin nhắn */}
                        <form
                            onSubmit={sendMessage}
                            className="flex items-center p-2 border-t border-gray-300 bg-white"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="..."
                                className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>
            </div>
           
        </div>

    );
}

export default ChatBox;
