import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axiosClient from "../axios-client";
import { FaEdit, FaTrash, FaTimes, FaCheck, FaEye } from "react-icons/fa";
import { BiSortAlt2 } from 'react-icons/bi';

export default function FormAddProducts() {
    const [form, setForm] = useState([]);
    const [forms, setForms] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType] = useState(false);
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const searchRef = useRef();
    const employee_id = sessionStorage.getItem('employeeId');

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

    const sortList = () => {

        const sortedForms = [...forms];


        sortedForms.sort((a, b) => {
            if (sortType) {
                return a.fap_id - b.fap_id;
            } else {
                return b.fap_id - a.fap_id;
            }
        });

        setSortType(!sortType);
        setForms(sortedForms);
    };


    const AddForm = async () => {
        const now = new Date();
        const payload = {
            fap_content: '',
            fap_date_create: now.toISOString().substr(0, 10),
            //fap_date_confirm: null,
            fap_status: 0,
            fap_total_amount: 0,
            employee_id: employee_id,
        };

        try {
            const res = await axiosClient.post('/add/form', payload);
            if (res.status == 200) {
                getForm()
            }
        } catch (error) {
            console.log(error);
        }



    }

    return (
        <div className="container ">

            {
                loading ? (
                    <div></div>
                ) : (
                    isVisible &&
                    <div className="h-screen ">
                        <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                            <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý nhập hàng</div>
                        </div>
                        <div className="m-4">
                            <div className=" flex justify-between items-center px-2">
                                <div className="text-2xl font-bold">
                                    Danh sách tất cả phiếu nhập hàng
                                </div>
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
                                    <button onClick={AddForm} className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                                        Thêm phiếu nhập
                                    </button>
                                </div>

                            </div>
                            <div>
                                <table className="border-collapse border border-slate-400 w-full">
                                    <thead>
                                        <tr className="bg-yellow-300 text-gray-800">
                                            <th className="border border-slate-300 p-2">
                                                ID <BiSortAlt2 onClick={sortList} className="inline text-xl hover:cursor-pointer hover:text-white" />
                                            </th>
                                            <th className="border border-slate-300 p-2 text-left">
                                                Nhân viên tạo phiếu nhập
                                            </th>
                                            <th className="border border-slate-300 p-2">
                                                Ngày tạo
                                            </th>
                                            <th className="border border-slate-300 p-2">
                                                Ngày xác nhận
                                            </th>
                                            <th className="border border-slate-300 p-2">
                                                Trạng thái
                                            </th>
                                            <th className="border border-slate-300 p-2">
                                                Tổng tiền nhập hàng
                                            </th>
                                            <th>
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            forms.map((form, index) => (
                                                <tr key={index} className=" bg-gray-100 hover:bg-gray-300 ">
                                                    <td className="border text-center border-slate-300 p-2">{form.fap_id}</td>
                                                    <td className="border border-slate-300 p-2">{users.find(user => user.id == form.employee_id)?.name}</td>
                                                    <td className="border text-center border-slate-300 p-2">{form.fap_date_create}</td>
                                                    <td className="border text-center border-slate-300 p-2">{form.fap_date_confirm}</td>
                                                    {
                                                        form.fap_status == 0 ? (
                                                            <td className="border text-center border-slate-300 p-2 "><span className="bg-bgheader-300 text-white font-semibold px-1 rounded" >Chờ xác nhận</span></td>
                                                        ) : (
                                                            <td className="border text-center border-slate-300 p-2"><span className="bg-green-600 text-white font-semibold px-1 rounded">Đã xác nhận</span></td>
                                                        )
                                                    }

                                                    <td className="border text-right border-slate-300 p-2 text-red-500">{
                                                        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(form.fap_total_amount)
                                                    }</td>
                                                    <td className="border text-center border-slate-300 p-2">
                                                        <div className="flex gap-4 justify-center text-xl">
                                                            <Link to={`/infoform/${form.fap_id}`} className=""><FaEye className="text-gray-500 hover:text-gray-800" /></Link>
                                                            {
                                                                form.fap_status == 0 && (
                                                                    <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
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