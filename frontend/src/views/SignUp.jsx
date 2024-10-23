
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
export default function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const phoneRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    // const handleRegister = async (e) => {
    //     e.preventDefault();
    
    //     const response = await fetch("http://localhost:8000/api/register", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: nameRef.current.value,
    //             email: emailRef.current.value,
    //             password: passwordRef.current.value,
    //             password_confirmation: passwordConfirmationRef.current.value,
    //             phone: phoneRef.current.value
    //         }),
    //     });
    
    //     if (response.ok) {
    //         alert("Registration successful! Please check your email for verification.");
    //     } else {
    //         const errors = await response.json();
    //         console.error(errors);
    //         // Xử lý hiển thị lỗi cho người dùng
    //     }
    // };

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            phone: phoneRef.current.value,

        }
        console.log(payload);
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {

                    setErrors(response.data.errors);

                }
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={onSubmit} className="space-y-4">
                    <h1 className="text-2xl font-bold text-center text-gray-900">
                        Đăng ký tài khoản
                    </h1>

                    {/* Hiển thị lỗi nếu có */}
                    {errors && (
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    {/* Input Họ và tên */}
                    <input
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        ref={nameRef}
                        placeholder="Họ và tên"
                    />

                    {/* Input Email */}
                    <input
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        ref={emailRef}
                        type="email"
                        placeholder="Địa chỉ email"
                    />

                    {/* Input Mật khẩu */}
                    <input
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        ref={passwordRef}
                        type="password"
                        placeholder="Mật khẩu"
                    />

                    {/* Input Nhập lại mật khẩu */}
                    <input
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                    />

                    {/* Input Số điện thoại */}
                    <input
                        className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        ref={phoneRef}
                        type="text"
                        placeholder="Số điện thoại"
                    />

                    {/* Button Đăng ký */}
                    <button className="w-full p-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                        Đăng ký
                    </button>

                    {/* Message Đã có tài khoản */}
                    <p className="text-center text-sm text-gray-600">
                        Đã có tài khoản?{' '}
                        <Link to="/" className="text-blue-500 hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </div>
        </div>

    )
}