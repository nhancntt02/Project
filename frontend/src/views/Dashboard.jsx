import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import ChartDashBoard from "../components/ChartDashBoard"
import { FaMoneyBill, FaUserTie, FaUsers, FaShoppingCart, FaChartPie, FaShoppingBag, FaArrowCircleRight } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import MyBarChart from "../components/MyBarChart"
export default function Dashbord() {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [dataprop, setDataProp] = useState([]);
    const [income, setIncome] = useState(0);
    const [sldh, setSldh] = useState(0);
    const [slsp, setSlsp] = useState(0);
    const [cus, setCus] = useState(0);
    const [emp, setEmp] = useState(0);
    const dayStart = useRef();
    const dayEnd = useRef();



    useEffect(() => {
        getOrderComple();
        getSlsp();
        getUser();
    }, []);

    const getOrderComple = async () => {
        try {
            const res = await axiosClient.get('/ordercomple');
            setOrders(res.data.data);
            setOrder(res.data.data);
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
            revenue2();
        }

    }, [orders]);

    const revenue = () => {
        const dS = new Date(dayStart.current.value);
        const dE = new Date(dayEnd.current.value);
        let totalRevenue = 0;

        // Kiểm tra ngày bắt đầu và ngày kết thúc
        if (dS > dE) {
            alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc');
            return; // Thoát khỏi hàm nếu có lỗi
        }

        // Tính sự khác biệt giữa hai ngày
        const diffInTime = dE - dS;
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        // Kiểm tra số ngày không vượt quá 30
        if (diffInDays > 30) {
            alert('Khoảng thời gian giữa ngày bắt đầu và ngày kết thúc không thể lớn hơn 30 ngày');
            return; // Thoát khỏi hàm nếu có lỗi
        }

        // Tạo mảng chứa doanh thu hàng ngày
        const dailyRevenue = [];
        for (let i = 0; i <= diffInDays; i++) {
            const currentDate = new Date(dS);
            currentDate.setDate(dS.getDate() + i); // Thay đổi ngày
            const currentRevenue = order.reduce((total, order) => {
                const orderDate = new Date(order.order_date_comple);
                return (orderDate.toDateString() === currentDate.toDateString()) ? total + order.order_total_money : total;
            }, 0);

            dailyRevenue.push({ date: currentDate.toISOString().split('T')[0], revenue: currentRevenue }); // Lưu ngày và doanh thu vào mảng
            totalRevenue += currentRevenue; // Cộng dồn doanh thu tổng
        }

        setDataProp(dailyRevenue);
    };

    const revenue2 = () => {
        const dS = new Date();
        const dE = new Date(); // Ngày hiện tại
        // Bước 2: Trừ đi 29 ngày
        dS.setDate(dE.getDate() - 15);
        let totalRevenue = 0;

        // Tạo mảng chứa doanh thu hàng ngày
        const dailyRevenue = [];
        for (let i = 0; i <= 15; i++) {
            const currentDate = new Date(dS);
            currentDate.setDate(dS.getDate() + i); // Thay đổi ngày
            const currentRevenue = order.reduce((total, order) => {
                const orderDate = new Date(order.order_date_comple);
                return (orderDate.toDateString() === currentDate.toDateString()) ? total + order.order_total_money : total;
            }, 0);

            dailyRevenue.push({ date: currentDate.toISOString().split('T')[0], revenue: currentRevenue }); // Lưu ngày và doanh thu vào mảng
            totalRevenue += currentRevenue; // Cộng dồn doanh thu tổng
        }
        console.log(dailyRevenue);
        setDataProp(dailyRevenue);
    };

    return (
        <div className="container h-screen bg-bgheader-400">
            <div className="h-[10%] border-b flex items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-2xl px-10 font-bold ">
                    Dashboard
                </div>
            </div>
            <div className="px-4">
                <div className=" w-full grid grid-cols-5 gap-2 mt-5">
                    <div className="bg-green-300  rounded-lg text-white flex flex-col justify-between">
                        <div className="flex justify-between py-4 px-2">
                            <div className="flex items-center text-6xl px-2 text-green-700">
                                <FaMoneyBill />
                            </div>
                            <div className="">
                                <div className="font-semibold text-right text-2xl">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(income)}
                                </div>
                                <div className="text-center text-sm mt-2">
                                    Tổng doanh thu
                                </div>
                            </div>
                        </div>
                        <div className="text-center bg-green-700  rounded-b-lg p-2 hover:text-black ">
                            <button >Xem chi tiết <FaArrowCircleRight className="inline" /> </button>
                        </div>
                    </div>

                    <div className="bg-blue-300  rounded-lg text-white flex flex-col justify-between">
                        <div className="flex justify-between py-4 pl-2 pr-8">
                            <div className="flex items-center text-6xl px-2  text-blue-700">
                                <FaShoppingCart />
                            </div>
                            <div className="">
                                <div className="font-semibold  text-right text-2xl">
                                    {slsp.total_quantity || '0'}
                                </div>
                                <div className="text-center text-sm mt-2">
                                    Sản phẩm
                                </div>
                            </div>
                        </div>
                        <div className="text-center bg-blue-700  rounded-b-lg p-2 hover:text-black ">
                            <button >Xem chi tiết <FaArrowCircleRight className="inline" /> </button>
                        </div>
                    </div>

                    <div className="bg-pink-300  rounded-lg text-white flex flex-col justify-between">
                        <div className="flex justify-between py-4 pl-2 pr-8">
                            <div className="flex items-center text-6xl px-2 text-pink-600">
                                <FaShoppingBag />
                            </div>
                            <div className="">
                                <div className="font-semibold text-2xl text-right">
                                    {sldh}
                                </div>
                                <div className="text-center text-sm mt-2">
                                    Đơn hàng
                                </div>
                            </div>
                        </div>
                        <div className="text-center bg-pink-600  rounded-b-lg p-2 hover:text-black ">
                            <button >Xem chi tiết <FaArrowCircleRight className="inline" /> </button>
                        </div>
                    </div>

                    <div className="bg-yellow-300  rounded-lg text-white flex flex-col justify-between">
                        <div className="flex justify-between py-4 pl-2 pr-8">
                            <div className="flex items-center text-6xl px-2 text-yellow-600">
                                <FaUsers />
                            </div>
                            <div className="">
                                <div className="font-semibold text-2xl text-right">
                                    {cus}
                                </div>
                                <div className="text-centermt-2 text-sm">
                                    Khách hàng
                                </div>
                            </div>
                        </div>
                        <div className="text-center bg-yellow-600  rounded-b-lg hover:text-black p-2">
                            <button >Xem chi tiết <FaArrowCircleRight className="inline" /> </button>
                        </div>
                    </div>

                    <div className="bg-red-300  rounded-lg text-white flex flex-col justify-between">
                        <div className="flex justify-between py-4 pl-2 pr-8">
                            <div className="flex items-center text-6xl px-2 text-red-600">
                                <FaUserTie />
                            </div>
                            <div className="">
                                <div className="font-semibold text-2xl text-right">
                                    {emp}
                                </div>
                                <div className="text-center text-sm">
                                    Nhân viên
                                </div>
                            </div>
                        </div>
                        <div className="text-center bg-red-600  rounded-b-lg p-2 hover:text-black">
                            <button >Xem chi tiết <FaArrowCircleRight className="inline" /> </button>
                        </div>
                    </div>
                </div>

                <div className=" w-full border mt-4 bg-white p-4">
                    <div className="flex items-center gap-2 text-lg ">
                        <FaChartPie /> <div>Thông kê doanh thu</div>
                    </div>
                    <div className="flex gap-4 items-center py-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="dateS" className="text-sm text-gray-600">
                                Ngày bắt đầu:
                            </label>
                            <input type="date" id="dateS" ref={dayStart} 
                            className="border border-gray-300 rounded p-2 text-gray-600 focus:outline-none focus:border-blue-400"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="dateE" className="text-sm text-gray-600">
                                Ngày kết thúc:
                            </label>
                            <input
                                type="date"
                                id="dateE"
                                ref={dayEnd}
                                className="border border-gray-300 rounded p-2 text-gray-600 focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex gap-2 items-center"
                            onClick={() => {
                                revenue();
                            }
                            }
                        >
                            <FaSearch /> <span>Tìm kiếm</span>
                        </button>
                    </div>

                    <div className="w-full bg-slate-200 mx-auto">
                        <MyBarChart dataFromApi={dataprop} />
                    </div>

                </div>
            </div>
        </div>
    )
}