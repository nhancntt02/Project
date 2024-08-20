import { Link, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext()


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
        <div className="w-full" >

            <div className="flex justify-between">

                <div className="border mx-2 px-2 py-1 text-center text-gray-700 bg-blue-300 hover:text-white rounded hover:bg-blue-800 ring-1 mt-5">
                    <Link to="/" className="">Trang chủ</Link>
                </div>
                {
                    token ? (
                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-medium text-gray-700">{user.name}</p>
                            <a href="#" onClick={onLogout} className="btn-logout text-red-600 hover:text-red-800">
                                Logout
                            </a>
                        </div>
                    ) : (
                        <div className="flex space-x-4 mx-2 mt-5">
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Đăng nhập
                            </Link>
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Đăng ký
                            </Link>
                        </div>
                    )
                }



            </div>
            <div className="w-full">
                <div className=" border w-[85%] mx-auto" >
                    <Outlet />
                </div>
            </div>


        </div>
    );
}