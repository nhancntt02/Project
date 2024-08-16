import { Link, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext()
    if (!token) {
        return (
            <Navigate to="/login" />
        )
    }

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
            .catch(error => {
                console.error('Logout error:', error);
                // Handle error if necessary
            });
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
    }, [])

    return (
        <div className="flex flex-row w-full" >

            <div className="w-[15%] flex flex-col border p-3 h-[737px] bg-gray-300">
                <div className="">
                    {user.name} <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                </div>
                <div className="border px-2 py-1 text-center text-gray-700 bg-blue-300 hover:text-white rounded hover:bg-blue-800 ring-1 mt-5">
                    <Link to="/" className="">Trang chủ</Link>
                </div>
                <div className="border px-2 py-1 text-center  text-gray-700 bg-blue-300 hover:text-white rounded hover:bg-blue-800 ring-1 mt-1">
                    <Link to="/add" className="">Thêm sản phẩm</Link>
                </div>
                <div className="border px-2 py-1 text-center text-gray-700 bg-blue-300 hover:text-white rounded hover:bg-blue-800 ring-1 mt-1">
                    <Link to="/addinfo" className="">Thêm thông tin</Link>
                </div>
                <div className="border px-2 py-1 text-center text-gray-700 bg-blue-300 hover:text-white rounded hover:bg-blue-800 ring-1 mt-1">
                    <Link to="/fap" className="">Thêm phiếu nhập</Link>
                </div>
            </div>
            <div className="w-full">
                <div className=" border w-[85%] mx-auto" >
                    <Outlet />
                </div>
            </div>


        </div>
    );
}