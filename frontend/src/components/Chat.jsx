import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axiosClient from '../axios-client';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState(1);
    const [rooms, setRooms] = useState([]);
    const user_id = sessionStorage.getItem('employeeId');
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
            console.log(res.data);
            setRooms(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        const payload = {
            message: message,
            room_id: room
        }
        await axiosClient.post('/messages', payload);

        setMessage('');
    };


    return (
        <div>
            <div>
                <div className="grid grid-cols-6 h-[83vh]">
                    {/* Sidebar cho danh sách các phòng chat */}
                    <div className="col-span-1 bg-gray-800 text-white overflow-y-auto p-4">
                        <h2 className="text-xl font-semibold mb-4">Rooms</h2>
                        {rooms.map((room, index) => (
                            <div
                                key={index}
                                onClick={() => setRoom(room.room_id)}
                                className="p-2 cursor-pointer rounded-md hover:bg-gray-700 transition"
                            >
                                {room.room_name}
                            </div>
                        ))}
                    </div>

                    {/* Cửa sổ chat */}
                    <div className="col-span-5 flex flex-col bg-gray-100">
                        <div className="flex-1">
                            <div className="chat-window h-[70vh] px-8 overflow-auto">
                                {messages.length > 0 &&
                                    messages
                                        .filter((m) => m.room_id == room)
                                        .map((msg, index) => (
                                            msg.user_id == user_id ? (
                                                <div key={index} className="mb-2 flex gap-2 justify-end">
                                                    <span className="text-gray-600 ml-2">
                                                        {msg.message}
                                                    </span>
                                                    <strong className="text-gray-900">
                                                        {msg.user?.name}
                                                    </strong>
                                                </div>
                                            ) : (
                                                <div key={index} className="mb-2 flex gap-2 justify-start">
                                                    <strong className="text-gray-900">
                                                        {msg.user?.name}
                                                    </strong>
                                                    <span className="text-gray-600 ml-2">
                                                        {msg.message}
                                                    </span>
                                                </div>
                                            )
                                        ))}
                            </div>
                        </div>

                        {/* Form gửi tin nhắn */}
                        <form
                            onSubmit={sendMessage}
                            className="flex items-center p-4 border-t border-gray-300 bg-white"
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

export default Chat;
