import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axiosClient from "../axios-client";

export default function FormAddProducts() {
    const [forms, setForms] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check the URL every time it changes
        if (location.pathname === "/fap/add") {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        getForm();
        getUsers();
    }, []);

    const getForm = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/form');
            setForms(res.data.data);
            console.log(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setUsers(data.users);
                console.log(data.users)
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className="container">
            <div className="mt-4">
                <button className="px-2 py-1 bg-blue-500 text-white  rounded-lg shadow-md 
                    hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition 
                    duration-200 ease-in-out">
                    <Link to="/fap/add" className="" >Thêm phiếu nhập</Link>
                </button>
            </div>
            {
                loading ? (
                    <p>Loading...</p>
                ) : (isVisible &&
                    <div className="mt-5">
                        <table className="border-collapse border border-slate-400 w-full">
                            <thead>
                                <tr>
                                    <th className="border border-slate-300 px-2">
                                        STT
                                    </th>
                                    <th className="border border-slate-300 px-2">
                                        Ngày tạo
                                    </th>
                                    <th className="border border-slate-300 px-2">
                                        Ngày xác nhận
                                    </th>
                                    <th className="border border-slate-300 px-2">
                                        Nhân viên
                                    </th>
                                    <th className="border border-slate-300 px-2">
                                        Trạng thái
                                    </th>
                                    <th className="border border-slate-300 px-2">
                                        Tổng tiền
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    forms.map((form, index) => (
                                        <tr key={form.fap_id} className="border border-slate-300">
                                            <td className="border text-center border-slate-300 px-2">{index +1}</td>
                                            <td className="border text-center border-slate-300 px-2">{form.fap_date_create}</td>
                                            <td className="border text-center border-slate-300 px-2">{form.fap_date_confirm}</td>
                                            <td className="border text-center border-slate-300 px-2">{users.find(user => user.id == form.employee_id)?.name}</td>
                                            <td className="border text-center border-slate-300 px-2">{form.fap_status == 0 ? 'Chưa xác nhận' : 'Đã xác nhận'}</td>
                                            <td className="border text-right border-slate-300 px-2">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(form.fap_total_amount)}</td>
                                            <td className="border text-center border-slate-300 px-2">
                                                <Link to={`/infoform/${form.fap_id}`} className="text-blue-400 hover:underline hover:text-blue-600">Chi tiết</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>)
            }

            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}