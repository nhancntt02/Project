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
                localStorage.setItem('userId', data.user.id);
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
                        Đăng nhập tài khoản
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
                        type="email"
                        placeholder="Địa chỉ email"
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
                        Đăng nhập
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Chưa đăng ký? <Link to="/signup" className="text-green-500 hover:underline">Đăng ký tài khoản</Link>
                </p>
            </div>
        </div>

    )
}