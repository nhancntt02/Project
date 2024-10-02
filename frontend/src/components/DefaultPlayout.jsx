import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useState } from "react";
export default function DefaultLayout() {
    const { user, token, setUser, setToken, permiss, setPermiss } = useStateContext()
    if (!token) {
        return (
            <Navigate to="/login" />
        )
    }

    const navigate = useNavigate();

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                localStorage.removeItem('employeeId');
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
        getPermiss();
    }, [])

    const getPermiss = async () => {
        const employee_id = localStorage.getItem('employeeId');
        const res = await axiosClient.get(`/infopermiss/${employee_id}`);
        setPermiss(res.data.data);
    }

    const infoEmployee = () => {
        navigate('/infomation');
    }

    return (
        <div className="flex flex-row w-full" >
            <div className="w-[15%] flex flex-col border px-3 h-screen bg-white">
                <div className="flex items-center justify-center h-[16%] border-b">
                    <span onClick={infoEmployee} className="text-gray-700 text-xl font-semibold hover:cursor-pointer">{user.name}</span>
                </div>
                <div className="flex flex-col h-[80%] justify-between">
                    <div className="flex flex-col">
                        <div className="border text-white text-center font-medium  p-4 rounded-lg bg-blue-300 hover:text-white  hover:bg-blue-800 ring-1 mt-5">
                            <Link to="/dashbord" className="">Tổng quát</Link>
                        </div>
                        <div className="border text-white text-center font-medium  p-4 rounded-lg bg-blue-300 hover:text-white  hover:bg-blue-800 ring-1 mt-1">
                            <Link to="/home" className="">Quản lý sản phẩm</Link>
                        </div>
                        {
                            (permiss.permiss_id == 'QMAX' || permiss.permiss_id == 'QNVNK') && (
                                <div className="border text-white text-center font-medium  p-4 rounded-lg bg-blue-300 hover:text-white  hover:bg-blue-800 ring-1 mt-1">
                                    <Link to="/fap" className="">Quản lý nhập hàng</Link>
                                </div>
                            )
                        }
                        {
                            (permiss.permiss_id == 'QMAX' || permiss.permiss_id == 'QNVTB') && (
                                <div className="border text-white text-center font-medium  p-4 rounded-lg bg-blue-300 hover:text-white  hover:bg-blue-800 ring-1 mt-1">
                                    <Link to="/notify" className="">Quản lý thông báo</Link>
                                </div>
                            )
                        }
                        {
                            (permiss.permiss_id == 'QMAX' || permiss.permiss_id == 'QNVBH') && (
                                <div className="border text-white text-center font-medium  p-4 rounded-lg bg-blue-300 hover:text-white  hover:bg-blue-800 ring-1 mt-1">
                                    <Link to="/order" className="">Quản lý đơn hàng</Link>
                                </div>
                            )
                        }
                        {
                            (permiss.permiss_id == 'QMAX' || permiss.permiss_id == 'QNVBH') && (
                                <div className="border text-white text-center font-medium  p-4 rounded-lg bg-blue-300 hover:text-white  hover:bg-blue-800 ring-1 mt-1">
                                    <Link to="/income" className="">Quản lý doanh thu</Link>
                                </div>
                            )
                        }
                        {
                            (permiss.permiss_id == 'QMAX' || permiss.permiss_id == 'QNVBL') && (
                                <div className="border text-white text-center font-medium  p-4 rounded-lg bg-blue-300 hover:text-white  hover:bg-blue-800 ring-1 mt-1">
                                    <Link to="/comment" className="">Quản lý bình luận</Link>
                                </div>
                            )
                        }

                        {
                            permiss.permiss_id == 'QMAX' && (
                                <div className="border text-white text-center font-medium  p-4 rounded-lg bg-blue-300 hover:text-white  hover:bg-blue-800 ring-1 mt-1">
                                    <Link to="/employee" className="">Quản lý nhân viên</Link>
                                </div>
                            )
                        }
                    </div>
                    <div className="">
                        <div
                            onClick={onLogout}
                            className="bg-red-500 text-white text-center font-medium  p-4 rounded-lg hover:bg-red-700 hover:shadow-md transition duration-300 cursor-pointer"
                        >
                            Đăng xuất
                        </div>
                    </div>

                </div>
            </div>


            <div className="w-full">
                <div className="" >
                    <Outlet />
                </div>
            </div>


        </div>
    );
}