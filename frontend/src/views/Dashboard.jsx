import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import ChartDashBoard from "../components/ChartDashBoard"
export default function Dashbord() {
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

    return (
        <div className="container h-screen bg-bgheader-200">
            <div className="h-[16%] border-b flex items-center">
                <div className="text-bgheader-300 text-center text-2xl px-10 font-bold ">
                    Dashboard
                </div>
                <div className="">
                </div>
            </div>
            <div className="px-20">
                <div className="border w-full grid grid-cols-3 gap-20 mt-5">
                    <div className="h-[100px] border bg-rose-200">Doanh thu tháng: <span className="font-semibold text-green-600">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(income)}
                    </span>
                    </div>
                    <div className="h-[100px] border bg-green-300">Số sản phẩm bán trong tháng: <span>
                        {slsp}
                    </span>
                    </div>
                    <div className="h-[100px] border bg-cyan-200 ">AAAAAA</div>
                </div>
                <div className="border w-full  mt-10 h-[430px] bg-slate-200 flex gap-5">
                    <div className="w-[70%] ">
                       <ChartDashBoard/>  
                    </div>
                                       
                    <div className="h-full bg-white">

                    </div>
                </div>
            </div>
        </div>
    )
}