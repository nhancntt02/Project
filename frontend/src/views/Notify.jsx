import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

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

    const showContent = (index) => {
        // Toggle the visibility of the clicked notification
        setVisibleContent(visibleContent === index ? null : index);
    };

    const removeVietnameseTones = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    const goAddNotify = () => {
        navigate('/addnotify');
    }

    const searchComment = () => {
        const searchValue = searchRef.current.value;
        if(searchValue == ""){
            setNotify(arr);
        } else {
            const filteredNotify = arr.filter(item => 
                removeVietnameseTones(item.notify_title.toLowerCase())
                .includes(removeVietnameseTones(searchValue.toLowerCase()))
            );
            setNotify(filteredNotify);
        }
    }

    return (
        <div className="container h-screen">
            <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý thông báo</div>
            </div>
            <div className=" p-4">
                <div className="flex gap-4 py-4">
                    <input
                        type="text"
                        placeholder="Nhập tên tiêu đề thông báo bạn muốn tiềm kiếm"
                        className="p-2 border min-w-[300px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ref={searchRef}
                    />
                    <button
                        onClick={searchComment}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                        Tìm kiếm
                    </button>
                    <button
                        onClick={goAddNotify}
                        className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"                >
                        Thêm thông báo
                    </button>
                </div>


                <div className="mt-5 p-4 h-[600px] overflow-auto">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">Danh sách thông báo đã gửi</h1>
                    </div>
                    <div className="flex justify-center">
                        <div className="space-y-1 w-[60%]">
                            {notify.map((item, index) => (
                                <div key={index} className="bg-white p-2 shadow-md">
                                    <div
                                        onClick={() => showContent(index)}
                                        className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md"
                                    >
                                        <div className="text-gray-600 font-semibold">{index + 1}</div>
                                        <div className="text-gray-800 font-medium">{item.notify_title}</div>
                                    </div>
                                    <div className={visibleContent === index ? "block mt-2 text-gray-700 border-t p-4" : "hidden"}>
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