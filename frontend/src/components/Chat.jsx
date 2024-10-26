import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axiosClient from '../axios-client';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [rom, setRom] = useState(1);

    useEffect(() => {
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
            pusher.unsubscribe('Chat');
        };
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        const payload = {
            message: message,
            rom_id: rom
        }
        const res = await axiosClient.post('/messages', payload);
        
        setMessage('');
    };

    return (
        <div>
            <div className="chat-window">
                {messages.length > 0 &&
                    messages.filter(m => m.rom_id == rom).map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.user?.name}</strong>: {msg.message}
                        </div>
                    ))
                }
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
                
            </form>
            <button onClick={() => console.log(messages)}>Mang</button>
            <button onClick={() => setRom(2)}>Doi phong</button>
        </div>
    );
}

export default Chat;
