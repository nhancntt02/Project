import { useRef, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import SuccessNotification from '../components/SuccessNotification';
import ErrorNotification from "../components/ErrorNotification";

export default function AddNotify() {

    const codeRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const groupRef = useRef();
    const [showNotification, setShowNotification] = useState(false);
    const [addError, setAddError] = useState(null);
    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            notify_code: codeRef.current.value,
            notify_title: titleRef.current.value,
            notify_content: contentRef.current.value,
            notify_type: groupRef.current.value,
            notify_status: 0
        }
        console.log(payload);
        if (payload.notify_type == 'KH') {
            try {
                const res = await axiosClient.post('/add/notify/KH', payload);
                if (res.status == 200) {
                    handleSuccess();
                    codeRef.current.value = '';
                    titleRef.current.value = '';
                    contentRef.current.value = '';
                }
            } catch (error) {
                handleError();
                console.log(error);
            }
        } else {
            try {
                const res = await axiosClient.post('/add/notify/NV', payload);
                if (res.status == 200) {
                    handleSuccess();
                    codeRef.current.value = '';
                    titleRef.current.value = '';
                    contentRef.current.value = '';
                }
            } catch (error) {
                handleError();
                console.log(error);
            }
        }

    }

    const handleSuccess = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Ẩn thông báo sau 3 giây
    };


    const handleError = () => {
        setAddError(true);
        setTimeout(() => {
            setAddError(false);
        }, 3000); // Ẩn thông báo sau 3 giây
    };

    return (
        <div className="container w-[500px]">
            {addError && <ErrorNotification />}
            <div>
                <div className="p-6  max-w-md  mx-auto">
                    <div className="text-2xl font-bold mb-4 text-center text-gray-800">
                        Thêm thông báo mới
                    </div>
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">Mã thông báo<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="code"
                            ref={codeRef}
                            placeholder="Hãy nhập mã thông báo"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề thông báo<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="title"
                            ref={titleRef}
                            placeholder="Hãy nhập tiêu đề thông báo"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Nội dung thông báo<span className="text-red-500">*</span></label>
                        <textarea
                            id="content"
                            rows="5"
                            ref={contentRef}
                            placeholder="Hãy nhập nội dung thông báo"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Nhóm người nhận<span className="text-red-500">*</span></label>
                        <select className="ct-select-1" id="" ref={groupRef}>
                            <option value="KH">Khách hàng</option>
                            <option value="NV">Nhân viên</option>
                        </select>
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