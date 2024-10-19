import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
export default function DefaultLayout() {
    const { user, token, setUser, setToken, permiss, setPermiss } = useStateContext()

    const employee_id = sessionStorage.getItem('employeeId');

    const [img, setImg] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token]);


    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                sessionStorage.removeItem('employeeId');
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
        getFile();
    }, [])

    const getPermiss = async () => {
        const employee_id = sessionStorage.getItem('employeeId');
        const res = await axiosClient.get(`/infopermiss/${employee_id}`);
        setPermiss(res.data.data);
    }

    const infoEmployee = () => {
        navigate('/infomation');
    }


    const getFile = async () => {

        const response = await axiosClient.get(`/file/user/${employee_id}`);
        if (response.data.file_name) {
            try {
                const image = await axiosClient.get(`/file/${response.data.file_name}`, {
                    responseType: 'blob',
                });
                setImg(URL.createObjectURL(image.data));
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const file_name = 'macdinh.jpg'
                const image = await axiosClient.get(`/file/${file_name}`, {
                    responseType: 'blob',
                });
                setImg(URL.createObjectURL(image.data));
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="flex flex-row w-full" >
            <div className="w-[20%] flex flex-col border h-screen bg-white">
                <div className="flex items-center justify-center h-[16%] border-b gap-4 ">
                    <img onClick={infoEmployee} src={img} alt="Avatar" className="rounded-full h-20 w-20 border object-cover hover:cursor-pointer" />
                    <span className="text-gray-700 text-xl font-semibold ">{user.name}</span>
                </div>
                <div className="flex flex-col h-[80%] justify-between">
                    <div className="flex flex-col">
                        <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400 ">
                            <Link to="/dashbord" className="">DashBoard</Link>
                        </div>
                        <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                            <Link to="/home" className="">Quản lý sản phẩm</Link>
                        </div>
                        {
                            (permiss?.permiss_id == 'QMAX' || permiss?.permiss_id == 'QNVNK') && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/fap" className="">Quản lý nhập hàng</Link>
                                </div>
                            )
                        }
                        {
                            (permiss?.permiss_id == 'QMAX' || permiss?.permiss_id == 'QNVTB') && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/notify" className="">Quản lý thông báo</Link>
                                </div>
                            )
                        }
                        {
                            permiss?.permiss_id == 'QMAX' && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/supplier" className="">Quản lý nhà sản xuất</Link>
                                </div>
                            )
                        }
                        {
                            permiss?.permiss_id == 'QMAX' && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/discount" className="">Quản lý khuyến mãi</Link>
                                </div>
                            )
                        }
                        {
                            (permiss?.permiss_id == 'QMAX' || permiss?.permiss_id == 'QNVBH') && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/order" className="">Quản lý đơn hàng</Link>
                                </div>
                            )
                        }
                        {
                            (permiss?.permiss_id == 'QMAX' || permiss?.permiss_id == 'QNVBH') && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/income" className="">Quản lý doanh thu</Link>
                                </div>
                            )
                        }
                        {
                            (permiss?.permiss_id == 'QMAX' || permiss?.permiss_id == 'QNVBL') && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/comment" className="">Quản lý đánh giá</Link>
                                </div>
                            )
                        }
{
                            permiss?.permiss_id == 'QMAX' && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/news" className="">Quản lý tin tức</Link>
                                </div>
                            )
                        }
                        {
                            permiss?.permiss_id == 'QMAX' && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/employee" className="">Quản lý nhân viên</Link>
                                </div>
                            )
                        }
                        {
                            permiss?.permiss_id == 'QMAX' && (
                                <div className="border text-gray-500 text-center font-medium  py-2 hover:text-gray-700  hover:bg-bgheader-400">
                                    <Link to="/customer" className="">Quản lý khách hàng</Link>
                                </div>
                            )
                        }
                    </div>
                    <div className="">
                        <div
                            onClick={onLogout}
                            className="bg-red-500 text-white text-center font-medium  py-2  hover:bg-red-700 hover:shadow-md transition duration-300 cursor-pointer"
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