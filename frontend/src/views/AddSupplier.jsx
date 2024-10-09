import { useRef, useState } from "react"
import axiosClient from "../axios-client";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";
export default function AddSupplier() {
    //const [loading, setLoading] = useState(false);
    //const [error, setError] = useState(null);
    const idRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    const onsubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            supplier_id: idRef.current.value,
            supplier_name: nameRef.current.value,
            supplier_email: emailRef.current.value,
            supplier_phone: phoneRef.current.value,
            supplier_address: addressRef.current.value
        }

        axiosClient.post('/add/supplier', payload)
            .then(({ data }) => {
                alert(data.message);

                idRef.current.value = "";
                nameRef.current.value = "";
                emailRef.current.value = "";
                phoneRef.current.value = "";
                addressRef.current.value = "";
            })
            .catch(err => {
                idRef.current.value = "";
                nameRef.current.value = "";
                emailRef.current.value = "";
                phoneRef.current.value = "";
                addressRef.current.value = "";
                handleError();
                console.error(err);
            })
    }

    const [addError, setAddError] = useState(null);

    const handleError = () => {
        setAddError(true);
        setTimeout(() => {
            setAddError(false);
        }, 3000); // Ẩn thông báo sau 3 giây
    };

    return (
        <div>
            {addError && <ErrorNotification />}
            <div className="w-[500px] mx-auto p-6 bg-white rounded-lg">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Thêm nhà cung cấp </h1>
                </div>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 font-medium mb-2">Mã nhà cung cấp<span className="text-red-700">*</span></label>
                    <input
                        type="text"
                        id="id"
                        ref={idRef}
                        placeholder="Nhập mã nhà cung cấp"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Tên nhà cung cấp<span className="text-red-700">*</span></label>
                    <input
                        type="text"
                        id="name"
                        ref={nameRef}
                        placeholder="Nhập tên nhà cung cấp"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email<span className="text-red-700">*</span></label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        placeholder="Nhập email liên hệ"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Số điện thoại<span className="text-red-700">*</span></label>
                    <input
                        type="text"
                        id="phone"
                        ref={phoneRef}
                        placeholder="Nhập số điện thoại liên hệ"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Địa chỉ<span className="text-red-700">*</span></label>
                    <input
                        id="address"
                        ref={addressRef}
                        placeholder="Nhập địa chỉ nhà cung cấp"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <button
                        onClick={onsubmit}
                        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Thêm
                    </button>
                </div>
            </div>

        </div>
    )
}