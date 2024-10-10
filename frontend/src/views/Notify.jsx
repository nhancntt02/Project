import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaTrash } from "react-icons/fa";
import AddNotify from "./AddNotify";
export default function Notify() {
    const [notify, setNotify] = useState([]);
    const [arr, setArr] = useState([]);
    const [visibleContent, setVisibleContent] = useState(null);
    const navigate = useNavigate();
    const searchRef = useRef();


    useEffect(() => {
        getNotify();
    }, []);

    const getNotify = async () => {
        try {
            const res = await axiosClient.get('/notify');
            console.log(res.data.data);
            setNotify(res.data.data);
            setArr(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }


    const removeVietnameseTones = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    const searchNotify = () => {
        const searchValue = searchRef.current.value;
        if (searchValue == "") {
            setNotify(arr);
        } else {
            const filteredNotify = arr.filter(item =>
                removeVietnameseTones(item.notify_title.toLowerCase())
                    .includes(removeVietnameseTones(searchValue.toLowerCase()))
            );
            setNotify(filteredNotify);
        }
    }

    const deleteNotify = async (notify_code) => {
        console.log(notify_code);
        try {
            const res = await axiosClient.delete(`/deleteall/notify/${notify_code}`);
            if(res.status == 200){
                getNotify();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container h-screen bg-bgheader-400">
            <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý thông báo</div>
            </div>
            <div className=" p-4">
                <div className="flex justify-between p-4 bg-white items-center rounded-md mb-4">
                    <div className="">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">Danh sách thông báo đã gửi</h1>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder=""
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={searchRef}
                        />
                        <button
                            onClick={searchNotify}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Tìm kiếm
                        </button>
                        <button
                            onClick={() => { setVisibleContent(true); }}
                            className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"                >
                            Thêm thông báo
                        </button>
                    </div>
                </div>


                <div className="overflow-y-auto mt-2" >
                    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-yellow-400 text-white text-left font-semibold">
                                <th className="px-4 py-2 border border-gray-300">STT</th>
                                <th className="px-4 py-2 border border-gray-300">Mã thông báo</th>
                                <th className="px-4 py-2 border border-gray-300">Tiêu đề</th>
                                <th className="px-4 py-2 border border-gray-300">Nội dung</th>
                                <th className="px-4 py-2 border border-gray-300">Nhóm người nhận</th>
                                <th className="px-4 py-2 border border-gray-300 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                notify.map((item, index) => (
                                    <tr key={index} className="bg-white hover:bg-gray-100 transition-colors">
                                        <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                                        <td className="px-4 py-2 border border-gray-300 font-bold">{item.notify_code}</td>
                                        <td className="px-4 py-2 border border-gray-300">{item.notify_title}</td>
                                        <td className="px-4 py-2 border border-gray-300">{item.notify_content}</td>
                                        {

                                            item.notify_type === "NV" ? (
                                                <td className="px-4 py-2 border border-gray-300 "> <div className="bg-blue-600 text-white rounded font-bold text-center">Nhân viên</div></td>
                                            ) : (
                                                <td className="px-4 py-2 border border-gray-300 "><div className="bg-green-600 text-white rounded font-bold text-center">Khách hàng</div></td>
                                            )

                                        }
                                        <td className="px-4 py-2 border border-gray-300 text-center">
                                            <button
                                                onClick={() => deleteNotify(item.notify_code)}
                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            <div>
                {
                    visibleContent && (
                        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10">

                            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                                <div className="flex justify-end">
                                    <button onClick={() => { setVisibleContent(false); getNotify();}}>
                                        <FaTimes />
                                    </button>
                                </div>

                                <AddNotify />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}