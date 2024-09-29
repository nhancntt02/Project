import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useAsyncError, useNavigate, Outlet } from "react-router-dom";
import ChartDashBoard from "../components/ChartDashBoard"
export default function Income() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);
    const [orders, setOrders] = useState([]);
    const [income, setIncome] = useState(0);
    const [slsp, setSlsp] = useState(0);

    useEffect(() => {
        getOrderComple();

    }, []);

    const getOrderComple = async () => {
        try {
            const res = await axiosClient.get('/ordercomple');
            setOrders(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (orders) {
            let temp = 0;
            let sl = 0;
            const currentMonth = new Date().getMonth() + 1; // tháng hiện tại (0-11)
            const currentYear = new Date().getFullYear(); // năm hiện tại
            orders.forEach(order => {
                const orderDate = new Date(order.order_date_comple);
                const orderMonth = orderDate.getMonth() + 1; // tháng trong order.order_date_comple (0-11)
                const orderYear = orderDate.getFullYear(); // năm trong order.order_date_comple
                if (orderYear === currentYear && orderMonth === currentMonth) {
                    temp += order.order_total_money;
                    sl++;
                }
            })
            setSlsp(sl);
            setIncome(temp);
        }

    }, [orders]);



    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        // Check the URL every time it changes
        if (location.pathname != "/income") {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [location.pathname]);




    return (
        <div>
            {
                loading ? (
                    <div>Loading......</div>
                ) : (
                    <div className="container h-screen">
                        <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                            <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý doanh thu</div>
                        </div>
                        <div className="mb-6 p-4">
                            <div className="flex">

                            </div>
                            <div className="flex space-x-4 mb-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income');
                                    }
                                    }
                                >
                                    Biều đồ thống kế doanh thu
                                </button>

                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income/revenue');
                                    }
                                    }
                                >
                                    Thống kê doanh thu
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income/product/table');
                                    }
                                    }
                                >
                                    Thống kê nhập và bán hàng
                                </button>
                            </div>


                            <div>

                                <Outlet></Outlet>
                            </div>
                            {
                                visible && (
                                    <div className="h-[70vh] w-full flex">
                                        <div className="w-[70%]">
                                            <ChartDashBoard />
                                        </div>
                                        <div className="w-[30% px-4 grid gap-4  grid-rows-3">
                                            <div className="bg-red-100 flex flex-col justify-center gap-4 border border-black lg:w-[360px]">
                                                <div className="text-2xl text-center">
                                                    Doanh thu trong tháng
                                                </div>
                                                <div className="text-center text-3xl font-semibold  text-bgheader-300">
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(income)}
                                                </div>
                                            </div>
                                            <div className="bg-blue-100 flex flex-col justify-center gap-4 border border-black">
                                                <div className="text-2xl text-center">
                                                    Số sản phẩm bán trong tháng
                                                </div>
                                                <div className="text-center text-3xl font-semibold  text-bgheader-300">
                                                    {slsp}
                                                </div>
                                            </div>
                                            <div className="bg-green-100 border border-black">

                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                )
            }

        </div>
    )
}