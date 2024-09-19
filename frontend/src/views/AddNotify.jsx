import { useRef, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import SuccessNotification from '../components/SuccessNotification';
export default function AddNotify() {
    const navigate = useNavigate();

    const titleRef = useRef();
    const contentRef = useRef();
    const [showNotification, setShowNotification] = useState(false);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            notify_title: titleRef.current.value,
            notify_content: contentRef.current.value,
            notify_status: 0
        }
        try {
            const res = await axiosClient.post('/add/notify', payload);
            if (res.status == 200) {
                handleSuccess();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const goBackPage = () => {
        navigate(-1);
    }

    

    const handleSuccess = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Ẩn thông báo sau 3 giây
    };

    return (
        <div className="container">
            <div>
                <div onClick={goBackPage} className="flex gap-2 hover:cursor-pointer">
                    <div className="text-2xl mt-1">
                        <FaArrowLeft />
                    </div>
                    <div className="text-xl">
                        Trở về
                    </div>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mt-10 mx-auto">
                    <div className="text-xl font-bold mb-4 text-gray-800">
                        Thêm thông báo mới
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề thông báo</label>
                        <input
                            type="text"
                            id="title"
                            ref={titleRef}
                            placeholder="Hãy nhập tiêu đề thông báo"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Nội dung thông báo</label>
                        <textarea
                            id="content"
                            rows="5"
                            ref={contentRef}
                            placeholder="Hãy nhập nội dung thông báo"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <button
                            onClick={onSubmit}
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        >
                            Thêm
                        </button>
                    </div>
                </div>
                {showNotification && <SuccessNotification />}
            </div>
        </div>
    )
}