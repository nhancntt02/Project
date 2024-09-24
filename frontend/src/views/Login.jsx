import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        console.log(payload);
        setErrors(null);
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
                localStorage.setItem('employeeId', data.user.id);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    
                    setErrors(response.data.message);
                    
                }
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white shadow-lg rounded-md">
                <form onSubmit={onSubmit} className="space-y-4">
                    <h1 className="text-center font-bold text-2xl text-gray-900">
                        Đăng nhập tài khoản
                    </h1>

                    {/* Hiển thị lỗi nếu có */}
                    {errors && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                            {errors}
                        </div>
                    )}

                    {/* Input Email */}
                    <input
                        className="w-full my-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                        ref={emailRef}
                        type="email"
                        placeholder="Nhập email"
                    />

                    {/* Input Mật khẩu */}
                    <input
                        className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                        ref={passwordRef}
                        type="password"
                        placeholder="Nhập mật khẩu"
                    />

                    {/* Button Đăng nhập */}
                    <button className="w-full p-3 mt-4 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                        Đăng nhập
                    </button>
                </form>

            </div>
        </div>

    )
}