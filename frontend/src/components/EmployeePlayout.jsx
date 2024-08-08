import {Link, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
export default function EmloyeePlayout() {
    const {token} = useStateContext();
    if(token){
        return <Navigate to="/" />
    }
    return (
        <div className="container" >

            <div className="border " style={{width: '700px', margin: '0 auto'}}>
                <Outlet/>
            </div>
            
        </div>
    );
}