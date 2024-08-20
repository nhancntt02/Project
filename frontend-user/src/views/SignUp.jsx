
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
    const addressRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value

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
            <div className="w-96 p-6 shadow-lg rounded-md bg-white">
                <form onSubmit={onSubmit}>
                    <h1 className="text-center font-bold text-xl mb-6">
                        Signup for free
                    </h1>
                    {errors && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ref={nameRef}
                        placeholder="Full Name"
                    />
                    <input
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <input
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ref={phoneRef}
                        type="text"
                        placeholder="Enter phone number"
                    />
                    <input
                        className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ref={addressRef}
                        type="text"
                        placeholder="Enter address"
                    />
                    <button
                        className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Signup
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        Already Registered? <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>

    )
}