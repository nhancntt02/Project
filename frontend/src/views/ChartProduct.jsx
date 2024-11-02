import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import MonthBar from "../components/Monthbar";
import QuarterlyBar from "../components/QuarterlyBar";
import YearBar from "../components/YearBar";
export default function ChartProduct() {
    const product_id = useParams().product_id;
    const [revenue, setRevenue] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        getRevenueProduct();
    }, [])

    const getRevenueProduct = async () => {
        try {
            const res = await axiosClient.get(`/revenue/product/${product_id}`);
            console.log(res.data.data);
            setRevenue(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (revenue.length > 0) {
            let total = 0;
            revenue.forEach(item => {
                total += item.io_price * item.io_quantity;
            });
            setTotalRevenue(total);
        }
    }, [revenue])


    return (
        <div className="chart-product">
            {
                revenue.length > 0 ? (
                    <div className="h-[76vh] overflow-y-auto">
                        <div className="text-center mb-4 text-2xl font-bold">Thống kê doanh thu của {revenue[0].product.product_name}</div>

                        <div className="mb-4"> <MonthBar dataApi={revenue} /></div>
                        <div className="mb-4"><QuarterlyBar dataApi={revenue} /></div>
                        <div><YearBar dataApi={revenue} /></div>
                    </div>
                ) : (
                    <div className="flex justify-center"> 
                        <div className="p-6 text-xl mt-10 bg-slate-200 text-gray-700 font-semibold rounded-md">Sản phẩm chưa có lượt mua</div>
                    </div>
                )
            }

        </div>
    )
}