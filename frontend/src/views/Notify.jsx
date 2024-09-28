import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

export default function Notify() {
    const [notify, setNotify] = useState([]);
    const [visibleContent, setVisibleContent] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        getNotify();
    }, []);

    const getNotify = async () => {
        try {
            const res = await axiosClient.get('/notify');
            setNotify(res.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const showContent = (index) => {
        // Toggle the visibility of the clicked notification
        setVisibleContent(visibleContent === index ? null : index);
    };

    const goAddNotify = () => {
        navigate('/addnotify');
    }

    return (
        <div className="container h-screen">
            <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý thông báo</div>
            </div>
            <div className="mt-4">
                <button
                    onClick={goAddNotify}
                    className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"                >
                    Thêm thông báo
                </button>

                <div className="mt-5 p-4 h-[600px] overflow-auto">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">Danh sách thông báo đã gửi</h1>
                    </div>
                    <div className="flex justify-center">
                        <div className="space-y-1 w-[60%]">
                            {notify.map((item, index) => (
                                <div key={index} className="bg-white p-2 rounded-lg shadow-md">
                                    <div
                                        onClick={() => showContent(index)}
                                        className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md"
                                    >
                                        <div className="text-gray-600 font-semibold">{index + 1}</div>
                                        <div className="text-gray-800 font-medium">{item.notify_title}</div>
                                    </div>
                                    <div className={visibleContent === index ? "block mt-2 text-gray-700 border-t" : "hidden"}>
                                        {item.notify_content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}