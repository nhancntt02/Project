import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import ChartDashBoard from "../components/ChartDashBoard"
import { FaMoneyBill, FaUserTie, FaUsers, FaShoppingCart, FaReceipt } from 'react-icons/fa';
export default function Dashbord() {
    const [orders, setOrders] = useState([]);
    const [income, setIncome] = useState(0);
    const [sldh, setSldh] = useState(0);
    const [slsp, setSlsp] = useState(0);
    const [cus, setCus] = useState(0);
    const [emp, setEmp] = useState(0);

    useEffect(() => {
        getOrderComple();
        getSlsp();
        getUser();
    }, []);

    const getOrderComple = async () => {
        try {
            const res = await axiosClient.get('/ordercomple');
            setOrders(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getSlsp = async () => {
        try {
            const res = await axiosClient.get('/quantityproduct/sale');
            setSlsp(res.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        try {
            const res = await axiosClient.get('/quantityuser');
            setCus(res.data.customer);
            setEmp(res.data.employee);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (orders) {
            let temp = 0;
            let sl = 0;
            const currentYear = new Date().getFullYear(); // năm hiện tại
            orders.forEach(order => {
                const orderDate = new Date(order.order_date_comple);
                const orderYear = orderDate.getFullYear(); // năm trong order.order_date_comple
                if (orderYear === currentYear) {
                    temp += order.order_total_money;
                    sl++;
                }
            })
            setSldh(sl);
            setIncome(temp);
        }

    }, [orders]);

    return (
        <div className="container h-screen ">
            <div className="h-[16%] border-b flex items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-2xl px-10 font-bold ">
                    Dashboard
                </div>
                <div className="">
                </div>
            </div>
            <div className="px-20">
                <div className=" w-full grid grid-cols-5 gap-20 mt-5">
                    <div className=" border bg-blue-200 flex p-2 rounded-xl h-[100px]">
                        <div className="flex items-center text-2xl px-2 border-r text-blue-600">
                            <FaMoneyBill />
                        </div>
                        <div className="grow flex flex-col justify-center gap-5">
                            <div className="font-semibold text-blue-600 text-right">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(income)}
                            </div>
                            <div className="text-center text-white text-sm">
                                Doanh thu
                            </div>
                        </div>
                    </div>
                    <div className=" border bg-blue-200 flex p-2 rounded-xl h-[100px]">
                        <div className="flex items-center text-2xl px-2 border-r text-blue-600">
                            <FaShoppingCart />
                        </div>
                        <div className="grow flex flex-col justify-center gap-5">
                            <div className="font-semibold text-blue-600 text-center">
                                {slsp.total_quantity || '0'}
                            </div>
                            <div className="text-center text-white text-sm">
                                Sản phẩm
                            </div>
                        </div>
                    </div>
                    <div className=" border bg-blue-200 flex p-2 rounded-xl h-[100px]">
                        <div className="flex items-center text-2xl px-2 border-r text-blue-600">
                            <FaReceipt />
                        </div>
                        <div className="grow flex flex-col justify-center gap-5">
                            <div className="font-semibold text-blue-600 text-center">
                                {sldh}
                            </div>
                            <div className="text-center text-white text-sm">
                                Đơn hàng
                            </div>
                        </div>
                    </div>
                    <div className=" border bg-blue-200 flex p-2 rounded-xl h-[100px]">
                        <div className="flex items-center text-2xl px-2 border-r text-blue-600">
                            <FaUsers />
                        </div>
                        <div className="grow flex flex-col justify-center gap-5">
                            <div className="font-semibold text-blue-600 text-center">
                                {cus}
                            </div>
                            <div className="text-center text-white text-sm">
                                Khách hàng
                            </div>
                        </div>
                    </div>
                    <div className=" border bg-blue-200 flex p-2 rounded-xl h-[100px]">
                        <div className="flex items-center text-2xl px-2 border-r text-blue-600">
                            <FaUserTie />
                        </div>
                        <div className="grow flex flex-col justify-center gap-5">
                            <div className="font-semibold text-blue-600 text-center">
                                {emp}
                            </div>
                            <div className="text-center text-white text-sm">
                                Nhân viên
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full  mt-10 h-[470px]">
                    <div className="w-[70%]  bg-slate-200  mx-auto">
                        <ChartDashBoard />
                    </div>
                </div>
            </div>
        </div>
    )
}