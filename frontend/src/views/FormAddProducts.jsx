import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axiosClient from "../axios-client";

export default function FormAddProducts() {
    const [form, setForm] = useState([]);
    const [forms, setForms] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const searchRef = useRef();

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
            setForm(res.data.data);
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

    const searchFormAdd = async () => {
        const data = searchRef.current.value;
        try {
            const res = await axiosClient.get(`/search/info/fap/${data}`);
            const arr = res.data.data;
            console.log(arr);
            const filteredFap = [];
            for (let i = 0; i < arr.length; i++) {
                const item = form.find(o => o.fap_id === arr[i].fap_id);
                if (item) {
                    filteredFap.push(item);
                }
            }
            // setVisibleContent(null);
            // filteredOrders.sort((a, b) => {
            //     const orderStatusOrder = [
            //         'Khởi tạo',
            //         'Đã xác nhận',
            //         'Chờ vận chuyển',
            //         'Đang vận chuyển',
            //         'Hoàn thành',
            //         'Hủy'
            //     ];
            //     return orderStatusOrder.indexOf(a.order_status) - orderStatusOrder.indexOf(b.order_status);
            // });
            setForms(filteredFap);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container ">

            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                isVisible &&
                    <div className="h-screen">
                        <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                            <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý nhập hàng</div>
                        </div>
                        <div className="p-4">
                            <div className="my-4 flex gap-5">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Nhập tên sản phẩm muốn tìm kiếm"
                                        className="p-2 border min-w-[280px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        ref={searchRef}
                                    />
                                    <button
                                        onClick={searchFormAdd}
                                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>
                                <button className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                                    <Link to="/fap/add" className="" >Thêm phiếu nhập</Link>
                                </button>
                            </div>
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
                                            Người tạo
                                        </th>
                                        <th className="border border-slate-300 px-2">
                                            Trạng thái
                                        </th>
                                        <th className="border border-slate-300 px-2">
                                            Tổng tiền nhập hàng
                                        </th>
                                        <th>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        forms.map((form, index) => (
                                            <tr key={form.fap_id} className="border border-slate-300">
                                                <td className="border text-center border-slate-300 px-2">{index + 1}</td>
                                                <td className="border text-center border-slate-300 px-2">{form.fap_date_create}</td>
                                                <td className="border text-center border-slate-300 px-2">{form.fap_date_confirm || 'Chưa xác nhận'}</td>
                                                <td className="border text-center border-slate-300 px-2">{users.find(user => user.id == form.employee_id)?.name}</td>
                                                <td className="border text-center border-slate-300 px-2">{form.fap_status == 0 ? 'Chưa xác nhận' : 'Đã xác nhận'}</td>
                                                <td className="border text-right border-slate-300 px-2">{
                                                 form.fap_total_amount != 0 ?  (new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(form.fap_total_amount)) : 'Chưa xác nhận' 
                                                }</td>
                                                <td className="border text-center border-slate-300 px-2">
                                                    <Link to={`/infoform/${form.fap_id}`} className="text-blue-400 hover:underline hover:text-blue-600">Chi tiết</Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }

            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}