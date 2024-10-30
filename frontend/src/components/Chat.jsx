import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import axiosClient from '../axios-client';
import { FaPlus, FaRegUser, FaSearch, FaTimes, FaTrashAlt, FaDoorOpen } from 'react-icons/fa';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState(1);
    const [rooms, setRooms] = useState([]);
    const user_id = sessionStorage.getItem('employeeId');
    const [img, setImg] = useState([]);
    const [users, setUsers] = useState([]);
    const endOfMessagesRef = useRef(null);
    const [uniqueUserCount, setUniqueUserCount] = useState([]);
    const [visible, setVisible] = useState(false);
    const [detail, setDetail] = useState(false);
    const [addGroupCheck, setAddGroupCheck] = useState(false);
    const idRef = useRef();
    const nameRef = useRef();
    const aaRef = useRef();

    const [colSpan, setColSpan] = useState('col-span-5'); // State for column span

    const toggleColSpan = (i) => {
        if(i){
            setColSpan('col-span-5');
        } else {
            setColSpan('col-span-3');
        }
    };
    useEffect(() => {
        getRooms();
        //getUsers();
        getQuantityMember(1);
        getfullFile();
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


    const getUsers = async () => {
        try {
            const res = await axiosClient.get('/users');
            const rs = res.data.users;
            setUsers(rs.filter(i => i.id != 0));

        } catch (error) {
            console.log(error);
        }
    }

    const getRooms = async () => {

        try {
            const res = await axiosClient.get(`/room/${user_id}`)

            setRooms(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getfullFile = async () => {
        try {
            const res = await axiosClient.get('/full/file');
            const files = res.data.data;
            let arr = [];
            files.forEach(file => {
                arr.push({
                    user_id: file.user_id,
                    url: "http://localhost:8000/storage/avatars/" + file.file_name,
                })
            })

            setImg(arr);
        } catch (error) {
            console.log(error);
        }
    }

    //     const fetchImages = async () => {
    //         if (users && users.length > 0) {
    //             const employeeIds = users.map(e => e.id);

    //             try {
    //                 // Gọi API để lấy danh sách tên file tương ứng với employee_id
    //                 const response = await axiosClient.post('/files/employees', {
    //                     employee_ids: employeeIds
    //                 });

    //                 // Tạo mảng các promise để tải ảnh
    //                 const dataPromises = response.data.map(async (file) => {
    //                     const imageResponse = await axiosClient.get(`/file/${file.file_name}`, {
    //                         responseType: 'blob', // Tải ảnh dưới dạng blob
    //                     });
    //                     const imageUrl = URL.createObjectURL(imageResponse.data); // Tạo URL từ blob
    //                     return {
    //                         employee_id: file.employee_id,
    //                         imageUrl, // URL của ảnh được tạo từ blob
    //                     };
    //                 });

    //                 const imageData = await Promise.all(dataPromises); // Chờ tất cả các ảnh được tải về
    //                 setImg(imageData);
    //                 console.log(imageData) // Lưu URL ảnh vào state
    //             } catch (error) {
    //                 console.error('Error fetching images:', error);
    //             }
    //         }
    //     };

    //     fetchImages();
    // }, [users]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const payload = {
            message: message,
            room_id: room
        }
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

    const getQuantityMember = async (room_id) => {
        try {
            const res = await axiosClient.get(`/quantity/member/${room_id}`);
            console.log(res.data);
            setUniqueUserCount(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addMember = async () => {
        const payload = {
            room_id: room,
            user_id: idRef.current.value,
            room_name: rooms.find(i => i.room_id == room)?.room_name,
            room_key: 0
        };
        try {
            await axiosClient.post('/create/room', payload);
            getQuantityMember(room);
            setVisible(false);
        } catch (error) {
            console.log(error);
        }
    }

    const addGroup = async () => {
        const payload = {
            room_id: aaRef.current.value,
            user_id: user_id,
            room_name: nameRef.current.value,
            room_key: 1
        };

        try {
            const res = await axiosClient.post('/create/add/room', payload);
            if (res.status == 200) {
                const arr = [...rooms, res.data];
                setRooms(arr);
                setAddGroupCheck(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleClick = () => {
        setVisible(true);

        // Thiết lập timeout để ẩn sau 3 giây
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    //delete member 
    const deleteUser = async (user_id) => {
        try {
            const res = await axiosClient.delete(`/room/delete/member/${room}/${user_id}`);
            //console.log(res.data);
            getQuantityMember(room);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteGroup = async (room_id) => {
        try {
            const res = await axiosClient.delete(`/room/delete/${room_id}`);
            getRooms();
            setRoom(1);
            toggleColSpan(1); 
            setDetail(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <div className="grid grid-cols-7 h-screen">
                    {/* Sidebar cho danh sách các phòng chat */}
                    <div className="col-span-2  text-white overflow-y-auto ">
                        <div className='bg-gray-800 flex justify-between items-center'>
                            <h2 className="text-xl font-semibold  p-4">Phòng chat</h2>
                            <div className='flex gap-2 mr-2'>
                                <FaSearch size={20} className='hover:text-gray-500 hover:cursor-pointer' />
                                <FaPlus onClick={() => setAddGroupCheck(true)} size={20} className='hover:text-gray-500 hover:cursor-pointer' />
                            </div>
                        </div>

                        {rooms.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => { setRoom(item.room_id); getQuantityMember(item.room_id); toggleColSpan(1); setDetail(false)}}
                                className={`${(index + 1) === room ? "bg-blue-100" : ""} border-b hover:cursor-pointer hover:bg-gray-300 transition text-gray-500 px-4 py-6`}
                            >
                                {item.room_name}
                            </div>
                        ))}
                    </div>

                    {/* Cửa sổ chat */}
                    <div className={`${colSpan} flex flex-col border bg-gray-100 transition-col-span`}>
                        <div className="flex-1">
                            <div className='flex justify-between items-center bg-white border'>
                                <div className=" px-4 py-2">
                                    <h2 className=" text-black text-lg font-semibold h-[5vh]">Nhóm chat {rooms.find(i => i.room_id == room)?.room_name}</h2>
                                    <div className='flex gap-2 items-center'><FaRegUser /><div>{uniqueUserCount.length}</div></div>
                                </div>
                                {
                                    detail ? (
                                        <div className='flex gap-2 mr-4'>
                                            <div onClick={() => { setDetail(false); toggleColSpan(1); }} className='w-[40px] h-[40px] flex justify-center items-center hover:cursor-pointer hover:bg-gray-200 '>
                                                <div className=' h-[25px] w-[25px] rounded-md flex border border-gray-500  '>
                                                    <div className='w-2/3 h-full border-r border-gray-500' >

                                                    </div>
                                                    <div className='w-1/3 h-full bg-blue-300 rounded-r-md '>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                        (
                                            <div className='flex gap-4 mr-4'>
                                                <div onClick={() => { setDetail(true); toggleColSpan(0); }} className='w-[40px] h-[40px] flex justify-center items-center hover:cursor-pointer hover:bg-gray-200' >
                                                    <div className=' h-[25px] w-[25px] rounded-md flex border border-gray-500  '>
                                                        <div className='w-2/3 h-full border-r border-gray-500' >

                                                        </div>
                                                        <div className='w-1/3 h-full rounded-r-md '>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }

                            </div>
                            <div className="px-8 h-[79vh] overflow-auto pt-2">
                                {messages.length > 0 &&
                                    messages
                                        .filter((m) => m.room_id == room)
                                        .map((msg, index) => (
                                            msg.user_id == user_id ? (
                                                <div ref={endOfMessagesRef} key={index} className="mb-2 flex justify-end">
                                                    <div className='bg-white p-4 border rounded-md'>
                                                        <div className="text-gray-900 mb-1">
                                                            {msg.message}
                                                        </div>
                                                        <div className='text-gray-600 text-xs'>
                                                            {formatTime(msg.created_at)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div ref={endOfMessagesRef} key={index} className="mb-2 flex gap-2 justify-start">
                                                    <div className="">
                                                        <img src={img.find(i => i.user_id == msg.user_id)?.url || "http://localhost:8000/storage/avatars/macdinh.jpg"} alt="" className="h-10 w-10 border rounded-full object-cover" />
                                                    </div>
                                                    <div className="bg-white p-4 border rounded-md">
                                                        <div className="text-gray-600 text-xs mb-1">
                                                            {msg.user?.name}
                                                        </div>
                                                        <div className="text-gray-900 mb-1">
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
                    {
                        detail && (
                            <div className='col-span-2'>
                                <div className=" px-4 py-2 border-b ">
                                    <h2 className=" text-black text-xl text-center font-semibold h-[7vh] mt-2">Thông tin nhóm </h2>
                                </div>
                                <div className='grid grid-cols-2 border-b'>
                                    <div className='col-span-1'>
                                        {
                                            visible ? (
                                                <div className=' p-2 flex gap-2 items-center'>
                                                    <div className='text-nowrap'>ID:</div> <input type="text" ref={idRef} className='border w-[50px]' />
                                                    <button onClick={addMember} className=' bg-blue-500 px-2 py-1 rounded-md text-white font-semibold hover:bg-blue-700'>Thêm</button>

                                                </div>
                                            ) :
                                                (rooms.find(i => i.room_id == room)?.room_key == '1' && (
                                                    <div className='p-2'>
                                                        <div onClick={handleClick} className='flex gap-2 items-center  hover:text-gray-400 px-2 py-1 hover:cursor-pointer'>
                                                            <div>Thêm thành viên</div>
                                                            <FaPlus />
                                                        </div>

                                                    </div>
                                                ))
                                        }

                                    </div>
                                    <div onClick={() => deleteGroup(room)} className='flex gap-2 items-center justify-center border-l hover:text-gray-400 hover:cursor-pointer'>
                                        <div>
                                            Xóa nhóm
                                        </div>
                                        <FaTrashAlt />
                                    </div>

                                </div>
                                <div className=" bg-gray-50 rounded-lg ">
                                    <div className="text-xl font-semibold p-4">
                                        Danh sách thành viên
                                    </div>
                                    <div>
                                        {
                                            uniqueUserCount.map((item, index) => (
                                                <div key={index} className='flex items-center justify-between p-2 border px-4'>
                                                    <div className='flex gap-2 items-center'>
                                                        <div className="">
                                                            <img
                                                                src={img.find(i => i.user_id == item.user_id)?.url || "http://localhost:8000/storage/avatars/macdinh.jpg"}
                                                                alt=""
                                                                className="h-10 w-10 border rounded-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-lg font-bold">{item.user?.name}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FaTrashAlt onClick={() => deleteUser(item.user_id)} className='text-red-400 hover:text-red-700' />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        )


                    }

                </div>
            </div>
            {
                addGroupCheck &&
                <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10">

                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                        <div className="flex justify-end">
                            <button onClick={() => { setAddGroupCheck(false); }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className='w-[500px] '>
                            <h2 className="text-lg text-center font-bold mb-4">Tạo nhóm</h2>

                            <label htmlFor="groupId" className="block text-gray-700 font-semibold mb-2">ID nhóm</label>
                            <input
                                type="text"
                                ref={aaRef}
                                id="groupId"
                                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <label htmlFor="groupName" className="block text-gray-700 font-semibold mb-2">Nhập tên nhóm</label>
                            <input
                                type="text"
                                ref={nameRef}
                                id="groupName"
                                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                onClick={addGroup}
                                className="w-full py-2 mt-4 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200">
                                Xác nhận
                            </button>
                        </div>

                    </div>
                </div>
            }

        </div>

    );
}

export default Chat;
