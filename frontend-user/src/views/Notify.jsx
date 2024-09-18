import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FaExclamation } from 'react-icons/fa';
import { FaTimes, FaLessThan } from 'react-icons/fa';
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Notify() {
    const [notifys, setNotifys] = useState([]);
    const user_id = localStorage.getItem('userId');
    const [visibleContent, setVisibleContent] = useState(null);
    const { setNotify } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        getNotify();
    }, [])

    const getNotify = async () => {
        try {
            const res = await axiosClient.get(`/notify/${user_id}`);
            setNotifys(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const showContent = (index) => {

        setVisibleContent(visibleContent === index ? null : index);
    };

    const updateStatus = async (notify_id) => {
        await axiosClient.put(`update/notify/${notify_id}`)
        getNotify();
        setNotify();
    }

    const deleteNotify = async (notify_id) => {
        await axiosClient.delete(`delete/notify/${notify_id}`)
        getNotify();
        setNotify();
    }

    return (
        <div className="h-[85vh]">
            <div>
                <div onClick={() => navigate(-1)} className="cursor-pointer text-2xl font-bold text-blue-400 flex gap-2 hover:text-blue-600">
                    <FaLessThan className="mt-1" />
                    <div>
                        Trở về
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="space-y-1 w-[60%] ">
                        {
                            notifys.length > 0 ?
                                (
                                    notifys.map((item, index) => (
                                        <div key={index} className="bg-white p-2 rounded-lg shadow-md relative">
                                            <div className="flex justify-between ">
                                                <div
                                                    onClick={() => {
                                                        showContent(index);
                                                        if (item.notify_status == 0) {
                                                            updateStatus(item.notify_id);
                                                        }

                                                    }}
                                                    className="flex cursor-pointer hover:bg-gray-50 p-2 rounded-md w-full"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-gray-600 font-semibold">{index + 1}</div>
                                                        <div className="text-gray-800 font-medium">{item.notify_title}</div>
                                                    </div>

                                                </div>
                                                <div onClick={() => deleteNotify(item.notify_id)} className="hover:cursor-pointer">
                                                    <div className="mt-3 mr-5">
                                                        <FaTimes className="text-red-500 text-xl" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={visibleContent === index ? "block mt-2 text-gray-700 border-t text-lg p-4" : "hidden"}>
                                                {item.notify_content}
                                            </div>
                                            {
                                                item.notify_status == 0 && (
                                                    <div className="absolute top-0 -right-3 bg-red-500 rounded-full p-1">
                                                        <FaExclamation className="text-white text-lg" />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-2xl text-blue-400 font-semibold">
                                        Không có thông báo nào
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}