import {Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { FaHome } from "react-icons/fa";

export default function EmloyeePlayout() {
    const {token} = useStateContext();
    const navigate = useNavigate();
    if(token){
        return <Navigate to="/" />
    }

    const goHome = () => {
        navigate("/");
    }
    return (
        <div className="container mx-auto" >
            <FaHome onClick={goHome} className="text-4xl ml-[350px]"/>
            <div className="border " style={{width: '700px', margin: '0 auto'}}>
                <Outlet/>
            </div>
            
        </div>
    );
}