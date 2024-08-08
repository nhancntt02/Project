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
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    if(response.data.errors) {
                        setErrors(response.data.errors);
                    }
                }
            })
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-96 p-6 shadow-lg rounded-md">
                <form onSubmit={onSubmit}>
                    <h1 className="text-center font-bold text-xl ">
                        Login into your account
                    </h1>
                    {
                        errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input className="ct-input" ref={emailRef} type="email" placeholder="Email" />
                    <input  className="ct-input" ref={passwordRef} type="password" placeholder="Password" />
                    <button className="mt-2 bg-green-400">Login</button>
                    
                </form>
                <p className="message">
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
            </div>
        </div>
    )
}