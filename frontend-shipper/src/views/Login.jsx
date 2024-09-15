import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            shipper_phone: emailRef.current.value,
            shipper_password: passwordRef.current.value,
        };

        console.log(payload);
        setErrors(null);
        axiosClient.post('/login/shipper', payload)
            .then(({ data }) => {
                console.log(data.data);
                localStorage.setItem('shipperId', data.data.shipper_id);
                navigate('/home');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    }
                }
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-96 p-6 shadow-lg rounded-md bg-white">
                <form onSubmit={onSubmit}>
                    <h1 className="text-center font-bold text-xl mb-4">
                        Đăng nhập tài khoản giao hàng
                    </h1>
                    {errors && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        ref={emailRef}
                        type="phone"
                        placeholder="Số điện thoại "
                    />
                    <input
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        ref={passwordRef}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                    <button
                        className="w-full py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Not Registered? <Link to="/signup" className="text-green-500 hover:underline">Create an account</Link>
                </p>
            </div>
        </div>

    )
}