
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
        <div className="flex justify-center items-center">
            <div className="w-96">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Signup for free
                    </h1>
                    {
                        errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input className="ct-input" ref={nameRef} placeholder="Full Name" />
                    <input className="ct-input" ref={emailRef} type="email" placeholder="Email Address" />
                    <input className="ct-input" ref={passwordRef} type="password" placeholder="Password" />
                    <input className="ct-input" ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                    <input className="ct-input" ref={phoneRef} type="text" placeholder="Enter nunmer phone"/>
                    <input className="ct-input" ref={addressRef} type="text" placeholder="Enter address"/>
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Alrealdy Registered? <Link to="/">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}